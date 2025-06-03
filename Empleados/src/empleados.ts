import * as readline from 'readline';

// Definición del tipo Empleado
type Empleado = {
    nombre: string;
    puesto: string;
    salario: number;
};

// Arreglo para almacenar empleados
let empleados: Empleado[] = [];

// Interfaz para entrada de datos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menú principal
function mostrarMenu(): void {
    console.log("\n--- Gestión de Empleados ---");
    console.log("1. Agregar empleado");
    console.log("2. Buscar empleado por nombre");
    console.log("3. Calcular salario promedio");
    console.log("4. Salir");
    rl.question("Elige una opción (1-4): ", manejarOpcion);
}

// Manejo de opciones del menú
function manejarOpcion(opcion: string): void {
    switch (opcion.trim()) {
        case '1':
            agregarEmpleado();
            break;
        case '2':
            rl.question("Ingresa el nombre a buscar: ", (nombre) => {
                buscarEmpleadoPorNombre(nombre);
                mostrarMenu();
            });
            break;
        case '3':
            calcularSalarioPromedio();
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

// Función para agregar un empleado
function agregarEmpleado(): void {
    rl.question("Nombre del empleado: ", (nombre) => {
        rl.question("Puesto del empleado: ", (puesto) => {
            rl.question("Salario del empleado: ", (salarioStr) => {
                const salario = parseFloat(salarioStr.trim());
                if (isNaN(salario) || salario < 0) {
                    console.log("Salario inválido.");
                    mostrarMenu();
                    return;
                }

                const nuevoEmpleado: Empleado = {
                    nombre: nombre.trim(),
                    puesto: puesto.trim(),
                    salario: salario
                };

                empleados.push(nuevoEmpleado);
                console.log(`Empleado "${nuevoEmpleado.nombre}" agregado con éxito.`);
                mostrarMenu();
            });
        });
    });
}

// Función para buscar empleados por nombre
function buscarEmpleadoPorNombre(nombreBuscado: string): void {
    const resultados = empleados.filter(emp =>
        emp.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`No se encontraron empleados con el nombre: "${nombreBuscado}".`);
    } else {
        console.log(`Empleados encontrados con el nombre "${nombreBuscado}":`);
        resultados.forEach(emp => {
            console.log(`- ${emp.nombre} (Puesto: ${emp.puesto}, Salario: $${emp.salario.toFixed(2)})`);
        });
    }
}

// Función para calcular salario promedio
function calcularSalarioPromedio(): void {
    if (empleados.length === 0) {
        console.log("No hay empleados registrados.");
        return;
    }

    const suma = empleados.reduce((total, emp) => total + emp.salario, 0);
    const promedio = suma / empleados.length;
    console.log(`Salario promedio: $${promedio.toFixed(2)}`);
}

// Iniciar programa
mostrarMenu();
