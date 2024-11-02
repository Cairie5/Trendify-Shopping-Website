from flask import Blueprint, request, jsonify,make_response
from models import db, User, Product, Review, Order, OrderItem
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

routes = Blueprint('routes', __name__)

# # CORS CONFIGURATIONS

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "https://localhost:3000")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

# Error response function
def error_response(message, status_code):
    return jsonify({"error": message}), status_code

# Admin authorization decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.headers.get("is_admin"):
            return jsonify({"message": "Admin access required"}), 403
        return f(*args, **kwargs)
    return decorated_function

# User Registration
@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if data is None or not a dictionary
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid data format"}), 400

    # Validate required fields
    required_fields = ['name', 'email', 'password', 'phone_number']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    # Check if the user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(data['password'])
    
    # Create a new user instance
    user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        password_hash=hashed_password
    )

    # Add and commit the new user to the database
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# User Login
@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Login successful", "user_id": user.user_id}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Retrieve All Products
@routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "product_id": p.product_id,
        "name": p.name,
        "description": p.description,
        "price": float(p.price),
        "stock_quantity": p.stock_quantity,
        "category": p.category,
        "image_url": p.image_url
    } for p in products]), 200

# Retrieve Single Product
@routes.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    return jsonify({
        "product_id": product.product_id,
        "name": product.name,
        "description": product.description,
        "price": float(product.price),
        "stock_quantity": product.stock_quantity,
        "category": product.category,
        "image_url": product.image_url
    }), 200

# Add New Product (Admin Only)
@routes.route('/products', methods=['POST'])
@admin_required
def add_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        stock_quantity=data['stock_quantity'],
        category=data['category'],
        image_url=data.get('image_url')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

# Update Product (Admin Only)
@routes.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock_quantity = data.get('stock_quantity', product.stock_quantity)
    product.category = data.get('category', product.category)
    product.image_url = data.get('image_url', product.image_url)
    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200

# Delete Product (Admin Only)
@routes.route('/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

# Create Review for a Product
@routes.route('/products/<int:product_id>/reviews', methods=['POST'])
def add_review(product_id):
    data = request.get_json()
    review = Review(
        product_id=product_id,
        user_id=data['user_id'],
        rating=data['rating'],
        review_text=data.get('review_text')
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added successfully"}), 201

# Get All Reviews for a Product
@routes.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([{
        "review_id": r.review_id,
        "user_id": r.user_id,
        "rating": r.rating,
        "review_text": r.review_text,
        "created_at": r.created_at.isoformat()
    } for r in reviews]), 200

# Create Order
@routes.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data['user_id']
    items = data['items']
    total_amount = sum(item['price'] * item['quantity'] for item in items)
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        shipping_address=data['shipping_address']
    )
    db.session.add(order)
    db.session.commit()

    for item in items:
        order_item = OrderItem(
            order_id=order.order_id,
            product_id=item['product_id'],
            quantity=item['quantity'],
            price_at_purchase=item['price']
        )
        db.session.add(order_item)

    db.session.commit()
    return jsonify({"message": "Order created successfully", "order_id": order.order_id}), 201

# Get All Orders for a User
@routes.route('/users/<int:user_id>/orders', methods=['GET'])
def get_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "order_id": o.order_id,
        "total_amount": float(o.total_amount),
        "status": o.status,
        "shipping_address": o.shipping_address,
        "created_at": o.created_at.isoformat(),
        "items": [{
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price_at_purchase": float(item.price_at_purchase)
        } for item in o.order_items]
    } for o in orders]), 200

# Update Order Status (Admin Only)
@routes.route('/orders/<int:order_id>', methods=['PUT'])
@admin_required
def update_order_status(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404
    order.status = data.get('status', order.status)
    db.session.commit()
    return jsonify({"message": "Order status updated successfully"}), 200
