//modulo puras.ts aqui iran las funciones puras
//aqui no deben haber mutaciones como "console.log" o "input"

//importamos la interfaz de tareas
import { Tarea } from "./data";

//Funcion pura que agrega una tarea, recibe la lista vieja y la tarea nueva.
export function agregarTareaPura(lista: Tarea[], tarea: Tarea): Tarea[] {
    //devuelve un array nuevo con la lista vieja y la tarea nueva
 return [...lista, tarea];
}