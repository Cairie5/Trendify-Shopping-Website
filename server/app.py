from flask import Flask
from config import Config
from database import db
from routes import routes  # Import the blueprint directly
from flask_mail import Mail # type: ignore
from flask_migrate import Migrate  # Import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize Mail for sending emails
    mail = Mail(app)

    # Initialize the database and migration
    db.init_app(app)
    migrate = Migrate(app, db)  # Initialize migrate with the app and db

    # Register the blueprint for routes
    app.register_blueprint(routes)

    return app  # Return the created app instance

if __name__ == '__main__':
    app = create_app()  # Create an app instance
    app.run(debug=True)  # Run the app
