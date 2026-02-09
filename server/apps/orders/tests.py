from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.orders.models import Order
from apps.products.models import Product

User = get_user_model()


class OrderModelTests(TestCase):
    """Test cases for the Order model."""

    def setUp(self):
        self.buyer = User.objects.create_user(
            username='buyer',
            email='buyer@example.com',
            password='testpass123'
        )
        self.seller = User.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='testpass123'
        )
        self.order = Order.objects.create(
            buyer=self.buyer,
            seller=self.seller,
            status='pending',
            total_price=99.99
        )

    def test_create_order(self):
        """Test order creation."""
        self.assertEqual(self.order.buyer, self.buyer)
        self.assertEqual(self.order.seller, self.seller)
        self.assertEqual(self.order.status, 'pending')

    def test_order_string_representation(self):
        """Test order __str__ method."""
        order_str = str(self.order)
        self.assertIn('buyer', order_str)
        self.assertIn('seller', order_str)
