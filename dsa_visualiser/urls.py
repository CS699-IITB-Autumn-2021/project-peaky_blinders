"""Imports"""
from django.urls import path
from . import views
# Paths for different urls provied by this website
urlpatterns = [
    path('', views.signin, name="signin"),
    path('register', views.register, name="register"),
    path('logout', views.signout, name="signout"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('linear-search', views.linear_search, name="linearsearch"),
    path('stack', views.stack, name="stack"),
    path('stack-BO', views.stack_bo, name="stackBO"),
    path('stack-appl', views.stack_appl, name="stackAppl"),
    path('binary-search',views.binary_search,name="binarysearch"),
    path('insertion-sort', views.insertionsort, name="insertionsort"),
    path('merge-sort', views.mergesort, name="mergesort"),
    path('queue', views.queue, name="queue"),
    path('queue-BO', views.queue_bo, name="qeueuBO"),
    path('queue-appl', views.queue_appl, name="queueAppl"),
    path('sorting', views.sorting, name="sorting"),
    path('searching', views.searching, name="searching"),
    path('done/<animation>', views.store_animation_done_status, name="done"),
    path('linkedlist-appl', views.linkedlist_appl, name="linkedlistAppl"),
    path('linkedlist-bo', views.linkedlist_bo, name="linkedlistBO"),
    path('linkedlist', views.linkedlist, name="linkedlist")
 ]
