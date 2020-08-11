# GUIGraphDB

Beginnings of a GUI to interact with a Graph DB in Neo4j and store information to train a NER Model

Allows upload of txt files and for users to select and classify texts. This is put into a graph db for the knowledge graph and a relational db to store data to train a model for Named Entity Recognition.

Some Requirements and Info as we were not able to upload to an EC2 instance so running must be done locally:
Django 2.2.7
Python 3
Neo4j running locally with a database running with username: neo4j, password: password. This can be modified, but you must also modify driver in GraphDBFirst/GraphDBImport/views.py

To Run: 
1. From in the directory with manage.py run the command: python manage.py runserver
2. Go to http://127.0.0.1:8000/DBImport/ upload a .txt file
3. Select text from the article, right click, and use the menu to label entities.
4. After finishing labelling, click the create objects button to create in both db mentioned aboved. If an input is modified, it will not go in to the relational db as it can no longer be used for NER training.
5. Go back to step 2.
