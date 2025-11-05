//Modulo Data.js, en este van las variables globales (el struct de tareas)

/*la palabra clave interface en TypeScript, sirve para
definir la forma que debe tener un objeto.
En este caso, Tarea debe ser de la sig. forma*/
export interface Tarea{
    titulo: string;
    descripcion: string;
    estado: string;
    dificultad: number;
    vencimiento: Date | null;
    creacion: Date;
    edicion: Date;
}

//tareas es un Array que contiene elementos del tipo tarea
//= [] inicializa el array vacío.
let tareas: Tarea [] = [];

export {tareas};