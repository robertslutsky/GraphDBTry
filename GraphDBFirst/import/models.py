from django.db import models

# Create your models here.
class Article(models.Model):
    article_text = models.TextField()


class NLPObject(models.Model):
    article = models.ForeignKey(Article,on_delete=models.CASCADE)
