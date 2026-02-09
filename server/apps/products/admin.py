from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text', 'display_order')
    ordering = ('display_order',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'seller', 'price', 'quantity', 'is_active', 'status', 'rating', 'created_at')
    list_filter = ('is_active', 'status', 'created_at', 'rating')
    search_fields = ('name', 'description', 'seller__username', 'sku')
    readonly_fields = ('id', 'created_at', 'updated_at', 'rating', 'total_reviews')
    inlines = [ProductImageInline]
    fieldsets = (
        ('Product Info', {'fields': ('id', 'seller', 'name', 'description', 'sku')}),
        ('Pricing & Inventory', {'fields': ('price', 'quantity')}),
        ('Status', {'fields': ('is_active', 'status')}),
        ('Reviews & Rating', {'fields': ('rating', 'total_reviews')}),
        ('Dates', {'fields': ('created_at', 'updated_at')}),
    )
    list_per_page = 25


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'display_order', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('product__name', 'alt_text')
    readonly_fields = ('id', 'created_at')
    fieldsets = (
        ('Image Info', {'fields': ('id', 'product', 'image', 'alt_text')}),
        ('Display Settings', {'fields': ('display_order',)}),
        ('Dates', {'fields': ('created_at',)}),
    )
