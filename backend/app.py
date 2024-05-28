import dotenv
import os
dotenv.load_dotenv(dotenv.find_dotenv())


from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
# Import the blueprints
from routes import auth_bp, image_bp, annotation_bp, task_bp
from models import db

# Initialize the database
# db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
    app.config["TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(annotation_bp)
    app.register_blueprint(task_bp)

    return app