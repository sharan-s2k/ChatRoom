from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'), # This basically means that when the user goes to the default route on this application (learn_by_try), run the index function in the views.py file (which is one of my views)
# the order matters here, if views.helloHTML comes first only that will be called (views.helloTo will be ignored) 
# if views.helloHTML fails, then views.helloTo will be called   
    path("<str:name>", views.helloHTML, name='htmlGreet'),
    path("<str:name>", views.helloTo, name='greet'), 
]