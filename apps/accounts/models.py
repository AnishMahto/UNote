from django.db import models
from django.contrib.auth.models import User
from ..supplementary_applications.models import SupplementaryApplication
from django.db.models.signals import post_save

# Create your models here.
class UserProfile (models.Model):
    owner = models.OneToOneField (User, on_delete=models.CASCADE, related_name="user_profile")
    net_upvotes = models.IntegerField(default=0)
    total_contributions = models.IntegerField(default=0)
    username = models.CharField(max_length=150, blank=False)
    
def create_user_profile (sender, **kwargs):
    if kwargs["created"]:
        UserProfile.objects.create(owner = kwargs["instance"], username = kwargs["instance"].username)

# def add_supplementary_application_post (sender, **kwargs):
#     if kwargs["created"]:
#         UserProfile.objects.filter(owner = kwargs["instance"].owner).update(supplementary_application_posts = kwargs["instance"])

#everytime a User object is created, call the create_user_profile function
post_save.connect (create_user_profile, sender=User)
# post_save.connect (add_supplementary_application_post, sender=Supplementary_Application)