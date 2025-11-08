"use strict";
//modulo puras.ts aqui iran las funciones puras
//aqui no deben haber mutaciones como "console.log" o "input"
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarTareaPura = agregarTareaPura;
//Funcion pura que agrega una tarea, recibe la lista vieja y la tarea nueva.
function agregarTareaPura(lista, tarea) {
    //devuelve un array nuevo con la lista vieja y la tarea nueva
    return [...lista, tarea];
}
