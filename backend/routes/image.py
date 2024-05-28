# import boto3
from flask import request, jsonify
from . import image_bp
from models import db, Image

# s3 = boto3.client('s3')

@image_bp.route('/images', methods=['GET'])
def get_images():
    images = Image.query.all()
    return jsonify([{
        'id': img.id,
        'filename': img.filename,
        'url': img.url
    } for img in images]), 200

@image_bp.route('/images/<int:id>', methods=['GET'])
def get_image(id):
    img = Image.query.get(id)
    if not img:
        return jsonify({'message': 'Image not found'}), 404
    return jsonify({
        'id': img.id,
        'filename': img.filename,
        'url': img.url
    }), 200

@image_bp.route('/images', methods=['POST'])
def upload_image():
    """
    Add image data by passing its URL and metadata
    """
    data = request.get_json()

    # s3.upload_fileobj(file, 'your-bucket-name', file.filename)
    new_image = Image(
        filename=data.get('filename'),
        url=data.get("url") # TODO: Replace with the actual URL from S3
    )
    db.session.add(new_image)
    db.session.commit()
    return jsonify({'message': 'Image uploaded successfully'}), 201

@image_bp.route('/images/<int:id>', methods=['PUT'])
def update_image(id):
    data = request.get_json()
    img = Image.query.get(id)
    if not img:
        return jsonify({'message': 'Image not found'}), 404
    if 'filename' in data:
        img.filename = data['filename']
    if 'metadata' in data:
        img.metadata = data['metadata']
    db.session.commit()
    return jsonify({'message': 'Image updated successfully'}), 200

@image_bp.route('/images/<int:id>', methods=['DELETE'])
def delete_image(id):
    img = Image.query.get(id)
    if not img:
        return jsonify({'message': 'Image not found'}), 404
    db.session.delete(img)
    db.session.commit()
    return jsonify({'message': 'Image deleted successfully'}), 200