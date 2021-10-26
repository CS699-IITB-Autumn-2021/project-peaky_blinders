"""Imports"""
from django.contrib import messages
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from dsa_visualiser.models import History

# list of History table attributes
history_list = ["linkedListBo", "linkedListAppl", "stackBo", "stackAppl",
"queueBo", "queueAppl", "linearSearch", "binarySearch", "insertionSort", "mergeSort"]


def signin(request):
    """Takes signin request with username and password from front end,
    processes it and authenticates user.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """


    # if user is signed in redirect to dashboard
    if request.user.is_authenticated:
        return redirect('dashboard')
    # extract data from request object
    elif request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        # signin user and redirect to dashboard
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Wrong credentials")
            return redirect('signin')

    return render(request, "authentication/index.html")

def register(request):
    """Takes register request with username, Name, password from front end, processes it and
    registers only unique user.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # if user already signed in redirect to dashboard
    if request.user.is_authenticated:
        return redirect('dashboard')
    # extract parameters from request
    elif request.method == "POST":
        username = request.POST['email']
        email = request.POST['email']
        fname = request.POST['fname']
        lname = request.POST['lname']
        password = request.POST['pass1']

        #check for unique username and if already present in DB return error
        if User.objects.filter(username=username):
            messages.error(request, "User already exists..")
            return render(request, "authentication/registration.html",
            { 'message' : "User Already Registered" })

        #create entry in DB
        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname

        myuser.save()

        #create history object in DB
        history = History.objects.create(username = myuser, linkedListBo=0,
        linkedListAppl=0, stackBo=0, stackAppl=0, queueBo=0, queueAppl=0,
        linearSearch=0, binarySearch=0, insertionSort=0, mergeSort=0)
        history.save()
        messages.success(request, "User registered successfully..")
        return redirect('signin')

    return render(request, "authentication/registration.html")

def signout(request):
    """Takes signout request from front end, processes it and signs out user.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # signout user
    logout(request)
    return redirect('signin')

@login_required(login_url="signin")
def dashboard(request):
    """Takes redirect dashboard request from front end, processes it and redirects to dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and render dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'dashboard'})

@login_required(login_url="signin")
def linear_search(request):
    """Takes redirect linear search request from front end, processes it and
    renders linear search animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.linearSearch = 1
    history.save()
    return render(request, "linear_search/Linear Search.html")

@login_required(login_url="signin")
def stack(request):
    """Takes redirect stack dashboard request from front end,
    processes it and redirects to stack dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and
    # render stack dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'stack'})

@login_required(login_url="signin")
def stack_bo(request):
    """Takes redirect stack basic operations request from front end, processes it and
    renders stack BO animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.stackBo = 1
    history.save()
    return render(request, "stack/stack.html")

@login_required(login_url="signin")
def stack_appl(request):
    """Takes redirect stack application request from front end, processes it and
    renders stack application animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.stackAppl = 1
    history.save()
    return render(request, "stack/stack_toh.html")

@login_required(login_url="signin")
def queue(request):
    """Takes redirect queue dashboard request from front end, processes it and
    redirects to queue dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and render queue dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1,'dashboard':'queue'})

@login_required(login_url="signin")
def queue_bo(request):
    """Takes redirect queue basic operations request from front end, processes it and
    renders queue BO animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.queueBo = 1
    history.save()
    return render(request, "queue/queue.html")

@login_required(login_url="signin")
def insertionsort(request):
    """Takes redirect insertion sort request from front end, processes it and
    renders insertion sort animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.insertionSort = 1
    history.save()
    return render(request, "insertion_sort/insertion_sort.html")

@login_required(login_url="signin")
def mergesort(request):
    """Takes redirect merge sort request from front end, processes it and
    renders merge sort animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.mergeSort = 1
    history.save()
    return render(request, "merge_sort/merge_sort.html")

@login_required(login_url="signin")
def queue_appl(request):
    """Takes redirect queue application request from front end, processes it and
    renders queue animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.queueAppl = 1
    history.save()
    return render(request, "queue/queue_pc.html")

@login_required(login_url="signin")
def sorting(request):
    """Takes redirect sorting dashboard request from front end, processes it and
    redirects to sorting dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and render sorting dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'sorting'})

@login_required(login_url="signin")
def searching(request):
    """Takes redirect searching dashboard request from front end, processes it and
    redirects to searching dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and render searching dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'searching'})

@login_required(login_url="signin")
def store_animation_done_status(request, animation):
    """Takes done (finished learning algorithm) request from front end, updates DB and
    redirects to dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user watched specific animation (value 2 is updated) and
    # redirected to dashboard
    history = History.objects.get(username = request.user)
    for i in history_list:
        if animation == i:
            setattr(history, animation, 2)
    history.save()
    return redirect("/dashboard")

@login_required(login_url="signin")
def binary_search(request):
    """Takes redirect binary search request from front end, processes it and
    renders binary search animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.binarySearch = 1
    history.save()
    return render(request, "binary_search/binary.html")

@login_required(login_url="signin")
def linkedlist_appl(request):
    """Takes redirect linked list application request from front end, processes it and
    renders linked list application animation.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # Updates history DB to say user visited specific animation (value 1 is updated) and
    # animation rendered
    history = History.objects.get(username = request.user)
    history.linkedListAppl = 1
    history.save()
    return render(request, "linked_list/hash_with_chain.html")

@login_required(login_url="signin")
def linkedlist(request):
    """Takes redirect linked list dashboard request from front end, processes it and
    redirects to linked list dashboard.

    :param request: request object from front end
    :return: HTMLType response and status according to conditions
    """

    # get user from User DB find his progress from history DB and render searching dashboard
    user = User.objects.get(username = request.user)
    history = History.objects.get(username = request.user)
    history1 = []
    for i in history_list:
        if getattr(history, i) == 2:
            history1.append(i)
    return render(request, "dashboard/dashboard.html",
    {'name':user.first_name+" "+user.last_name, 'history': history1, 'dashboard':'linkedList'})