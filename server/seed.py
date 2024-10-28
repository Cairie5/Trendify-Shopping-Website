from app import create_app, db  # Import create_app and db
from models.user import User
from models.product import Product
from models.order import Order
from models.order_item import OrderItem
from models.review import Review

app = create_app()  # Create the app instance

def seed_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Create sample users
        users = [
            User(name="Alice", email="alice@example.com", password="password123", role='user'),
            User(name="Bob", email="bob@example.com", password="password123", role='user'),
            User(name="Charlie", email="charlie@example.com", password="password123", role='user'),
        ]
        
        # Create sample products with stock_quantity
        products = [
            Product(name="Product 1", description="Description for Product 1", price=10.99, stock_quantity=100, category="Category A"),
            Product(name="Product 2", description="Description for Product 2", price=20.99, stock_quantity=50, category="Category B"),
            Product(name="Product 3", description="Description for Product 3", price=15.49, stock_quantity=75, category="Category A"),
        ]

        # Add users and products to session
        db.session.add_all(users)
        db.session.add_all(products)
        db.session.commit()

        # Create sample orders with shipping_address
        orders = [
            Order(user_id=1, total_amount=31.48, status='pending', shipping_address='123 Main St, Anytown, USA'),  # Alice's order
            Order(user_id=2, total_amount=20.99, status='pending', shipping_address='456 Elm St, Othertown, USA'),  # Bob's order
        ]

        # Add orders to session
        db.session.add_all(orders)
        db.session.commit()

        # Create sample order items with price_at_purchase
        order_items = [
            OrderItem(order_id=1, product_id=1, quantity=2, price_at_purchase=10.99),  # 2 of Product 1 in Alice's order
            OrderItem(order_id=1, product_id=2, quantity=1, price_at_purchase=20.99),  # 1 of Product 2 in Alice's order
            OrderItem(order_id=2, product_id=2, quantity=1, price_at_purchase=20.99),  # 1 of Product 2 in Bob's order
            OrderItem(order_id=2, product_id=3, quantity=1, price_at_purchase=15.49),  # 1 of Product 3 in Bob's order
        ]

        # Add order items to session
        db.session.add_all(order_items)
        db.session.commit()

        # Create sample reviews
        reviews = [
            Review(product_id=1, user_id=1, rating=5, review_text="Excellent product! Highly recommend."),
            Review(product_id=2, user_id=2, rating=4, review_text="Very good, but a bit expensive."),
            Review(product_id=3, user_id=3, rating=3, review_text="It's okay, not the best I've used."),
        ]

        # Add reviews to session
        db.session.add_all(reviews)
        db.session.commit()

        print("Database seeded with users, products, orders, order items, and reviews!")

if __name__ == "__main__":
    seed_data()
