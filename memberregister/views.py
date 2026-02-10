from django.shortcuts import render

# Create your views here.
def memberCreate(request):
    return render(request, 'memberregister/member_create.html')