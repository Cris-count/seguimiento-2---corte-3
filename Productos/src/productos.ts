import * as readline from 'readline';

// Definición del tipo Producto
type Producto = {
    nombre: string;
    precio: number;
    cantidad: number;
};

// Arreglo para almacenar los productos
let inventario: Producto[] = [];

// Interfaz de lectura de terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar el menú
function mostrarMenu(): void {
    console.log("\n--- Gestión de Productos ---");
    console.log("1. Agregar producto");
    console.log("2. Buscar producto por nombre");
    console.log("3. Calcular valor total del inventario");
    console.log("4. Salir");
    rl.question("Elige una opción (1-4): ", manejarOpcion);
}

// Manejar opciones del usuario
function manejarOpcion(opcion: string): void {
    switch (opcion.trim()) {
        case '1':
            agregarProducto();
            break;
        case '2':
            rl.question("Nombre del producto a buscar: ", (nombre) => {
                buscarProductoPorNombre(nombre);
                mostrarMenu();
            });
            break;
        case '3':
            calcularValorTotalInventario();
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

// Agregar un producto al inventario
function agregarProducto(): void {
    rl.question("Nombre del producto: ", (nombre) => {
        rl.question("Precio del producto: ", (precioStr) => {
            const precio = parseFloat(precioStr.trim());
            if (isNaN(precio) || precio < 0) {
                console.log("Precio inválido.");
                mostrarMenu();
                return;
            }

            rl.question("Cantidad en inventario: ", (cantidadStr) => {
                const cantidad = parseInt(cantidadStr.trim());
                if (isNaN(cantidad) || cantidad < 0) {
                    console.log("Cantidad inválida.");
                    mostrarMenu();
                    return;
                }

                const nuevoProducto: Producto = {
                    nombre: nombre.trim(),
                    precio,
                    cantidad
                };

                inventario.push(nuevoProducto);
                console.log(`Producto "${nuevoProducto.nombre}" agregado con éxito.`);
                mostrarMenu();
            });
        });
    });
}

// Buscar productos por nombre
function buscarProductoPorNombre(nombreBuscado: string): void {
    const resultados = inventario.filter(prod =>
        prod.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`No se encontraron productos con el nombre: "${nombreBuscado}".`);
    } else {
        console.log(`Productos encontrados:`);
        resultados.forEach(prod => {
            console.log(`- ${prod.nombre} | Precio: $${prod.precio.toFixed(2)} | Cantidad: ${prod.cantidad}`);
        });
    }
}

// Calcular el valor total del inventario
function calcularValorTotalInventario(): void {
    const total = inventario.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    console.log(`Valor total del inventario: $${total.toFixed(2)}`);
}

// Iniciar el programa
mostrarMenu();