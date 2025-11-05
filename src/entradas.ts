// 1. Importar readline para pedir datos por consola
//modifico la forma de importar de commonJS a ES6
import * as readline from "readline";

// 2. Crear la interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* 3. Función auxiliar para pedir entradas al usuario
  -en question se especifica el argumento del tipo string
  -Promise<string> la funcion devuelve una promesa que resuelve un string*/
function input(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

//la funcion close no retorna nada, por lo que se pone void
function close(): void{
    rl.close();
}

/*exportamos el input para pedir al usuario entradas 
y el close para cerrar la ejecucion
modifico el tipo de exportacion a ES6*/
export { input, close};