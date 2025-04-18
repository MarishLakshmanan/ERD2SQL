# ERD-to-SQL Converter
This is a simple, one-page app that integrates a React frontend with a Python backend using Flask for middleware, Oracle SQL for ERD functionality, and SQLLite for authentication.
For the purposes of this application, only the contents of `dbms-python` are relevant - the `dbms` folder should be regarded only as a reference point for our legacy backend structure.

Follow the steps below to run your own instance of the app locally.

1. Clone/fork/download the repository and navigate to the root directory.
2. Navigate to `dbms-python` in your CLI and run `chmod +x run.sh`
3. Enter `./run.sh` into your command line and navigate to the indicated URL to run the application.

## Summary of Existing Endpoints
### Authentication Not Required
#### @app.route('/')
Landing page - defaults to login if unauthenticated, dashboard if a valid session is detected.
#### @app.route('/login', methods=['GET', 'POST'])
Request data from login form routed through this endpoint. Flask-login used to screen credentials against locally stored SQLLite database.
#### @app.route('/create-user')
Skeleton endpoint for user registration. With some modification, and association to an appropriate form, can be tailored to take in necessary data.

### Authentication Required
#### @app.route('/logout')
Forcibly expires the current session, returning end user to unauthenticated view.
#### @app.route('/dashboard')
Serves auth-gated functionality. Only accessible when logged in with valid credentials. Data retrieval and saving is possible through here.
#### @app.route('/api/data')
Fetches data. Skeleton implementation done, and Python code for this can be duplicated with query modified to fetch anything pre-existing from Oracle SQL.
#### @app.route('/api/create-diagram', methods=['POST'])
Posts data to existing database. Skeleton implementation done, and Python code for this can be duplicated with query modified to insert anything into pre-existing tables from Oracle SQL.
