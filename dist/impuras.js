"use strict";
//modulo impuras.ts
//Este archivo tiene las funciones impuras
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarTareaImpura = agregarTareaImpura;
exports.visualizarTareasImpura = visualizarTareasImpura;
exports.gestionarVisualizacionImpura = gestionarVisualizacionImpura;
const entradas_1 = require("./entradas");
const puras_1 = require("./puras");
function agregarTareaImpura() {
    console.log("\n=== Creando una nueva tarea ===");
    // 1. Título
    let titulo = (0, entradas_1.input)("1. Ingresa el título: ");
    if (!titulo || titulo.trim() === "") {
        console.log("El título no puede estar vacío. Operación cancelada.");
        return null;
    }
    // 2. Descripción
    let descripcion = (0, entradas_1.input)("2. Ingresa la descripción: ");
    if (!descripcion || descripcion.trim() === "") {
        descripcion = "Sin descripción";
    }
    // 3. Estado
    let estado = null;
    while (true) {
        let est = (0, entradas_1.input)("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
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
        let difUser = (0, entradas_1.input)("4. Dificultad ([1] / [2] / [3]): ");
        let dif = parseInt(difUser);
        if ([1, 2, 3].includes(dif)) {
            dificultad = dif;
            break;
        }
        console.log("Opción inválida. Ingresa 1, 2 o 3.");
    }
    // 5. Vencimiento
    let vencimientoUser = (0, entradas_1.input)("5. Vencimiento (YYYY-MM-DD) o deja en blanco: ");
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
    };
}
/**
 * Función Impura: Muestra una lista de tareas en consola.
 * Su única responsabilidad es llamar a la lógica pura y hacer console.log
 */
function visualizarTareasImpura(lista) {
    // 1. Llama a la función pura para obtener el texto formateado.
    const textoFormateado = (0, puras_1.formatearTareasPura)(lista);
    // 2. Realiza la única acción impura: imprimir en consola.
    console.log(textoFormateado);
}
/**
 * Función Impura: Gestiona el submenú de filtros.
 * (Muestra menú, pide input, llama a la lógica pura, y llama a la vista)
 */
function gestionarVisualizacionImpura(lista) {
    // 1. Llama a la función pura para generar el menú de filtros
    console.log((0, puras_1.generarMenuFiltrosPuro)());
    // 2. Pide la opción (Impuro)
    const op = (0, entradas_1.input)("Elija una opción: ");
    let filtro = null;
    // 3. Decide el filtro basado en la entrada
    switch (op) {
        case "1":
            filtro = "TODAS";
            break;
        case "2":
            filtro = "Pendiente";
            break;
        case "3":
            filtro = "En Curso";
            break;
        case "4":
            filtro = "Terminada";
            break;
        case "0": return; // Volver
        default:
            console.log("Opción inválida.");
            return;
    }
    // 4. Llama a la lógica pura de filtro
    const tareasFiltradas = (0, puras_1.filtrarPorEstadoPura)(lista, filtro);
    // 5. Llama a la otra función impura para mostrar el resultado
    visualizarTareasImpura(tareasFiltradas);
}
