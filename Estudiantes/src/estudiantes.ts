import * as readline from 'readline';

// Tipo de datos para un estudiante
type Estudiante = {
    nombre: string;
    grado: string;
    nota: number;
};

// Arreglo para almacenar los estudiantes
let estudiantes: Estudiante[] = [];

// Interfaz para entrada de datos por terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar menú
function mostrarMenu(): void {
    console.log("\n--- Gestión de Estudiantes ---");
    console.log("1. Agregar estudiante");
    console.log("2. Buscar estudiante por nombre");
    console.log("3. Calcular promedio de notas");
    console.log("4. Salir");
    rl.question("Elige una opción (1-4): ", manejarOpcion);
}

// Manejar opción elegida por el usuario
function manejarOpcion(opcion: string): void {
    switch (opcion.trim()) {
        case '1':
            agregarEstudiante();
            break;
        case '2':
            rl.question("Nombre del estudiante a buscar: ", (nombre) => {
                buscarEstudiantePorNombre(nombre);
                mostrarMenu();
            });
            break;
        case '3':
            calcularPromedioNotas();
            mostrarMenu();
            break;
        case '4':
            console.log("Saliendo del programa...");
            rl.close();
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenu();
    }
}

// Agregar un nuevo estudiante
function agregarEstudiante(): void {
    rl.question("Nombre del estudiante: ", (nombre) => {
        rl.question("Grado o curso: ", (grado) => {
            rl.question("Nota (0-5): ", (notaStr) => {
                const nota = parseFloat(notaStr.trim());
                if (isNaN(nota) || nota < 0 || nota > 5) {
                    console.log("Nota inválida. Debe estar entre 0 y 5.");
                    mostrarMenu();
                    return;
                }

                const nuevoEstudiante: Estudiante = {
                    nombre: nombre.trim(),
                    grado: grado.trim(),
                    nota
                };

                estudiantes.push(nuevoEstudiante);
                console.log(`Estudiante "${nuevoEstudiante.nombre}" agregado exitosamente.`);
                mostrarMenu();
            });
        });
    });
}

// Buscar estudiantes por nombre
function buscarEstudiantePorNombre(nombreBuscado: string): void {
    const resultados = estudiantes.filter(est =>
        est.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`No se encontraron estudiantes con el nombre: "${nombreBuscado}".`);
    } else {
        console.log("Estudiantes encontrados:");
        resultados.forEach(est => {
            console.log(`- ${est.nombre} | Grado: ${est.grado} | Nota: ${est.nota}`);
        });
    }
}

// Calcular promedio de notas
function calcularPromedioNotas(): void {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }

    const suma = estudiantes.reduce((acc, est) => acc + est.nota, 0);
    const promedio = suma / estudiantes.length;
    console.log(`Promedio general de notas: ${promedio.toFixed(2)}`);
}

// Iniciar el programa
mostrarMenu();