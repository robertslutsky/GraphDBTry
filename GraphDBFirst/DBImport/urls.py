from django.urls import path
from . import views

urlpatterns = [
    path('', views.upload, name='import'),
    path('file', views.select_objects_to_import, name='select_objects_to_import'),
    path('ajax-create-objects', views.ajax_create_objects, name='ajax_create_objects'),
    path('ajax-create-objects-ner', views.ajax_create_objects_ner, name='ajax_create_objects_ner'),


]
