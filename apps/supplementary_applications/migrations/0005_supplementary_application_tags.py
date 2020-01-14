# Generated by Django 2.2.4 on 2019-10-13 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplementary_applications', '0004_auto_20191013_1644'),
    ]

    operations = [
        migrations.AddField(
            model_name='supplementary_application',
            name='tags',
            field=models.CharField(choices=[('ACCEPTED', 'Accepted'), ('REJECTED', 'Rejected'), ('WAITLISTED', 'Waitlist'), ('AIF', 'AIF')], default=('ACCEPTED', 'Accepted'), max_length=20),
        ),
    ]
