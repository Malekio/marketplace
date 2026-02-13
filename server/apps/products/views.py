from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Product, ProductImage
from .serializers import ProductListSerializer, ProductDetailSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for managing products."""
    queryset = Product.objects.filter(is_active=True).select_related('seller').prefetch_related('images')
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        """Filter products based on query parameters."""
        queryset = super().get_queryset()
        seller_id = self.request.query_params.get('seller_id')
        status_filter = self.request.query_params.get('status')
        
        if seller_id:
            queryset = queryset.filter(seller_id=seller_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset

    @action(detail=False, methods=['get'])
    def my_products(self, request):
        """Get current user's products."""
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        products = Product.objects.filter(seller=request.user)
        # TODO: Implement serializer
        return Response({'message': 'User products endpoint'})


class ProductImageViewSet(viewsets.ModelViewSet):
    """ViewSet for managing product images."""
    queryset = ProductImage.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """Filter images by product if provided."""
        queryset = super().get_queryset()
        product_id = self.request.query_params.get('product_id')
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset
