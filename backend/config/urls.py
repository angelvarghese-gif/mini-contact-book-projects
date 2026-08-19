from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from contacts.views import ContactViewSet


# Home page
def home(request):
    return JsonResponse({
        "message": "Mini Contact Book API is running!"
    })


# Contact API router
router = DefaultRouter()
router.register(
    r"contacts",
    ContactViewSet,
    basename="contact"
)


urlpatterns = [
    # Home
    path("", home, name="home"),

    # Django admin
    path("admin/", admin.site.urls),

    # JWT login
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    # JWT token refresh
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # Contact API
    path("api/", include(router.urls)),
]
