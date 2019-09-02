from django.db import models

# Create your models here.
class Summative(models.Model):
    title = models.CharField(max_length=200)
    #author
    grade = models.IntegerField()
    organization = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    resource_link = models.CharField(max_length=200)
    description = models.CharField(max_length=500, blank=True)
    likes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
