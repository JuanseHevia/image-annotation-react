from flask import request, jsonify
from . import annotation_bp
from models import db, Annotation

@annotation_bp.route('/annotations', methods=['GET'])
def get_annotations():
    annotations = Annotation.query.all()
    return jsonify([{
        'id': annotation.id,
        'image_id': annotation.image_id,
        'user_id': annotation.user_id,
        'annotation_x': annotation.annotation_x,
        'annotation_y': annotation.annotation_y,
        'created_at': annotation.created_at
    } for annotation in annotations]), 200

@annotation_bp.route('/annotations/<int:id>', methods=['GET'])
def get_annotation(id):
    annotation = Annotation.query.get(id)
    if not annotation:
        return jsonify({'message': 'Annotation not found'}), 404
    return jsonify({
        'id': annotation.id,
        'image_id': annotation.image_id,
        'user_id': annotation.user_id,
        'annotation_x': annotation.annotation_x,
        'annotation_y': annotation.annotation_y,
        'created_at': annotation.created_at
    }), 200

@annotation_bp.route('/annotations/images/<int:image_id>', methods=['GET'])
def get_annotations_by_image(image_id):
    annotations = Annotation.query.filter_by(image_id=image_id).all()
    if not annotations:
        return jsonify({'message': 'No annotations found for this image ID'}), 402

    return jsonify([{
        'id': annotation.id,
        'image_id': annotation.image_id,
        'user_id': annotation.user_id,
        'annotation_x': annotation.annotation_x,
        'annotation_y': annotation.annotation_y,
        'created_at': annotation.created_at
    } for annotation in annotations]), 200

@annotation_bp.route('/annotations', methods=['POST'])
def create_annotation():
    data = request.get_json()
    if not 'stored_data' in data:
        return jsonify({'message': "No 'stored_data' element found"}), 400

    for item in data.get('stored_data'):
        new_annotation = Annotation(
            image_id=item.get('image_id'),
            user_id=item.get('user_id', 99999),
            task_id=item.get('task_id', 99999),
            annotation_x=item.get("x"),
            annotation_y=item.get("y"),
        )
        db.session.add(new_annotation)
    db.session.commit()
    return jsonify({'message': 'Annotation created successfully'}), 201

@annotation_bp.route('/annotations/<int:id>', methods=['PUT'])
def update_annotation(id):
    data = request.get_json()
    annotation = Annotation.query.get(id)
    if not annotation:
        return jsonify({'message': 'Annotation not found'}), 404
    if ('x' in data) and ('y' in data):
        annotation.x = data['x']
        annotation.y = data['y']
    db.session.commit()
    return jsonify({'message': 'Annotation updated successfully'}), 200

@annotation_bp.route('/annotations/<int:id>', methods=['DELETE'])
def delete_annotation(id):
    annotation = Annotation.query.get(id)
    if not annotation:
        return jsonify({'message': 'Annotation not found'}), 404
    db.session.delete(annotation)
    db.session.commit()
    return jsonify({'message': 'Annotation deleted successfully'}), 200

@annotation_bp.route('/annotations/images/<int:image_id>', methods=['DELETE'])
def delete_annotations_by_image(image_id):
    annotations = Annotation.query.filter_by(image_id=image_id).all()
    if not annotations:
        return jsonify({'message': 'No annotations found for this image ID'}), 404

    for annotation in annotations:
        db.session.delete(annotation)
    db.session.commit()
    return jsonify({'message': 'Annotations deleted successfully'}), 200