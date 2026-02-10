from django.shortcuts import render

# Create your views here.
from django.shortcuts import render



def custome_dashboard(request):
    context = {
       
    }
    return render(request, 'dashboard/index.html', context)

