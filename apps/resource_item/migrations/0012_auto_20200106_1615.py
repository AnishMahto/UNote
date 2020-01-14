# Generated by Django 2.2.4 on 2020-01-06 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resource_item', '0011_resourceitem_resource_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resourceitem',
            name='resource_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resources', to='resource_type.ResourceType'),
        ),
    ]
