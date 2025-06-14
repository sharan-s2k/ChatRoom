from django import forms
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

''' tasks = ["ORG - Task"] '''
# One problem with using a global task is that every user will see the same task list.
# This can be seen by opening two different browsers windows (one normal and one incognito) and adding a task in one browser.

# To overcome this we can use sessions to store the task list for each user.
# The session is a dictionary that can be used to store data on a per-site-visitor basis.
# The session data is stored in a database and is deleted when the user closes the browser.
# The session data is stored in a table called django_session.
    # For now just know that using python manage.py migrate will create the table for you.

class NewTaskForm(forms.Form):
    task = forms.CharField(label="New Task")
    priority = forms.IntegerField(label="Priority", min_value=1, max_value=10)

# Create your views here.
def index(request):
    if "tasks" not in request.session:
        request.session["tasks"] = [] # Here we are creating a new session variable called tasks.
    return render(request.session["tasks"], "tasks/index.html", {
        "tasks": request.session["tasks"]
    })

def add(request):
    if request.method == "POST":
        form = NewTaskForm(request.POST)
        if form.is_valid(): 
            task = form.cleaned_data["task"]
            # tasks.append(task)
            # request.session["tasks"].append(task) # This does notwork because the session is a dictionary and not a list.
            request.session["tasks"] += [task]
            return HttpResponseRedirect(reverse("tasks:index"))
        else:
            return render(request, "tasks/add.html", {
                "form": form
            })
    return render(request, "tasks/add.html", {
        "form": NewTaskForm()
    })

# When you do request.session['tasks'].append(task), you are modifying the list object that request.session['tasks'] refers to. 
# However, the session dictionary itself still points to the same list object in memory. 
# Django's session middleware only saves the session to the database if it detects that a value in the session dictionary has been directly assigned or deleted. 
# Since you only modified the contents of the list without reassigning it, Django assumes nothing has changed and doesn't save the session.
# On the other hand, request.session['tasks'] += [task] works because this operation effectively creates a new list (by concatenating the old list with [task]) and 
# then reassigns this new list to request.session['tasks']. This reassignment is a change that Django's session framework does detect, so it correctly saves the updated list to the database.

# request.session -> This is the dictionary-like session object.
# request.session["tasks"] -> This is the list stored as a value inside the session dictionary.
# Because request.session["tasks"] is a list, calling .append(task) on it is a valid operation. It successfully modifies the list in memory, and Python does not throw an error.