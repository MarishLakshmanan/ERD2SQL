from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import oracledb
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash("Invalid credentials")
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', email=current_user.email)

@app.route('/api/data')
@login_required
def get_oracle_data():
    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM EMPLOYEES")  # Replace with your actual query
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/create-diagram', methods=['POST'])
# @login_required
def add_employee():
    # data = request.get_json()

    # name = data.get('name')
    # position = data.get('position')
    # salary = data.get('salary')

    name = request.form['name']
    position = request.form['position']
    salary = request.form['salary']

    if not all([name, position, salary]):
        return jsonify({'error': 'Missing fields'}), 400

    try:
        conn = oracledb.connect(user=ORACLE_USER, password=ORACLE_PASS, dsn=ORACLE_DSN)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO EMPLOYEES (name, position, salary)
            VALUES (:1, :2, :3)
        """, (name, position, salary))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Employee added successfully'}), 201

    except Exception as e:
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

