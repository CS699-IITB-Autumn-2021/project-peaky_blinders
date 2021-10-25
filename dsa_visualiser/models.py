from django.db import models

# Create your models here.

class History(models.Model):
    username = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    linkedListBo = models.IntegerField()
    linkedListAppl = models.IntegerField()
    stackBo = models.IntegerField()
    stackAppl = models.IntegerField()
    queueBo = models.IntegerField()
    queueAppl = models.IntegerField()
    linearSearch = models.IntegerField()
    binarySearch = models.IntegerField()
    insertionSort = models.IntegerField()
    mergeSort = models.IntegerField()