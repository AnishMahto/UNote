# Generated by Django 2.2.4 on 2019-12-18 16:14

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('universities', '0001_initial'),
        ('programs', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('supplementary_applications', '0019_auto_20191218_1600'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Supplementary_Application',
            new_name='SupplementaryApplication',
        ),
    ]
