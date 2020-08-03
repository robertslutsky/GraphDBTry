from django.db import models

# Create your models here.
class Article(models.Model):
    article_text = models.TextField()


class Entity(models.Model):
    article = models.ForeignKey(Article,on_delete=models.CASCADE)
    word = models.CharField(max_length=200)
    label = models.CharField(max_length=200)
    beginning_position = models.IntegerField()
    end_position = models.IntegerField()
