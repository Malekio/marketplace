from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTests(TestCase):
    """Test cases for the User model."""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            phone_num='+1234567890'
        )

    def test_create_user(self):
        """Test user creation."""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('testpass123'))

    def test_user_string_representation(self):
        """Test user __str__ method."""
        expected_str = f"testuser (test@example.com)"
        self.assertEqual(str(self.user), expected_str)
