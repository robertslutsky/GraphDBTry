from django.db import models

# Create your models here.
class Article(models.Model):
    article_text = models.TextField()


class NLPObject(models.Model):
    article = models.ForeignKey(Article,on_delete=models.CASCADE)
    word = models.CharField(max_length=200)
    beginningPos = models.IntegerField()
    endPos = models.IntegerField()
