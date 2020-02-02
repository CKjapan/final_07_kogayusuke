from django.contrib import admin
from django.urls import include, path
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.views import get_swagger_view  # 追加
from app.views import UserAPI, PostViewSet
from .views import index  # 追加

API_TITLE = 'Flow Based Calculation API'
API_DESCRIPTION = 'A Web API for creating and editing app.'
# schema_view = get_schema_view(title=API_TITLE) # 追加
schema_view = get_swagger_view(title=API_TITLE)  # 追加

urlpatterns = [
    path('', index, name='index'),  # 追加
    path('signup/', index, name='index'),  # 追加
    path('login/', index, name='index'),  # 追加
    path('read/', index, name='index'),  # 追加
    path('template/<int:pk>/', index, name='index'),  # 追加
    path('create/new/', index, name='index'),  # 追加
    path('detail/<int:pk>/', index, name='index'),  # 追加
    path('detail/<int:pk>', index, name='index'),  # 追加
    path('admin/', admin.site.urls),
    path('api/v1/', include('app.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    path('api/v1/rest-auth/registration/',
         include('rest_auth.registration.urls')),
    path('docs/', include_docs_urls(title=API_TITLE,
                                    description=API_DESCRIPTION)),
    # path('schema/', schema_view), # 追加
    path('swagger-docs/', schema_view),  # 追加
    path("auth/user/", UserAPI.as_view()),
]
