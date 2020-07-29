from django.shortcuts import render
from django.http import HttpResponse

def upload(request):
    return render(request, 'import/upload.html')

def select_objects_to_import(request):
    if(request.POST):
        file = request.FILES['file']
        text = file.read().decode('utf-8')
        print(text)
        if not text:
            return render(request, 'import/upload.html',)
        return render(request, 'import/select_objects_to_import.html',{'text':text})
    else:
        return render(request, 'import/upload.html')
