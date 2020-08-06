# GUIGraphDB

Beginnings of GUI
Allows upload of txt files and for users to select and classify texts. This is put into a graph db for the knowledge graph and a relational db to store data to train a model for Named Entity Recognition.

Some Requirements as we were not able to upload to an EC2 instance so running must be done locally:
Django 2.2.7
Python 3
Neo4j running locally with a database running with username: neo4j, password: password. This can be modified but must also modify driver in GraphDBFirst/GraphDBImport/views.py
