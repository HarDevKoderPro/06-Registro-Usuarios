// Activar modo estricto
"use strict";

// Importar elementos desde el módulo
import * as libreria from "./libreria.js";

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Registro de usuarios
botonRegistrar.addEventListener("click", libreria.registrarContacto);

// Mostrar/Ocultar Datos
botonMostrar.addEventListener("click", libreria.logicaBotonMostrar);

// Busqueda por nombre en tiempo real
inputFiltro.addEventListener("input", () => {
  let datosFiltrados = libreria.filtrarContactos();
  libreria.mostrarDatos(datosFiltrados);
});

// Deteccion de tabla
tablaDatos.addEventListener("click", () => {
  alert("clic en tabla");
});
