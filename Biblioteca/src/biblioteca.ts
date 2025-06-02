import * as readline from 'readline';

// Definición del tipo Libro
type Libro = {
    titulo: string;
    autor: string;
    anio: number;
};

// Arreglo para almacenar los libros
let biblioteca: Libro[] = [];

// Interfaz para entrada por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú
function mostrarMenu(): void {
    console.log("\n--- Gestión de Biblioteca ---");
    console.log("1. Agregar libro");
    console.log("2. Buscar libro por título");
    console.log("3. Mostrar todos los libros");
    console.log("4. Salir");
    rl.question("Elige una opción (1-4): ", manejarOpcion);
}

// Función que gestiona la elección del usuario
function manejarOpcion(opcion: string): void {
    switch (opcion.trim()) {
        case '1':
            agregarLibro();
            break;
        case '2':
            rl.question("Ingresa el título a buscar: ", (titulo) => {
                buscarLibroPorTitulo(titulo);
                mostrarMenu();
            });
            break;
        case '3':
            mostrarTodosLosLibros();
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

// Función para agregar un libro
function agregarLibro(): void {
    rl.question("Título del libro: ", (titulo) => {
        rl.question("Autor del libro: ", (autor) => {
            rl.question("Año de publicación: ", (anioStr) => {
                const anio = parseInt(anioStr.trim());
                if (isNaN(anio)) {
                    console.log("El año ingresado no es válido.");
                    mostrarMenu();
                    return;
                }

                const nuevoLibro: Libro = {
                    titulo: titulo.trim(),
                    autor: autor.trim(),
                    anio: anio
                };

                biblioteca.push(nuevoLibro);
                console.log(`Libro "${nuevoLibro.titulo}" agregado con éxito.`);
                mostrarMenu();
            });
        });
    });
}

// Función para buscar libros por título
function buscarLibroPorTitulo(tituloBuscado: string): void {
    const resultados = biblioteca.filter(libro =>
        libro.titulo.toLowerCase().includes(tituloBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`No se encontraron libros con el título: "${tituloBuscado}".`);
    } else {
        console.log(`Libros encontrados con el título "${tituloBuscado}":`);
        resultados.forEach(libro => {
            console.log(`- ${libro.titulo} (Autor: ${libro.autor}, Año: ${libro.anio})`);
        });
    }
}

// Función para mostrar todos los libros
function mostrarTodosLosLibros(): void {
    if (biblioteca.length === 0) {
        console.log("No hay libros en la biblioteca.");
    } else {
        console.log("Libros en la biblioteca:");
        biblioteca.forEach(libro => {
            console.log(`- ${libro.titulo} (Autor: ${libro.autor}, Año: ${libro.anio})`);
        });
    }
}

// Iniciar el programa
mostrarMenu();
