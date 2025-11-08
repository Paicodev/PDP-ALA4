"use strict";
//modulo impuras.ts
//Este archivo tiene las funciones impuras
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
exports.agregarTareaImpura = agregarTareaImpura;
const entradas_1 = require("./entradas");
function agregarTareaImpura() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n=== Creando una nueva tarea ===");
        // 1. Título
        let titulo = yield (0, entradas_1.input)("1. Ingresa el título: ");
        if (!titulo || titulo.trim() === "") {
            console.log("El título no puede estar vacío. Operación cancelada.");
            return null;
        }
        // 2. Descripción
        let descripcion = yield (0, entradas_1.input)("2. Ingresa la descripción: ");
        if (!descripcion || descripcion.trim() === "") {
            descripcion = "Sin descripción";
        }
        // 3. Estado
        let estado = null;
        while (true) {
            let est = yield (0, entradas_1.input)("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
            est = est.trim().toUpperCase();
            if (["P", "E", "T", "C"].includes(est)) {
                if (est === "P")
                    estado = "Pendiente";
                if (est === "E")
                    estado = "En Curso";
                if (est === "T")
                    estado = "Terminada";
                if (est === "C")
                    estado = "Cancelada";
                break;
            }
            console.log("Opción inválida. Usa P, E, T o C.");
        }
        // 4. Dificultad
        let dificultad = 0; // Default
        while (true) {
            let difUser = yield (0, entradas_1.input)("4. Dificultad ([1] / [2] / [3]): ");
            let dif = parseInt(difUser);
            if ([1, 2, 3].includes(dif)) {
                dificultad = dif;
                break;
            }
            console.log("Opción inválida. Ingresa 1, 2 o 3.");
        }
        // 5. Vencimiento
        let vencimientoUser = yield (0, entradas_1.input)("5. Vencimiento (YYYY-MM-DD) o deja en blanco: ");
        let vencimiento = null;
        if (vencimientoUser.trim() !== "") {
            vencimiento = new Date(vencimientoUser);
            if (isNaN(vencimiento.getTime())) {
                console.log("Fecha inválida, se asigna 'null'.");
                vencimiento = null;
            }
        }
        console.log("\n¡Datos recolectados!\n");
        return {
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            estado: estado,
            dificultad: dificultad,
            vencimiento: vencimiento,
            creacion: new Date(),
            edicion: new Date(),
        };
    });
}
