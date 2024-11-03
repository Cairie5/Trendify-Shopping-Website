from flask import Blueprint, request, jsonify, make_response
from models import db, User, Product, Review, Order, OrderItem
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

routes = Blueprint('routes', __name__)

# Initialize JWT Manager
jwt = JWTManager()

# CORS CONFIGURATIONS
def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")  # Allow requests from React app
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

# Error response function
def error_response(message, status_code):
    return jsonify({"error": message}), status_code

# Admin authorization decorator
def admin_required(f):
    @wraps(f)
    @jwt_required()  # Require a valid JWT to access this route
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()  # Get the current user's ID from the JWT
        user = User.query.get(user_id)
        if not user or not user.is_admin():
            return jsonify({"message": "Admin access required"}), 403
        return f(*args, **kwargs)
    return decorated_function

# Admin Registration
@routes.route('/register-admin', methods=['POST'])
def register_admin():
    data = request.get_json()
    required_fields = ['name', 'email', 'password', 'phone_number']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Admin already exists"}), 400

    hashed_password = generate_password_hash(data['password'])
    admin_user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        password_hash=hashed_password,
        role='admin'
    )
    db.session.add(admin_user)
    db.session.commit()

    return jsonify({"message": "Admin registered successfully"}), 201

# User Registration
@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not isinstance(data, dict):
        return error_response("Invalid data format", 400)

    required_fields = ['name', 'email', 'password', 'phone_number']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return error_response(f"Missing fields: {', '.join(missing_fields)}", 400)

    if User.query.filter_by(email=data['email']).first():
        return error_response("User already exists", 400)

    user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        role='user'  # Default role
    )
    user.set_password(data['password'])  # Use set_password to hash the password
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# User Login
@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not isinstance(data, dict):
        return error_response("Invalid data format", 400)

    email = data.get('email')
    password = data.get('password')

    # Check for missing fields
    if not email or not password:
        return error_response("Email and password are required", 400)

    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):  # Use the method defined in your User model
        # Create JWT token using the correct user ID attribute
        access_token = create_access_token(identity=user.user_id)  # Correctly reference user_id
        return jsonify({"message": "Login successful", "access_token": access_token, "role": user.role}), 200

    return error_response("Invalid credentials", 401)

# Retrieve All Users (Admin Only)
@routes.route('/users', methods=['GET'])
@admin_required
def get_all_users():
    users = User.query.all()
    return jsonify([{
        "user_id": user.user_id,
        "name": user.name,
        "email": user.email,
        "phone_number": user.phone_number,
        "role": user.role
    } for user in users]), 200

# Update User Role (Admin Only)
@routes.route('/users/<int:user_id>/role', methods=['PATCH'])
@admin_required
def update_user_role(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return error_response("User not found", 404)

    new_role = data.get('role')
    if new_role not in ['user', 'admin']:
        return error_response("Invalid role", 400)

    user.role = new_role
    db.session.commit()
    return jsonify({"message": "User role updated successfully"}), 200

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
        return error_response("Product not found", 404)
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
    required_fields = ['name', 'description', 'price', 'stock_quantity', 'category']
    
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return error_response(f"Missing fields: {', '.join(missing_fields)}", 400)

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
        return error_response("Product not found", 404)

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
        return error_response("Product not found", 404)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

# Create Review for a Product
@routes.route('/products/<int:product_id>/reviews', methods=['POST'])
def add_review(product_id):
    data = request.get_json()
    user_id = data.get('user_id')

    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return error_response("User not found", 404)

    required_fields = ['rating']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return error_response(f"Missing fields: {', '.join(missing_fields)}", 400)

    review = Review(
        product_id=product_id,
        user_id=user_id,
        rating=data['rating'],
        review_text=data.get('review_text'),
        status='pending'  # Default status for new reviews
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
        "status": r.status
    } for r in reviews]), 200

# Approve or Reject Review (Admin Only)
@routes.route('/reviews/<int:review_id>/status', methods=['PATCH'])
@admin_required
def update_review_status(review_id):
    data = request.get_json()
    review = Review.query.get(review_id)
    if not review:
        return error_response("Review not found", 404)

    status = data.get('status')
    if status not in ['approved', 'rejected']:
        return error_response("Invalid status", 400)

    review.status = status
    db.session.commit()
    return jsonify({"message": "Review status updated successfully"}), 200

# Create Order
@routes.route('/orders', methods=['POST'])
@jwt_required()  # Require a valid JWT to access this route
def create_order():
    data = request.get_json()
    user_id = get_jwt_identity()  # Get the current user's ID from the JWT

    order = Order(user_id=user_id, status='pending')
    db.session.add(order)
    db.session.commit()

    # Add order items
    for item in data.get('items', []):
        order_item = OrderItem(order_id=order.order_id, product_id=item['product_id'], quantity=item['quantity'])
        db.session.add(order_item)

    db.session.commit()
    return jsonify({"message": "Order created successfully", "order_id": order.order_id}), 201

# Get Orders for User
@routes.route('/orders', methods=['GET'])
@jwt_required()  # Require a valid JWT to access this route
def get_orders():
    user_id = get_jwt_identity()  # Get the current user's ID from the JWT
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "order_id": o.order_id,
        "status": o.status,
        "created_at": o.created_at
    } for o in orders]), 200

# Run CORS preflight
@routes.route('/cors-preflight', methods=['OPTIONS'])
def cors_preflight():
    return _build_cors_prelight_response()

