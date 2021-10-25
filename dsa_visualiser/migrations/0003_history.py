# Generated by Django 3.2.7 on 2021-10-24 18:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dsa_visualiser', '0002_delete_history'),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('linkedListBo', models.IntegerField()),
                ('linkedListAppl', models.IntegerField()),
                ('stackBo', models.IntegerField()),
                ('stackAppl', models.IntegerField()),
                ('queueBo', models.IntegerField()),
                ('queueAppl', models.IntegerField()),
                ('linearSearch', models.IntegerField()),
                ('binarySearch', models.IntegerField()),
                ('insertionSort', models.IntegerField()),
                ('mergeSort', models.IntegerField()),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]