## Steps to setup environment
Step 1. Create a virtual environment<br>
`python3 -m venv venv`
<details>
<summary>Example</summary>

    ssharan@ssharan-mbp Django % python3 -m venv myEnv
    ssharan@ssharan-mbp Django % ls
    myEnv
</details>

<br>

Step 2. Enter/Activate the virtual environment<br>
`source venv/bin/activate`
<details>
<summary>Example</summary>

    ssharan@ssharan-mbp Django % source myEnv/bin/activate
    (myEnv) ssharan@ssharan-mbp Django % 

    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate     # On Windows

</details>

<br>

Step 3. Install all dependancies/requirements<br>
`pip install -r requirements.txt`

<br>

> Or you can just run this script:<br>
`./setup.sh`


### Note:
You only have to create the virtual env once(the above steps). After that you can jsut login to it using:<br>`source myEnv/bin/activate`

To capture all requirements:<br>
`pip freeze > requirements.txt`


## To start a new Django project:<br>
`django-admin startproject firstProject`
<details>
<summary>Example</summary>

    (myEnv) ssharan@ssharan-mbp Django % django-admin startproject firstProject
    (myEnv) ssharan@ssharan-mbp Django % cd firstProject 
    (myEnv) ssharan@ssharan-mbp firstProject % ls
    firstProject    manage.py
    (myEnv) ssharan@ssharan-mbp firstProject % tree
    .
    ├── firstProject
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── manage.py

    2 directories, 6 files
</details>

<br>

<b>Root Directory (firstProject/)</b><br>
`manage.py`: A command-line utility that lets you interact with this Django project in various ways, such as running the development server, creating apps, and applying migrations.
- Start the development server:<br>
`python manage.py runserver`<br>
- Create a new app within the project:<br>
`python manage.py startapp <appName>`<br>
- Apply database migrations:<br>
`python manage.py migrate`<br>
<br>

<b>Project Configuration Directory (firstProject/firstProject/)</b><br>
`__init__.py`: <br>
An empty file that marks this directory as a Python package. It allows Python to recognize firstProject/ as a module that can be imported.<br>
You typically don’t need to edit this file; it’s just a convention for Python packages.

`settings.py`: <br>
Contains all the configuration settings for your Django project, including database setup, installed apps, middleware, security settings, and more.

`urls.py`: <br>
Defines the URL routing for your project, mapping URLs to views (functions or classes that handle HTTP requests and return responses).

`wsgi.py`: <br>
Stands for Web Server Gateway Interface. This file provides an entry point for WSGI-compatible web servers (like Gunicorn or uWSGI) to serve your Django project in a production environment.

`asgi.py`: <br>
Stands for Asynchronous Server Gateway Interface. Similar to wsgi.py, but for asynchronous web servers and applications. It supports Django's asynchronous features (introduced in later versions for real-time features like WebSockets).

<u><b>Note:</b></u> One project can have multiple apps... like imagine google is the project and google-search, google-images, google-maps, google-news are the apps

##   To create an App:<br>
`python manage.py startapp <appName>`
<details>
<summary>Example</summary>

    (myEnv) ssharan@ssharan-mbp firstProject % python manage.py startapp learn_by_try 
    (myEnv) ssharan@ssharan-mbp firstProject % cd learn_by_try 
    (myEnv) ssharan@ssharan-mbp learn_by_try % tree
    .
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py

    2 directories, 7 files
</details>

<br>

Now we have created the app, but we should install it into the project. <br>
For that we have to go to the `settings.py` of out project (firstProject) and just add the app we created under the `INSTALLED_APPS` list
<details>
<summary>Example</summary>

       INSTALLED_APPS = [
    +       'learn_by_try',
            'django.contrib.admin',
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
        ]
</details>

<br>

Now if we want to access this app which we have created, we need a url to do that!<br>
So we have to specify that url in the `urls.py` out project (firstProject)<br>
Here we can also ask django to import the urls from our app so we can have nested urls<br>
Eg : <br>
    - http://127.0.0.1:8000/learn_by_try/ <br>
    - http://127.0.0.1:8000/is-new-year/<br>
