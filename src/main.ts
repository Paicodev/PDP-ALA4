//main.ts 
/*Es el encargado de gestionar la lista de tareas
maneja el bucle principal y coordina las funciones puras e impuras*/

import { input} from "./entradas";
import { 
  agregarTareaImpura, 
  gestionarVisualizacionImpura,
  buscarYMostrarTareaImpura,
  eliminarTareaImpura,
  editarTareaImpura
} from "./impuras";
import { Tarea, crearTarea } from "./data";
import { 
   agregarTareaPura,
   generarMenuPuro,
   buscarTareaPorTituloPura,
   generarMensajeBusquedaPura,
   eliminarTareaPura,
   editarTareaPura
  } from "./puras";

let listaDeTareas: Tarea[] = [];

function main(): void {
  while (true) {
    console.log(generarMenuPuro());
    let op: string = input("Elija una opción: ");

    switch (op) {
        case "1": {
          gestionarVisualizacionImpura(listaDeTareas);
          input("Presiona cualquier tecla para continuar...\n");
            break;
        }
        case "2": {
          buscarYMostrarTareaImpura(listaDeTareas);
          input("Presiona cualquier tecla apra continuar...\n");
            break;
        }
      case "3": {
        const datosCrudos = agregarTareaImpura();
        if (datosCrudos) {
          // Llama a la funcion pura para crear la tarea de data.ts
          //se meten los datos crudos que nos devuelve agregarTareaImpura
          const nuevaTarea = crearTarea(datosCrudos);

          // Llama a la funcion pura que agrega tareas con spreadoperator en puras.ts
          //se añade la lista mas la nueva tarea
          const nuevaLista = agregarTareaPura(listaDeTareas, nuevaTarea);

          // Re-asigna el estado de la lista original gracias a la copia auxiliar "nuevaLista"
          listaDeTareas = nuevaLista;

          console.log("¡Tarea agregada con éxito!");
        }
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "4": {
        /// 1. Llama a la vista impura, que devuelve el título y los cambios
            const datosParaEditar = editarTareaImpura(listaDeTareas);
            
            if (datosParaEditar) {
              // 2. Llama a la lógica pura para obtener la nueva lista
              const nuevaLista = editarTareaPura(
                listaDeTareas, 
                datosParaEditar.titulo, 
                datosParaEditar.nuevosDatos
              );
              // 3. Reasigna el estado
              listaDeTareas = nuevaLista;
              console.log("¡Tarea editada con éxito!");
            }
            input("Presiona cualquier tecla para continuar...\n");
            break;

      }
      case "5": {
        const tituloParaEliminar = eliminarTareaImpura(listaDeTareas);
            
            if (tituloParaEliminar) {
              // 1. Llama a la lógica pura para obtener la nueva lista
              const nuevaLista = eliminarTareaPura(listaDeTareas, tituloParaEliminar);
              // 2. Reasigna el estado
              listaDeTareas = nuevaLista;
              console.log("¡Tarea eliminada con éxito!");
            } else {
              // Esto ocurre si la tarea no se encontró o el usuario escribió 'n'
              console.log("Operación cancelada.");
            }
            input("Presiona cualquier tecla para continuar...\n");
            break;

      }
      case "0": {
        console.log("Adios!");
            break;
        }
      default: {
        console.log("Opcion no válida.");
        input("Presiona cualquier tecla para continuar..\n");
        break;
      }
    }
}
}

main();