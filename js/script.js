// Activar modo estricto
"use strict";

// Importar libreria de funciones
import MisFunciones from "./funciones.js";

// // -----------------------------------------------------------------
// // VARIABLES GLOBALES
// // -----------------------------------------------------------------
const datos = [];
const busqueda = [];

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Evento click del boton Registrar
botonRegistrar.addEventListener("click", () => {
  MisFunciones.registrarContacto(datos);
});

// Evento click del botón Mostrar
botonMostrar.addEventListener("click", () => {
  MisFunciones.mostrarDatos(datos);
});

// Evento para boton de busqueda
botonFiltrar.addEventListener("click", () => {
  let resultadosFiltrados = MisFunciones.filtrarContactos();
  MisFunciones.imprimirRegistro(resultadosFiltrados);
});

// evento para boton editar
botonEditar.addEventListener('click', ()=>{
  alert(`en construccion 😒`)
})
