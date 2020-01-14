# Generated by Django 2.2.4 on 2020-01-08 18:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_userprofile_supplementary_application_posts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='owner',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL),
        ),
    ]
