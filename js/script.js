// Activar modo estricto
"use strict";

// Importar funciones desde el módulo
import MisFunciones from "./funciones.js";

// Importar variables globales desde el modulo
import { datos, busqueda } from "./funciones.js";

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

inputFiltro.addEventListener("input", () => {
  let datosFiltrados = MisFunciones.filtrarContactos();
  MisFunciones.imprimirRegistro(datosFiltrados);
});

// evento para boton editar
botonEditar.addEventListener("click", () => {
  alert(`en construccion 😒`);
});
