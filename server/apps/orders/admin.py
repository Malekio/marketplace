from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('product_name', 'product_sku', 'quantity', 'price')
    readonly_fields = ('product_name', 'product_sku', 'quantity', 'price')
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer', 'seller', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('id', 'buyer__username', 'seller__username')
    readonly_fields = ('id', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    fieldsets = (
        ('Order Info', {'fields': ('id', 'buyer', 'seller')}),
        ('Status', {'fields': ('status',)}),
        ('Pricing', {'fields': ('total_price',)}),
        ('Shipping', {'fields': ('shipping_address',)}),
        ('Dates', {'fields': ('created_at', 'updated_at')}),
    )
    list_per_page = 20


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'order', 'quantity', 'price', 'created_at')
    list_filter = ('created_at', 'order__status')
    search_fields = ('order__id', 'product_name', 'product_sku')
    readonly_fields = ('id', 'created_at')
    fieldsets = (
        ('Order Item Info', {'fields': ('id', 'order', 'product')}),
        ('Product Snapshot', {'fields': ('product_name', 'product_sku')}),
        ('Quantity & Price', {'fields': ('quantity', 'price')}),
        ('Dates', {'fields': ('created_at',)}),
    )
