from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.products.models import Product

User = get_user_model()


class ProductModelTests(TestCase):
    """Test cases for the Product model."""

    def setUp(self):
        self.seller = User.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='testpass123'
        )
        self.product = Product.objects.create(
            seller=self.seller,
            name='Test Product',
            description='Test Description',
            price=99.99,
            quantity=10,
            is_active=True
        )

    def test_create_product(self):
        """Test product creation."""
        self.assertEqual(self.product.name, 'Test Product')
        self.assertEqual(self.product.price, 99.99)
        self.assertTrue(self.product.is_active)

    def test_product_string_representation(self):
        """Test product __str__ method."""
        expected_str = f"Test Product - seller"
        self.assertEqual(str(self.product), expected_str)
