"use strict";
//Modulo Data.js, ya no irá un array global, ya que esto nos causará problema con las mutaciones
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = crearTarea;
function crearTarea(datos) {
    const ahora = new Date();
    const tareaNueva = {
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        estado: datos.estado,
        dificultad: datos.dificultad,
        vencimiento: datos.vencimiento,
        creacion: new Date(),
        edicion: new Date(),
    };
    return Object.freeze(tareaNueva);
}
