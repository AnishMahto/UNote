from django.db import models
from django.contrib.auth.models import User

from ..general.post_tags import POST_TAGS
from ..programs.models import Program
from ..universities.models import University

class SupplementaryApplication (models.Model):

    TAGS = POST_TAGS

    YEARS = [(str(year), str(year)+str("/")+str(year+1)) for year in range (2000,2050)]

    title = models.CharField(max_length=100)
    url = models.URLField(max_length=100)
    net_upvotes = models.IntegerField(default=0)
    upvoters = models.ManyToManyField(User, related_name="upvoters", blank=True)
    downvoters = models.ManyToManyField(User, related_name="downvoters", blank=True)
    description = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    year = models.CharField(max_length=10, choices=YEARS)
    university = models.ForeignKey(University, related_name='posts', on_delete=models.CASCADE)
    program = models.ForeignKey(Program, related_name='posts', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name="supplementary_applications", on_delete=models.CASCADE)
    tag = models.CharField(max_length=50, choices=TAGS, blank=True)
    #REMOVE null=True

    # tags = models.CharField(max_length=20, choices=TAGS)


    #need to create relation to user and university models
