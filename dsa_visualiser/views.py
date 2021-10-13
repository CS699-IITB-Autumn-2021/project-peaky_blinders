from django.contrib import messages
from django.contrib import auth
from django.shortcuts import redirect, render
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

#Add the logic to redirect to same page from where sign in was redirected
def signin(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    elif request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Wrong credentials")
            return redirect('signin')
        
    return render(request, "authentication/index.html")


def register(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    elif request.method == "POST":
        username = request.POST['email']
        email = request.POST['email']
        fname = request.POST['fname']
        lname = request.POST['lname']
        password = request.POST['pass1']

        if User.objects.filter(username=username):
            messages.error(request, "User already exists..")
            return render(request, "authentication/registration.html", { 'message' : "User Already Registered" })

        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname

        myuser.save()

        return redirect('signin')

    return render(request, "authentication/registration.html")


def signout(request):
    logout(request)
    return redirect('signin')

@login_required(login_url="signin")
def dashboard(request):
    user = User.objects.get(username = request.user)
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': {'Linear Search', 'Linked List', 'Sorting', 'Stack Basic Operations'}})

@login_required(login_url="signin")
def linear_search(request):
    return render(request, "linear_search/Linear Search.html")

@login_required(login_url="signin")
def stack(request):
    user = User.objects.get(username = request.user)
    return render(request, "dashboard/dash_stack.html", {'name':user.first_name+" "+user.last_name, 'history': {'Linear Search', 'Linked List', 'Sorting', 'Stack Basic Operations'}})

@login_required(login_url="signin")
def stackBO(request):
    return render(request, "stack/stack.html")

@login_required(login_url="signin")
def stackAppl(request):
    return render(request, "stack/stack_toh.html")