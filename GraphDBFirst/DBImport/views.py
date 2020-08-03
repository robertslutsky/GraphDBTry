from django.shortcuts import render
from django.http import HttpResponse
from neo4j import GraphDatabase
import json
from DBImport.models import Article, Entity
driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", "password"))
session = driver.session()

#upload file to select objects from
def upload(request):
    return render(request, 'DBImport/upload.html')


#displays uploaded file content and allows objects be selected and classified
def select_objects_to_import(request):
    if(request.POST):
        file = request.FILES['file']
        text = file.read().decode('utf-8')
        if not text:
            return render(request, 'DBImport/upload.html',)
        return render(request, 'DBImport/select_objects_to_import.html',{'text':text})
    else:
        return render(request, 'DBImport/upload.html')


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


#creates objects in relation db for NER training
def ajax_create_objects_ner(request):
        x = json.loads(request.POST["object_label_quads"])
        print(request.POST)
        text = request.POST["text"]
        if text:
            article = Article.objects.create(article_text=text)
            article.save()
            if x:
                for word, label, start, end in x:
                    entity = Entity.objects.create(word=word, article = article, beginning_position=start, end_position=end, label=label)
                    entity.save()
                return HttpResponse("Object Created")
        return HttpResponse("Are you lost")
