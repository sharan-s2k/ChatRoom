from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'hello/hello.html') # the file path that we give here is relative to the templates folder in the app folder (learn_by_try/templates/*)

def helloTo(request, name):
    return HttpResponse("Hello, " + name.capitalize() + "!")

def helloHTML(request, name):
    return render(request, 'greet.html', {
        'name': name.capitalize()
    })