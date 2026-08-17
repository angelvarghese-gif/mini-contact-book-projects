from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from contacts.views import ContactViewSet

# Automatically generate standardized REST URLs for the Contact views
router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    # Admin backend access panel
    path('admin/', admin.site.urls),
    
    # Secure Login and JWT Refresh actions
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Includes all generated contact API endpoints (e.g., GET/POST /api/contacts/)
    path('api/', include(router.urls)),
]
