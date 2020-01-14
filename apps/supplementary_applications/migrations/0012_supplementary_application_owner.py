# Generated by Django 2.2.4 on 2019-10-17 05:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('supplementary_applications', '0011_auto_20191013_1826'),
    ]

    operations = [
        migrations.AddField(
            model_name='supplementary_application',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='supplementaryApplications', to=settings.AUTH_USER_MODEL),
        ),
    ]
