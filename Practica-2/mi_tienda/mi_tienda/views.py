from django.http import HttpResponse
from django.template import Template, Context
from datetime import datetime, timedelta
from django.template.loader import get_template
from django.shortcuts import render

def mi_funcion(request):
	html = "Hola! Mi primera UrL!!"
	return HttpResponse(html)

def mi_producto(request, param):
	numero = int(param)
	html = "Acceso a producto: %i" % numero;
	return HttpResponse(html)

PLANTILLA = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Saludo</title>
  </head>
  <body>
    <p>Bienvenido a mi tienda, {{user}}</p>
  </body>
</html>
"""

def saludo(request):
    # --Procesar la plantilla
    t = Template(PLANTILLA)

    # -- Crear el contexto: Nombre de usuario real
    c = Context({'user':'Epic Saxo guy'})

    # -- Obtener la pagina html final
    html = t.render(c)
    return HttpResponse(html)

def hora_actual(request):
	now = datetime.now()
	html = "Son las %s." % now

	return HttpResponse(html)

def dentro_de(request, offset):
	offset = int(offset)
	dt = datetime.now() + timedelta(hours=offset)
	html = "En %i hora(s), seran las %s." % (offset,dt)

	return HttpResponse(html)

def index(request):
    return render(request, 'main.html', {'user':'Carmen'})
