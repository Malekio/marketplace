from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for managing orders."""
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return orders for the current user (as buyer or seller)."""
        user = self.request.user
        return Order.objects.filter(buyer=user) | Order.objects.filter(seller=user)

    @action(detail=False, methods=['get'])
    def my_purchases(self, request):
        """Get current user's purchases."""
        orders = Order.objects.filter(buyer=request.user).order_by('-created_at')
        # TODO: Implement serializer
        return Response({'message': 'User purchases endpoint'})

    @action(detail=False, methods=['get'])
    def my_sales(self, request):
        """Get current user's sales."""
        orders = Order.objects.filter(seller=request.user).order_by('-created_at')
        # TODO: Implement serializer
        return Response({'message': 'User sales endpoint'})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order."""
        order = self.get_object()
        
        if order.buyer != request.user:
            return Response(
                {'detail': 'Only the buyer can cancel an order.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if order.status not in ['pending', 'confirmed']:
            return Response(
                {'detail': 'Only pending or confirmed orders can be cancelled.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = 'cancelled'
        order.save()
        return Response({'status': 'Order cancelled successfully'})


class OrderItemViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing order items (read-only)."""
    queryset = OrderItem.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return order items for orders of the current user."""
        user = self.request.user
        return OrderItem.objects.filter(
            order__buyer=user
        ) | OrderItem.objects.filter(order__seller=user)
