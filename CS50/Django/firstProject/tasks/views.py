from django import forms
from django.shortcuts import render

# Need to import these two classes to redirect the user to the index page after they have submitted the form.
from django.http import HttpResponseRedirect
from django.urls import reverse

tasks = ["ORG - Task"]

class NewTaskForm(forms.Form):
    task = forms.CharField(label="New Task")
    priority = forms.IntegerField(label="Priority", min_value=1, max_value=10)
    # The form will have a single field called task, which will be a CharField. The label for the field will be "New Task".
    # It will also automatically do both client and server-side validation to ensure that the user has entered a value for the task field.

# Create your views here.
def index(request):
    return render(request, "tasks/index.html", { #it is good practice to put the html files in a folder called templates
        "tasks": tasks
    })

def add(request):
    if request.method == "POST":
        form = NewTaskForm(request.POST) # The request.POST argument is a dictionary-like object that contains data that the user submitted via a form.
        if form.is_valid(): # This method will return True if the form data is valid and has been cleaned. 
            task = form.cleaned_data["task"] # The cleaned_data attribute is a dictionary containing the form’s data after it has been validated and cleaned.
            tasks.append(task)
            # This is a valid way of redirecting the user to the index page after they have submitted the form. But there is a better way to do this, which is to use the HttpResponseRedirect function.
            # return render(request, "tasks/index.html", {
            #     "tasks": tasks
            # })
            return HttpResponseRedirect(reverse("tasks:index"))
            # The reverse function will generate a URL for the tasks:index URL pattern. This is the URL that corresponds to the index view function in the tasks application.
            # The HttpResponseRedirect function will create an HTTP response that will redirect the user to the specified URL. The user will be redirected to the index page.
            # HttpResponseRedirect is better because it will prevent the user from accidentally resubmitting the form if they refresh the page.
            # If you use render, the user will be redirected to the index page, but if they refresh the page, the form will be resubmitted again.
        else:
            return render(request, "tasks/add.html", {
                "form": form
            })
    return render(request, "tasks/add.html", {
        "form": NewTaskForm()
    })
# here we are creating an instance of the NewTaskForm class and passing it to the template as a context variable called form.




# The Problem with render()
# When you use render() after a form submission, the browser's last action is the POST request that submitted the data. If the user refreshes the page, the browser tries to resend that same POST request, which can cause duplicate data (like adding the same task twice).

# The Solution with HttpResponseRedirect
# When you use HttpResponseRedirect, the server tells the browser, "Okay, I got your data. Now go to this new URL." The browser then makes a new GET request to that URL. The browser's last action is now a safe GET request. If the user refreshes, it just re-requests the page without resubmitting the form.

# In Short
# render() keeps the last browser action as a POST (unsafe to repeat), while HttpResponseRedirect changes it to a GET (safe to repeat).