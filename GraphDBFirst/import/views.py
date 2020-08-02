from django.shortcuts import render
from django.http import HttpResponse
from neo4j import GraphDatabase
import json
driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", "password"))
session = driver.session()

#upload file to select objects from
def upload(request):
    return render(request, 'import/upload.html')


#displays uploaded file content and allows objects be selected and classified
def select_objects_to_import(request):
    if(request.POST):
        file = request.FILES['file']
        text = file.read().decode('utf-8')
        if not text:
            return render(request, 'import/upload.html',)
        return render(request, 'import/select_objects_to_import.html',{'text':text})
    else:
        return render(request, 'import/upload.html')


#creates object in Neo4j GraphDB
def ajax_create_objects(request):
    x = json.loads(request.POST["object_label_pairs"])
    if x:
        for name, label in x:
            stmt = "MERGE (n:"+label+" {name: \""+name+"\"})"
            session.run(stmt)
            session.close()
        return HttpResponse("Object Created")
    else:
        return HttpResponse("Are you lost")
