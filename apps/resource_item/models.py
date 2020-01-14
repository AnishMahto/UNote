from django.db import models
from django.contrib.auth.models import User

from ..programs.models import Program
from ..universities.models import University
from ..resource_type.models import ResourceType

from django.conf import settings
from django.core.files import File
from django.core.files.storage import default_storage, FileSystemStorage
from django.core.files.temp import NamedTemporaryFile

import os
from urllib.parse import urlsplit
import requests
import favicon
from PIL import Image

# Create your models here.

class ResourceItem (models.Model):
    title = models.CharField(max_length=50)
    # thumbnail = models.ImageField(upload_to='images', max_length=300, null=True)
    url_base = models.CharField(max_length=50, blank=True)
    url = models.URLField(max_length=100)
    resource_type = models.ForeignKey(ResourceType, related_name='resource_items', on_delete=models.CASCADE)
    university = models.ForeignKey(University, related_name='resource_items', on_delete=models.CASCADE)
    program = models.ForeignKey(Program, related_name='resource_items', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name="resource_items", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)