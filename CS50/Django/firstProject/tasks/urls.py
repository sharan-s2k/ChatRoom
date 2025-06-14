from django.urls import path
from . import views 

# If we are giving a namespace to the app, we need to add the app_name variable to the urls.py file.
# But once this is given, we need to change the way we refer to the urls in the html files.
# For example, in the index.html file, we need to change the href attribute of the anchor tag to the following:
# from :
# <a href="{% url 'add' %}">Add a new task</a>
# to:
# <a href="{% url 'tasks:add task' %}">Add a new task</a>

# if we dont do that and we try to access the add task page, we will get the following error:
# NoReverseMatch at /tasks/add
# Reverse for 'add task' not found. 'add task' is not a valid view function or pattern name.

app_name = 'tasks'
urlpatterns = [
    path("", views.index, name='index'),
    path("add", views.add, name='add task')
]