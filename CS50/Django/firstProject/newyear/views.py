from django.shortcuts import render
import datetime

# Create your views here.
def isnewyear(request):
    now = datetime.datetime.now()
    return render(request, 'isnewyear.html', {
        'newyear': now.month == 1 and now.day == 1
    }) 

def daysToNY(request):
    now = datetime.datetime.now()
    newyear = datetime.datetime(now.year + 1, 1, 1)
    delta = newyear - now
    return render(request, 'daysToNY.html', {
        'days': delta.days
    })