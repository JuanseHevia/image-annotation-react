from flask import request, jsonify
from . import task_bp
from models import db, Task

@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'name': task.name,
        'description': task.description,
        'instructions': task.instructions,
        'status': task.status
    } for task in tasks]), 200

@task_bp.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    return jsonify({
        'id': task.id,
        'name': task.name,
        'description': task.description,
        'instructions': task.instructions,
        'status': task.status
    }), 200

@task_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(
        name=data['name'],
        description=data['description'],
        instructions=data['instructions'],
        status=data['status']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@task_bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    if 'name' in data:
        task.name = data['name']
    if 'description' in data:
        task.description = data['description']
    if 'instructions' in data:
        task.instructions = data['instructions']
    if 'status' in data:
        task.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

@task_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'}), 200