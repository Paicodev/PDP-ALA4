"use strict";
//main.ts 
/*Es el encargado de gestionar la lista de tareas
maneja el bucle principal y coordina las funciones puras e impuras*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const entradas_1 = require("./entradas");
const impuras_1 = require("./impuras");
const data_1 = require("./data");
const puras_1 = require("./puras");
let listaDeTareas = [];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            console.log("\n==== MENÚ PRINCIPAL ====");
            console.log("1. Ver mis tareas");
            console.log("2. Buscar una tarea");
            console.log("3. Agregar una tarea");
            console.log("0. Salir");
            console.log("==========================\n");
            let op = yield (0, entradas_1.input)("Elija una opción: ");
            switch (op) {
                case "1": {
                    function mostrarTareas() {
                        return [...listaDeTareas];
                    }
                    break;
                }
                case "2": {
                    break;
                }
                case "3": {
                    const datosCrudos = yield (0, impuras_1.agregarTareaImpura)();
                    if (datosCrudos) {
                        // Llama a la funcion pura para crear la tarea de data.ts
                        //se meten los datos crudos que nos devuelve agregarTareaImpura
                        const nuevaTarea = (0, data_1.crearTarea)(datosCrudos);
                        // Llama a la funcion pura que agrega tareas con spreadoperator en puras.ts
                        //se añade la lista mas la nueva tarea
                        const nuevaLista = (0, puras_1.agregarTareaPura)(listaDeTareas, nuevaTarea);
                        // Re-asigna el estado de la lista original gracias a la copia auxiliar "nuevaLista"
                        listaDeTareas = nuevaLista;
                        console.log("¡Tarea agregada con éxito!");
                    }
                    yield (0, entradas_1.input)("Presiona cualquier tecla para continuar...\n");
                    break;
                }
                case "0": {
                    break;
                }
            }
        }
    });
}
main();
