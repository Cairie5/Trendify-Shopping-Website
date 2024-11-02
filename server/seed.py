from datetime import datetime
from werkzeug.security import generate_password_hash
from app import create_app
from database import db
from models import User, Product, Review, Order, OrderItem

app = create_app()

with app.app_context():
    # Drop all tables and recreate them for clean seeding (optional, use with caution)
    db.drop_all()
    db.create_all()

    # Seed Users
    user1 = User(
        name="John Doe",
        email="john@example.com",
        phone_number="1234567890",
        password_hash=generate_password_hash("password123"),
    )
    user2 = User(
        name="Jane Smith",
        email="jane@example.com",
        phone_number="0987654321",
        password_hash=generate_password_hash("securepassword"),
    )
    admin = User(
        name="Admin User",
        email="admin@example.com",
        phone_number="1112223333",
        password_hash=generate_password_hash("adminpassword"),
    )
    db.session.add_all([user1, user2, admin])
    db.session.commit()  # Commit here to ensure users have IDs assigned

    # Seed Products
    product1 = Product(
        name="Vintage Leather Jacket",
        description="A high-quality leather jacket with a vintage feel.",
        price=120.00,
        stock_quantity=10,
        category="Men's Wear",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTvFW3vxZrIj2kdJfjFoG7L6M8y51rUrct3w&s",
    )
    product2 = Product(
        name="Handmade Silver Necklace",
        description="A beautiful handmade silver necklace perfect for any occasion.",
        price=80.00,
        stock_quantity=25,
        category="Jewelry",
        image_url="https://th.bing.com/th/id/OIP.3u9XwOoXe4B946OlBxiZMwAAAA?w=474&h=474&rs=1&pid=ImgDetMain",
    )
    product3 = Product(
        name="Running Shoes",
        description="Lightweight running shoes designed for maximum comfort and performance.",
        price=60.00,
        stock_quantity=50,
        category="Footwear",
        image_url="https://th.bing.com/th/id/R.94d9d4c622bc2bd88bc90210b12f63c6?rik=r5KR74hiWnr6nA&pid=ImgRaw&r=0",
    )
    db.session.add_all([product1, product2, product3])
    db.session.commit()  # Commit products to ensure they have IDs

    # Seed Reviews
    review1 = Review(
        product_id=product1.product_id,
        user_id=user1.user_id,
        rating=5,
        review_text="Amazing quality and perfect fit!",
        created_at=datetime.utcnow(),
    )
    review2 = Review(
        product_id=product2.product_id,
        user_id=user2.user_id,
        rating=4,
        review_text="Beautiful necklace, but a bit overpriced.",
        created_at=datetime.utcnow(),
    )
    db.session.add_all([review1, review2])
    db.session.commit()  # Commit reviews

    # Seed Orders and Order Items
    order1 = Order(
        user_id=user1.user_id,
        total_amount=120.00,
        status="completed",
        shipping_address="123 Main Street, Cityville",
        created_at=datetime.utcnow(),
    )
    order_item1 = OrderItem(
        order=order1,
        product_id=product1.product_id,
        quantity=1,
        price_at_purchase=120.00,
    )
    db.session.add(order1)
    db.session.add(order_item1)

    order2 = Order(
        user_id=user2.user_id,
        total_amount=140.00,
        status="pending",
        shipping_address="456 Maple Avenue, Townsville",
        created_at=datetime.utcnow(),
    )
    order_item2a = OrderItem(
        order=order2,
        product_id=product2.product_id,
        quantity=1,
        price_at_purchase=80.00,
    )
    order_item2b = OrderItem(
        order=order2,
        product_id=product3.product_id,
        quantity=1,
        price_at_purchase=60.00,
    )
    db.session.add(order2)
    db.session.add_all([order_item2a, order_item2b])

    # Commit all orders and order items
    db.session.commit()
    print("Database seeded successfully!")
