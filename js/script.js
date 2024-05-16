"use strict";

// -----------------------------------------------------------------
// VARIABLES GLOBALES
// -----------------------------------------------------------------
const datos = [];
const busqueda = [];

// -----------------------------------------------------------------
//  FUNCIONES
// -----------------------------------------------------------------

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
// 5- Funcion que imprime registros en filas de la tabla
// -----------------------------------------------------------------
function imprimirRegistro(arr) {
  resultados.innerHTML = "";
  arr.forEach((contacto, indice) => {
    resultados.innerHTML += `
      <tr>
      <td>${indice + 1}</td>
      <td>${contacto.nombre}</td>
      <td>${contacto.apellido}</td>
      <td>${contacto.telefono}</td>
      </tr>`;
  });
}

// -----------------------------------------------------------------
// 6- Funcion para registrar contactos
// -----------------------------------------------------------------
function registrarContacto(arr) {
  // Array con los inputs del formulario
  const inputsArr = [inputNombre, inputApellido, inputTelefono];

  // Contamos inputs vacios (validación)
  let inputsVacios = validacionInputs(inputsArr);

  // Si no hay inputs vacios procedo con el registro
  if (inputsVacios === 0) {
    // Obtengo los valores de los Campos
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

    // Muestro sweet alert de confirmacion
    mensajeSweetAlert(
      "success",
      "green",
      "#FDEBD0 ",
      "Registro exitoso!!",
      "",
      "green",
      2000
    );

    // imprimo registro en la tabla
    imprimirRegistro(arr);

    botonMostrar.textContent = "ocultar";
  } else {
    // Muestro sweet alert de error
    mensajeSweetAlert(
      "error",
      "red",
      "#FDEBD0 ",
      "Faltan datos !!",
      "",
      "red",
      2000
    );
  }

  return datos;
}

// -----------------------------------------------------------------
// 7- Funcion para Mostrar tabla de datos
// -----------------------------------------------------------------
function mostrarDatos(arr) {
  // Checamos el texto del boton
  if (botonMostrar.textContent === "Mostrar" && datos.length > 0) {
    // quitamos la clase ocultar
    resultados.classList.remove("ocultar");

    // imprimo registro en la tabla
    imprimirRegistro(arr);

    // Cambiamos el texto del boton
    botonMostrar.textContent = "Ocultar";
  } else {
    // Cambiamos texto del boton y ocultamos el contenido
    botonMostrar.textContent = "Mostrar";
    resultados.classList.add("ocultar");
  }
}

// -----------------------------------------------------------------
// 8- Funcion para mostrar sweet alerts
// -----------------------------------------------------------------
function mensajeSweetAlert(
  icon,
  iconColor,
  bgColor,
  title,
  text,
  textColor,
  timer
) {
  Swal.fire({
    position: "center",
    icon: icon,
    iconColor: iconColor,
    background: bgColor,
    width: "300px",
    heightAuto: false,
    title: title,
    text: text,
    color: textColor,
    showConfirmButton: false,
    timer: timer,
  });
}

// -----------------------------------------------------------------
// 9- Funcion para buscar contactos por nombre
// -----------------------------------------------------------------
function buscarContactos() {
  let nombreBuscado = inputBusqueda.value;
  let busqueda = datos.filter((contacto) => contacto.nombre === nombreBuscado);
  if(busqueda.length === 0)botonMostrar.textContent = 'Mostrar';

  return busqueda;
}

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Referencias de elementos a utilizar
const getEl = (id) => document.getElementById(id);
const botonRegistrar = getEl("botonRegistrar");
const botonMostrar = getEl("botonMostrar");
const botonBuscar = getEl("botonBuscar");
const botonEditar = getEl("botonEditar");
const inputNombre = getEl("inputNombre");
const inputApellido = getEl("inputApellido");
const inputTelefono = getEl("inputTelefono");
const inputBusqueda = getEl("inputBusqueda");
const tabla = getEl("tabla");
const resultados = getEl("resultados");

// Evento click del boton Registrar
botonRegistrar.addEventListener("click", () => {
  registrarContacto(datos);
});

// Evento click del botón Mostrar
botonMostrar.addEventListener("click", () => {
  mostrarDatos(datos);
});

// Evento para boton de busqueda
botonBuscar.addEventListener("click", () => {
  let resultadosBusqueda = buscarContactos();
  imprimirRegistro(resultadosBusqueda);
});

// evento para boton editar
botonEditar.addEventListener('click', ()=>{
  alert(`en construccion 😒`)
})
