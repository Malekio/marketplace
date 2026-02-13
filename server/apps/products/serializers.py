from rest_framework import serializers
from .models import Product, ProductImage
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'display_order']


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer for product list view."""
    vendor = serializers.CharField(source='seller.username', read_only=True)
    imageUrl = serializers.SerializerMethodField()
    isVerified = serializers.SerializerMethodField()
    reviews = serializers.IntegerField(source='total_reviews', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'vendor', 'rating', 'reviews', 'imageUrl', 'isVerified']

    def get_imageUrl(self, obj):
        """Return the main image URL."""
        images = obj.images.all()
        if images:
            # If image field contains a URL, return it directly
            image_field = images[0].image
            if str(image_field).startswith('http'):
                return str(image_field)
            # Otherwise build the absolute URL
            return self.context['request'].build_absolute_uri(image_field.url)
        return None
    
    def get_isVerified(self, obj):
        """Check if seller is verified."""
        try:
            return obj.seller.seller_profile.status == 'active'
        except:
            return False


class ProductDetailSerializer(serializers.ModelSerializer):
    """Serializer for product detail view."""
    vendor = serializers.CharField(source='seller.username', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = serializers.IntegerField(source='total_reviews', read_only=True)
    imageUrl = serializers.SerializerMethodField()
    isVerified = serializers.SerializerMethodField()
    altText = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'description', 'vendor', 'rating', 'reviews', 
            'imageUrl', 'isVerified', 'altText', 'category', 'images'
        ]
    
    def get_category(self, obj):
        """Return a category based on product name."""
        return "General"
    
    def get_imageUrl(self, obj):
        """Return the main image URL."""
        images = obj.images.all()
        if images:
            # If image field contains a URL, return it directly
            image_field = images[0].image
            if str(image_field).startswith('http'):
                return str(image_field)
            # Otherwise build the absolute URL
            return self.context['request'].build_absolute_uri(image_field.url)
        return None
    
    def get_isVerified(self, obj):
        """Check if seller is verified."""
        try:
            return obj.seller.seller_profile.status == 'active'
        except:
            return False
    
    def get_altText(self, obj):
        """Return alt text for main image."""
        images = obj.images.all()
        if images:
            return images[0].alt_text or obj.name
        return obj.name

