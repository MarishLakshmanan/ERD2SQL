import jwt
import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import oracledb
from flask_cors import CORS

token = ""

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.secret_key = 'supersecretkey'

# Local user database for authentication (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# Oracle DB connection
ORACLE_USER = "mamcinerney"
ORACLE_PASS = "MAMCINERNEY"
ORACLE_DSN = oracledb.makedsn("oracle.wpi.edu", 1521, sid="ORCL")

# Setup Flask-Login
login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

# User model for local login
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    global token
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            # Generate JWT
            token = jwt.encode({
                'sub': email,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
            }, "SECRET_KEY", algorithm='HS256')
            return jsonify({"token": token})
        # +f"?token={token}"
        flash("Invalid credentials")
    return render_template('login.html') # Condition never reached

@app.route('/register', methods=['GET', 'POST'])
def register():
    global token
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if not User.query.filter_by(email=email).first():
            hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
            new_user = User(email=email, password=hashed_pw)
            db.session.add(new_user)
            db.session.commit()
        return f"User created: {email}"
    return render_template('register.html')

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return "Logout successful."

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', email=current_user.email)

# DOESNT WORK IF YOU HAVE DIFFERENT FRONTEND AND BACKEND
# Since we are generating JWT when logging in the user, that is used to check if user is logged in
@app.route('/api/data')
@login_required
def get_oracle_data():
    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        cursor = conn.cursor()
        cursor.execute(f"""
            SELECT * FROM JSON_DATA
            WHERE USERNAME='{current_user.email}'
        """)  # Replace with your actual query
        results = cursor.fetchall()
        print(results)
        
        json_data = results[0][1]
        json_data = json_data.read()
        cursor.close()
        conn.close()

        return jsonify(json_data)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/retrieval')
@login_required
def get_projects():
    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        cursor = conn.cursor()
        cursor.execute(f"""
            SELECT * FROM PROJECTS
            WHERE USERNAME='{current_user.email}'
        """)  # Replace with your actual query
        results = cursor.fetchall()
        print(results)
        
        json_data = results[0][1]
        json_data = json_data.read()
        cursor.close()
        conn.close()

        return jsonify(json_data)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/create-diagram', methods=['POST'])
# @login_required
def create_diagram():
    data = request.data.decode("utf-8")
    print(data)

    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return jsonify({"error": "forbidden"}), 401
    token = auth.split(' ')[1]
    
    try:
        decoded = jwt.decode(token, "SECRET_KEY", algorithms=['HS256'])
        request.user = decoded['sub']
        print(request.user)
    except jwt.ExpiredSignatureError:
        return jsonify({"error": 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": 'Invalid token'}), 401

    if data is None:
        return jsonify({'error': 'No data has been passed from client'}), 400

    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        print("Connection with oracle db established.")
        cursor = conn.cursor()
        print("whatever the hell cursor is.")
        try:
            print("Checking for existence of requesting user. If not in table, will create new row with pertinent data and association.")
            cursor.execute("""
                INSERT INTO JSON_DATA (username, data)
                VALUES (:username, :data)
            """, {"username": request.user, "data": data})
        except oracledb.IntegrityError:
            cursor.execute("""
                UPDATE JSON_DATA
                SET data = :data
                WHERE username = :username
            """, {"username": request.user, "data": data})
            print("Data already exists under user. Updating existing info to match new request.")
        conn.commit()
        print("Effects committed.")
        cursor.close()
        conn.close()
        print("Query handler and connection closed.")

        return jsonify({'message': 'Data added successfully'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/store-projects', methods=['POST'])
# @login_required
def create_projects():
    data = request.data.decode("utf-8")
    print(data)

    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return jsonify({"error": "forbidden"}), 401
    token = auth.split(' ')[1]
    
    try:
        decoded = jwt.decode(token, "SECRET_KEY", algorithms=['HS256'])
        request.user = decoded['sub']
        print(request.user)
    except jwt.ExpiredSignatureError:
        return jsonify({"error": 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": 'Invalid token'}), 401

    if data is None:
        return jsonify({'error': 'No data has been passed from client'}), 400

    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        print("Connection with oracle db established.")
        cursor = conn.cursor()
        print("whatever the hell cursor is.")
        try:
            print("Checking for existence of requesting user. If not in table, will create new row with pertinent data and association.")
            cursor.execute("""
                INSERT INTO PROJECTS (username, data)
                VALUES (:username, :data)
            """, {"username": request.user, "data": data})
        except oracledb.IntegrityError:
            cursor.execute("""
                UPDATE PROJECTS
                SET data = :data
                WHERE username = :username
            """, {"username": request.user, "data": data})
            print("Data already exists under user. Updating existing info to match new request.")
        conn.commit()
        print("Effects committed.")
        cursor.close()
        conn.close()
        print("Query handler and connection closed.")

        return jsonify({'message': 'Data added successfully'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Simple route to create an initial user
@app.route('/create-user')
def create_user():
    if not User.query.filter_by(email="test@example.com").first():
        hashed_pw = generate_password_hash("password123", method='pbkdf2:sha256')
        new_user = User(email="test@example.com", password=hashed_pw)
        db.session.add(new_user)
        db.session.commit()
    return "User created: test@example.com / password123"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

