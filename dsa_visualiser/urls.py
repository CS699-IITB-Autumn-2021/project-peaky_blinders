from django.urls import path
from . import views

urlpatterns = [
    path('', views.signin, name="signin"),
    path('register', views.register, name="register"),
    path('logout', views.signout, name="signout"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('linear-search', views.linear_search, name="linearsearch"),
    path('stack', views.stack, name="stack"),
    path('stack-BO', views.stackBO, name="stackBO"),
    path('stack-appl', views.stackAppl, name="stackAppl"),
    path('binary-search',views.binary_search,name="binarysearch")

    path('insertion-sort', views.insertionsort, name="insertionsort"),
    path('merge-sort', views.mergesort, name="mergesort"),
    path('queue', views.queue, name="queue"),
    path('queue-BO', views.queueBO, name="qeueuBO"),
#     path('queue-appl', views.queueAppl, name="queueAppl")
]
