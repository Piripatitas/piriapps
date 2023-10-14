from django.shortcuts import render



def inicio(request):
    return render(request, 'inicio.html', {})

def vista_otro(request):
    return render(request, 'otro.html', {})

def vista_perritos(request):
    return render(request, 'perritos.html', {})


def pantalla(request):
    return render(request, 'pantalla.html', {})


def che_yo(request):
    return render(request, 'che.html', {})

def gps(request):
    return render(request, 'gps.html', {})






