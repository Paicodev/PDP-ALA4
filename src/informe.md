Para realizar el paradigmas funcional, primero optaremos por separar la lógica pura de las acciones impuras. El codigo anterior mezclaba todo (sea del ALA2 o el ALA3), ya que, el main llamaba al menuTareas() que listaba y pedia inputs, este llamaba a menuDetalles() y asi sucesivamente, causando muchas mutaciones.
Es asi como daremos paso a reorganizar el codigo de forma más limpia.
Tendremos el mismo modulo de entradas, otro de logica pura, uno de logica impura, y finalmente el main, el cual hará de intermediario entre lo impuro y puro.
