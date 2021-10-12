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
    # path('stack-appl', views.stackAppl, name="stackAppl")
]