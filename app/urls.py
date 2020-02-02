from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UserViewset, PostViewSet


router = SimpleRouter()
router.register('users', UserViewset, basename='users')
router.register('', PostViewSet, basename='posts')

urlpatterns = router.urls
