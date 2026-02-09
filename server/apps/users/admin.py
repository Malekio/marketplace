from django.contrib import admin
from .models import User, Seller, Address


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_num', 'created_at')
    list_filter = ('created_at', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'phone_num')
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        ('Personal Info', {'fields': ('id', 'username', 'email', 'first_name', 'last_name', 'phone_num', 'image')}),
        ('Account Status', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Dates', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ('store_name', 'user', 'status', 'rating', 'total_sales')
    list_filter = ('status', 'rating')
    search_fields = ('store_name', 'user__username', 'business_license')
    readonly_fields = ('user', 'created_at', 'updated_at')
    fieldsets = (
        ('Store Info', {'fields': ('user', 'store_name', 'store_description')}),
        ('Business Details', {'fields': ('business_license', 'status')}),
        ('Performance', {'fields': ('rating', 'total_sales')}),
        ('Dates', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'city', 'postal_code', 'is_default')
    list_filter = ('is_default',)
    search_fields = ('user__username', 'city', 'postal_code')
    readonly_fields = ('id',)
    fieldsets = (
        ('User Info', {'fields': ('id', 'user')}),
        ('Address Details', {'fields': ('street', 'city', 'postal_code')}),
        ('Settings', {'fields': ('is_default',)}),
    )
