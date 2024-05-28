from flask_sqlalchemy import SQLAlchemy
# from app import db
db = SQLAlchemy()

from .models import User, Annotation, Task, Image