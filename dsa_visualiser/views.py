from django.contrib import messages
from django.contrib import auth
from django.shortcuts import redirect, render
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from dsa_visualiser.models import *

history_list = ["username", "linkedListBo", "linkedListApp", "stackBo", "stackAppl", "queueBo", "queueAppl", "linearSearch", "binarySearch", "insertionSort", "mergeSort"]

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

        history = History.objects.create(username = myuser, linkedListBo=0, linkedListAppl=0, stackBo=0, stackAppl=0, queueBo=0, queueAppl=0, linearSearch=0, binarySearch=0, insertionSort=0, mergeSort=0)
        history.save()

        return redirect('signin')

    return render(request, "authentication/registration.html")


def signout(request):
    logout(request)
    return redirect('signin')

@login_required(login_url="signin")
def dashboard(request):
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    if history.linkedListBo == 2:
        history1.append("linkedListBo")
    if history.linkedListAppl == 2:
        history1.append("linkedListAppl")
    if history.stackBo == 2:
        history1.append("stackBo")
    if history.stackAppl == 2:
        history1.append("stackAppl")
    if history.queueBo == 2:
        history1.append("queueBo")
    if history.queueAppl == 2:
        history1.append("queueAppl")
    if history.linearSearch == 2:
        history1.append("linearSearch")
    if history.binarySearch == 2:
        history1.append("binarySearch")
    if history.insertionSort == 2:
        history1.append("insertionSort")
    if history.mergeSort == 2:
        history1.append("mergeSort")
    
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'dashboard'})

@login_required(login_url="signin")
def linear_search(request):
    history = History.objects.get(username = request.user)
    history.linearSearch = 1
    history.save()
    return render(request, "linear_search/Linear Search.html")

@login_required(login_url="signin")
def stack(request):
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    if history.linkedListBo == 2:
        history1.append("linkedListBo")
    if history.linkedListAppl == 2:
        history1.append("linkedListAppl")
    if history.stackBo == 2:
        history1.append("stackBo")
    if history.stackAppl == 2:
        history1.append("stackAppl")
    if history.queueBo == 2:
        history1.append("queueBo")
    if history.queueAppl == 2:
        history1.append("queueAppl")
    if history.linearSearch == 2:
        history1.append("linearSearch")
    if history.binarySearch == 2:
        history1.append("binarySearch")
    if history.insertionSort == 2:
        history1.append("insertionSort")
    if history.mergeSort == 2:
        history1.append("mergeSort")
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'stack'})

@login_required(login_url="signin")
def stackBO(request):
    history = History.objects.get(username = request.user)
    history.stackBo = 1
    history.save()
    return render(request, "stack/stack.html")

@login_required(login_url="signin")
def stackAppl(request):
    history = History.objects.get(username = request.user)
    history.stackAppl = 1
    history.save()
    return render(request, "stack/stack_toh.html")

@login_required(login_url="signin")
def queue(request):
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    if history.linkedListBo == 2:
        history1.append("linkedListBo")
    if history.linkedListAppl == 2:
        history1.append("linkedListAppl")
    if history.stackBo == 2:
        history1.append("stackBo")
    if history.stackAppl == 2:
        history1.append("stackAppl")
    if history.queueBo == 2:
        history1.append("queueBo")
    if history.queueAppl == 2:
        history1.append("queueAppl")
    if history.linearSearch == 2:
        history1.append("linearSearch")
    if history.binarySearch == 2:
        history1.append("binarySearch")
    if history.insertionSort == 2:
        history1.append("insertionSort")
    if history.mergeSort == 2:
        history1.append("mergeSort")
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': history1,'dashboard':'queue'})

@login_required(login_url="signin")
def queueBO(request):
    history = History.objects.get(username = request.user)
    history.queueBo = 1
    history.save()
    return render(request, "queue/queue.html")

@login_required(login_url="signin")
def insertionsort(request):
    history = History.objects.get(username = request.user)
    history.insertionSort = 1
    history.save()
    return render(request, "insertion_sort/insertion_sort.html")

@login_required(login_url="signin")
def mergesort(request):
    history = History.objects.get(username = request.user)
    history.mergeSort = 1
    history.save()
    return render(request, "merge_sort/merge_sort.html")
    
@login_required(login_url="signin")
def queueAppl(request):
    history = History.objects.get(username = request.user)
    history.queueAppl = 1
    history.save()
    return render(request, "queue/queue_pc.html")

@login_required(login_url="signin")
def sorting(request):
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    if history.linkedListBo == 2:
        history1.append("linkedListBo")
    if history.linkedListAppl == 2:
        history1.append("linkedListAppl")
    if history.stackBo == 2:
        history1.append("stackBo")
    if history.stackAppl == 2:
        history1.append("stackAppl")
    if history.queueBo == 2:
        history1.append("queueBo")
    if history.queueAppl == 2:
        history1.append("queueAppl")
    if history.linearSearch == 2:
        history1.append("linearSearch")
    if history.binarySearch == 2:
        history1.append("binarySearch")
    if history.insertionSort == 2:
        history1.append("insertionSort")
    if history.mergeSort == 2:
        history1.append("mergeSort")
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'sorting'})

@login_required(login_url="signin")
def searching(request):
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    if history.linkedListBo == 2:
        history1.append("linkedListBo")
    if history.linkedListAppl == 2:
        history1.append("linkedListAppl")
    if history.stackBo == 2:
        history1.append("stackBo")
    if history.stackAppl == 2:
        history1.append("stackAppl")
    if history.queueBo == 2:
        history1.append("queueBo")
    if history.queueAppl == 2:
        history1.append("queueAppl")
    if history.linearSearch == 2:
        history1.append("linearSearch")
    if history.binarySearch == 2:
        history1.append("binarySearch")
    if history.insertionSort == 2:
        history1.append("insertionSort")
    if history.mergeSort == 2:
        history1.append("mergeSort")
    return render(request, "dashboard/dashboard.html", {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'searching'})

@login_required(login_url="signin")
def storeAnimationDoneStatus(request, animation):
    history = History.objects.get(username = request.user)
    if animation == "linkedListBo":
        history.linkedListBo = 2
    elif animation == "linkedListAppl":
        history.linkedListAppl = 2
    elif animation ==  "stackBo":
        history.stackBo = 2
    elif animation == "stackAppl":
        history.stackAppl = 2
    elif animation == "queueBo":
        history.queueBo = 2
    elif animation == "queueAppl":
        history.queueAppl = 2
    elif animation == "linearSearch":
        history.linearSearch = 2
    elif animation == "binarySearch":
        history.binarySearch = 2
    elif animation == "insertionSort":
        history.insertionSort = 2
    elif animation == "mergeSort":
        history.mergeSort = 2
    history.save()
    return redirect("/dashboard")