from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Stores core user information for both buyers and sellers.
    """
    phone_num = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='users/images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
        ]

    def __str__(self):
        return f"{self.username} ({self.email})"


class Seller(models.Model):
    """
    Seller profile extending User model.
    Contains seller-specific information and business details.
    """
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('suspended', 'Suspended'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_profile', primary_key=True)
    store_name = models.CharField(max_length=255, unique=True)
    store_description = models.TextField(blank=True)
    business_license = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_sales = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-pk']
        indexes = [
            models.Index(fields=['store_name']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.store_name} - {self.user.username}"


class Address(models.Model):
    """
    Stores geographical information for users.
    Supports multiple addresses per user with a default selection.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)

    class Meta:
        ordering = ['-is_default', '-pk']
        verbose_name_plural = "Addresses"
        indexes = [
            models.Index(fields=['user', 'is_default']),
        ]

    def __str__(self):
        return f"{self.city}, {self.postal_code} - {self.user.username}"

    def save(self, *args, **kwargs):
        """Set this as default if it's the only address for the user."""
        if self.is_default:
            Address.objects.filter(user=self.user).exclude(id=self.id).update(is_default=False)
        super().save(*args, **kwargs)