<details>
<summary>Example</summary>

        from django.contrib import admin
        from django.urls import include, path

        urlpatterns = [
            path('admin/', admin.site.urls),
    +       path('learn_by_try/', include('learn_by_try.urls')),
    +       path('is-new-year/', include('newyear.urls')),
        ]
</details>

<br>

## Now getting into more things we can do

### Statics

In addition to this we can add static files like CSS in a separate folder called static within out app directory. To link it to the html file we can use `{% load static %}` and to use it within the html we can just `<link rel="stylesheet" href="{% static 'styles.css' %}">`

<details>
<summary>Example</summary>
 
     myEnvssharan@ssharan-mbp newyear % tree
     .
     ├── __init__.py
     ├── __pycache__
     │   ├── __init__.cpython-313.pyc
     │   ├── admin.cpython-313.pyc
     │   ├── apps.cpython-313.pyc
     │   ├── models.cpython-313.pyc
     │   ├── urls.cpython-313.pyc
     │   └── views.cpython-313.pyc
     ├── admin.py
     ├── apps.py
     ├── migrations
     │   ├── __init__.py
     │   └── __pycache__
     │       └── __init__.cpython-313.pyc
     ├── models.py
+    ├── static
     │   └── styles.css
     ├── templates
     │   ├── daysToNY.html
     │   └── isnewyear.html
     ├── tests.py
     ├── urls.py
     └── views.py
 
     6 directories, 18 files
</details>

### Blocks (Dynamic HTML)

They are a key mechanism for template inheritance, which allows you to create a base (or parent) template with common structure and content, and then customize specific parts in child templates.<br>

A block is marked by `{% block <any_name> %}` and closed by `{% endblock %}`, where <any_name> is a unique identifier for that block.<br>

Any content between the opening and closing of the block is called default content and will be overwritten by the child.

<details>
<summary>Example</summary>
 
    {% block <any_name> %}
    <!-- Default content or placeholder -->
    {% endblock %}

base.html

```html
    <!DOCTYPE html>
    <html>
    <head>
    <title>{% block title %}My Site{% endblock %}</title>
    </head>
    <body>
    <header>
        <h1>Welcome to My Site</h1>
    </header>
    <main>
        {% block content %}
        <p>This is the default content.
           !!!And will not overwritten by the child!!!
        </p>
        {% endblock %}
    </main>
    <footer>
        <p>© 2025 My Site</p>
    </footer>
    </body>
    </html>
```

child.html

```html
    {% extends "base.html" %}

    {% block title %}
    Home - My Site
    {% endblock %}

    {% block content %}
    <h2>Welcome to the Home Page</h2>
    <p>This is the customized content for the home page.</p>
    {% endblock %}
```

rendered result

```html
    <!DOCTYPE html>
    <html>
    <head>
    <title>Home - My Site</title>
    </head>
    <body>
    <header>
        <h1>Welcome to My Site</h1>
    </header>
    <main>
        <h2>Welcome to the Home Page</h2>
        <p>This is the customized content for the home page.</p>
    </main>
    <footer>
        <p>© 2025 My Site</p>
    </footer>
    </body>
    </html>
```
</details>

### Linking Pages

In Django templates, you can create links to other pages.

<!-- This is how we normally would add a link to the page: -->
```html
<a href="/tasks/add">Traditional Way</a>
```

<!-- But we can use Django's url template tag to generate the URL for us: -->
<!-- This works by referencing the name of the URL pattern we gave in our urls.py file.
    In this case, the name of the URL pattern is 'add task'. We can see this in the urls.py file in the tasks app. -->
```html
<a href="{% url 'tasks:add task' %}">Add Task</a>
```
The `{% url %}` tag is preferred because it's more robust to URL changes. If you change the URL path in `urls.py`, you don't need to update it in all your templates, as long as the URL name remains the same. The `'tasks:add task'` syntax refers to the URL pattern named `add task` within the application namespace `tasks`.


