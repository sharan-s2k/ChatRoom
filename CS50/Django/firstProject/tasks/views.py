from django.shortcuts import render

tasks = ["task1", "task2", "task3", "task4", "task5"]

# Create your views here.
def index(request):
    return render(request, "tasks/index.html", { #it is good practice to put the html files in a folder called templates
        "tasks": tasks
    })

def add(request):
    return render(request, "tasks/add.html")