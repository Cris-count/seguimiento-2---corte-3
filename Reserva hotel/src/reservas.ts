import * as readline from 'readline';

// Tipo de datos para una reserva
type Reserva = {
    huesped: string;
    habitacion: string;
    noches: number;
    precioPorNoche: number;
};

// Lista de reservas
let reservas: Reserva[] = [];

// Interfaz de lectura de terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar menú
function mostrarMenu(): void {
    console.log("\n--- Gestión de Reservas de Hotel ---");
    console.log("1. Agregar reserva");
    console.log("2. Buscar reserva por nombre del huésped");
    console.log("3. Calcular ingreso total del hotel");
    console.log("4. Salir");
    rl.question("Elige una opción (1-4): ", manejarOpcion);
}

// Manejar la opción seleccionada
function manejarOpcion(opcion: string): void {
    switch (opcion.trim()) {
        case '1':
            agregarReserva();
            break;
        case '2':
            rl.question("Nombre del huésped a buscar: ", (nombre) => {
                buscarReservaPorNombre(nombre);
                mostrarMenu();
            });
            break;
        case '3':
            calcularIngresoTotal();
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

// Agregar una reserva
function agregarReserva(): void {
    rl.question("Nombre del huésped: ", (huesped) => {
        rl.question("Tipo de habitación: ", (habitacion) => {
            rl.question("Cantidad de noches: ", (nochesStr) => {
                const noches = parseInt(nochesStr.trim());
                if (isNaN(noches) || noches <= 0) {
                    console.log("Número de noches inválido.");
                    mostrarMenu();
                    return;
                }

                rl.question("Precio por noche: ", (precioStr) => {
                    const precio = parseFloat(precioStr.trim());
                    if (isNaN(precio) || precio <= 0) {
                        console.log("Precio por noche inválido.");
                        mostrarMenu();
                        return;
                    }

                    const nuevaReserva: Reserva = {
                        huesped: huesped.trim(),
                        habitacion: habitacion.trim(),
                        noches: noches,
                        precioPorNoche: precio
                    };

                    reservas.push(nuevaReserva);
                    console.log(`Reserva agregada para ${nuevaReserva.huesped}.`);
                    mostrarMenu();
                });
            });
        });
    });
}

// Buscar reservas por nombre del huésped
function buscarReservaPorNombre(nombreBuscado: string): void {
    const resultados = reservas.filter(res =>
        res.huesped.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`No se encontraron reservas para el huésped: "${nombreBuscado}".`);
    } else {
        console.log("Reservas encontradas:");
        resultados.forEach(res => {
            const total = res.noches * res.precioPorNoche;
            console.log(`- ${res.huesped} | Habitación: ${res.habitacion} | Noches: ${res.noches} | $${res.precioPorNoche.toFixed(2)}/noche | Total: $${total.toFixed(2)}`);
        });
    }
}

// Calcular el ingreso total del hotel
function calcularIngresoTotal(): void {
    const total = reservas.reduce((acc, res) => acc + (res.noches * res.precioPorNoche), 0);
    console.log(`Ingreso total del hotel: $${total.toFixed(2)}`);
}

// Iniciar el programa
mostrarMenu();