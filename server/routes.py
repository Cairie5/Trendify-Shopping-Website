from flask import Blueprint, request, jsonify
from database import db
from models.user import User
from models.product import Product
from models.order import Order
from models.order_item import OrderItem
from models.review import Review

routes = Blueprint('routes', __name__)

# User Registration
@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(name=name, email=email, password=password, role='user')
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# Product Search
@routes.route('/products', methods=['GET'])
def get_products():
    search = request.args.get('search', '')
    category = request.args.get('category')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')

    query = Product.query.filter(Product.name.contains(search))

    if category:
        query = query.filter_by(category=category)
    if min_price:
        query = query.filter(Product.price >= float(min_price))
    if max_price:
        query = query.filter(Product.price <= float(max_price))

    products = query.all()
    return jsonify([product.to_dict() for product in products])

# Add to Cart (Mocked for example)
@routes.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    # Logic for adding product to user's cart would go here
    return jsonify({"message": "Item added to cart"})

# Checkout (Mocked for example)
@routes.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    # Logic for processing checkout would go here
    return jsonify({"message": "Order placed successfully"})

# Product Reviews
@routes.route('/products/<int:product_id>/reviews', methods=['POST'])
def add_review(product_id):
    data = request.get_json()
    rating = data.get('rating')
    review_text = data.get('review_text')
    user_id = data.get('user_id')

    review = Review(product_id=product_id, user_id=user_id, rating=rating, review_text=review_text)
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added successfully"}), 201
