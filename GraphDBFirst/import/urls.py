from django.urls import path
from . import views

urlpatterns = [
    path('', views.upload, name='import'),
    path('file', views.select_objects_to_import, name='select_objects_to_import'),
    path('ajax-create-object', views.ajax_create_object, name='ajax_create_object'),

]
