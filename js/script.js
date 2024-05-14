"use strict";

// -----------------------------------------------------------------
// VARIABLES GLOBALES
// -----------------------------------------------------------------
const datos = [];

// -----------------------------------------------------------------
//  FUNCIONES
// -----------------------------------------------------------------
// 1- Función referenciadora elementos del DOM
// -----------------------------------------------------------------
const getEl = (id) => document.getElementById(id);

// -----------------------------------------------------------------
// 2- Funcion para validar inputs Vacios
// -----------------------------------------------------------------
function validacionInputs(inputsArr) {
  let inputsVacios = 0;
  inputsArr.forEach((input) => {
    if (input.value === "") {
      input.style.border = "1px solid red";
      inputsVacios++;
    } else {
      input.style.border = "";
    }
  });

  return inputsVacios;
}

// -----------------------------------------------------------------
// 3- Borrado de inputs
// -----------------------------------------------------------------
function borrarInputs() {
  inputNombre.value = "";
  inputApellido.value = "";
  inputTelefono.value = "";
}

// -----------------------------------------------------------------
// 4- Constructor de Objetos (registros)
// -----------------------------------------------------------------
function Registro(nombre, apellido, telefono) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
}

// -----------------------------------------------------------------
// 5- Funcion para registrar contactos
// -----------------------------------------------------------------
function registrarContacto() {
  // Array con los inputs del formulario
  const inputsArr = [inputNombre, inputApellido, inputTelefono];

  // Contamos inputs vacios (validación)
  let inputsVacios = validacionInputs(inputsArr);

  // Si no hay inputs vacios procedo con el registro
  if (inputsVacios === 0) {
    // Obtengo los valores de los inputs
    const [nombre, apellido, telefono] = [
      inputNombre.value,
      inputApellido.value,
      inputTelefono.value,
    ];

    // Instanciamos (creamos) un objeto (registro)
    const contacto = new Registro(nombre, apellido, telefono);

    // Guardamos cada objeto generado en el array
    datos.push(contacto);

    // Borro los inputs
    borrarInputs();
  }
}

// -----------------------------------------------------------------
// 6- Funcion para Mostrar tabla de datos
// -----------------------------------------------------------------
function mostrarDatos() {
  // Checamos el texto del boton
  if (botonMostrar.textContent === "Mostrar" && datos.length > 0) {

    // quitamos la clase ocultar
    resultados.classList.remove("ocultar");

    // Agregamos los registros del array datos
    resultados.innerHTML = "";
    datos.forEach((contacto) => {
      resultados.innerHTML += `
      <tr>
      <td>${contacto.nombre}</td>
      <td>${contacto.apellido}</td>
      <td>${contacto.telefono}</td>
      </tr>`;
    });

    // Cambiamos el texto del boton
    botonMostrar.textContent = "Ocultar";

  } else {

    // Cambiamos texto del boton y ocultamos el contenido
    botonMostrar.textContent = "Mostrar";
    resultados.classList.add("ocultar");

  }
}

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Referencias de elementos a utilizar
const botonRegistrar = getEl("botonRegistrar");
const botonMostrar = getEl("botonMostrar");
const inputNombre = getEl("inputNombre");
const inputApellido = getEl("inputApellido");
const inputTelefono = getEl("inputTelefono");
const tabla = getEl("tabla");
const resultados = getEl("resultados");

// Evento click del boton Registrar
botonRegistrar.addEventListener("click", registrarContacto);

// Evento click del botón Mostrar
botonMostrar.addEventListener("click", mostrarDatos);
