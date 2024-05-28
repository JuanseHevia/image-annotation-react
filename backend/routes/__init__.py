from flask import Blueprint

# Initialize blueprints
auth_bp = Blueprint('auth', __name__)
image_bp = Blueprint('image', __name__)
annotation_bp = Blueprint('annotation', __name__)
task_bp = Blueprint('task', __name__)

# Import routes to associate them with blueprints
from . import auth, image, annotation, task