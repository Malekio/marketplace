from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Seller, Address

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for managing users."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user profile."""
        # TODO: Implement serializer
        return Response({'message': 'User profile endpoint'})


class SellerViewSet(viewsets.ModelViewSet):
    """ViewSet for managing seller profiles."""
    queryset = Seller.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter sellers by user if provided."""
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset


class AddressViewSet(viewsets.ModelViewSet):
    """ViewSet for managing user addresses."""
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return addresses for the current user."""
        return Address.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        """Set address as default."""
        address = self.get_object()
        Address.objects.filter(user=request.user).update(is_default=False)
        address.is_default = True
        address.save()
        return Response({'status': 'Default address updated'})
