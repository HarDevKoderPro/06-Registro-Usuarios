"use strict";

// -----------------------------------------------------------------
// VARIABLES GLOBALES
// -----------------------------------------------------------------
export const datos = [];

// Referencias Elementos DOM
const referenciarElementosDom = () => {
  return {
    botonRegistrar: document.querySelector("#botonRegistrar"),
    botonMostrar: document.querySelector("#botonMostrar"),
    botonFiltrar: document.querySelector("#botonFiltrar"),
    botonEditar: document.querySelector("#botonEditar"),
    inputNombre: document.querySelector("#inputNombre"),
    inputApellido: document.querySelector("#inputApellido"),
    inputTelefono: document.querySelector("#inputTelefono"),
    inputFiltro: document.querySelector("#inputFiltro"),
    tabla: document.querySelector("#tabla"),
    resultado: document.querySelector("#resultado"),
  };
};

// -----------------------------------------------------------------
//  FUNCIONES
// -----------------------------------------------------------------
// 1- Funcion para validar inputs Vacios
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
// 2- Borrado de inputs
// -----------------------------------------------------------------
function borrarInputs() {
  inputNombre.value = "";
  inputApellido.value = "";
  inputTelefono.value = "";
}

// -----------------------------------------------------------------
// 3- Constructor de Objetos (registros)
// -----------------------------------------------------------------
function Registro(nombre, apellido, telefono) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
}

// -----------------------------------------------------------------
// 4- Funcion que imprime registros en filas de la tabla
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
// 5- Funcion para registrar contactos
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
      mayusculaIniclal(inputNombre.value) ,
      mayusculaIniclal(inputApellido.value),
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
    imprimirRegistro(datos);

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
// 6- Funcion para Mostrar tabla de datos
// -----------------------------------------------------------------
function mostrarDatos(arr) {
  // Checamos el texto del boton
  if (botonMostrar.textContent === "Mostrar" && datos.length > 0) {
    // quitamos la clase ocultar
    resultados.classList.remove("ocultar");

    // imprimo registro en la tabla
    imprimirRegistro(datos);

    // Cambiamos el texto del boton
    botonMostrar.textContent = "Ocultar";
  } else {
    // Cambiamos texto del boton y ocultamos el contenido
    botonMostrar.textContent = "Mostrar";
    resultados.classList.add("ocultar");
  }
}

// -----------------------------------------------------------------
// 7- Funcion para mostrar sweet alerts
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
// 8- Funcion para buscar contactos por nombre en tiempo real
// -----------------------------------------------------------------
function filtrarContactos() {
  let nombreAFiltrar = mayusculaIniclal(inputFiltro.value);
  let datosFiltrados = datos.filter((contacto) =>
    contacto.nombre.includes(nombreAFiltrar)
  );
  if (datosFiltrados.length === 0) botonMostrar.textContent = "Mostrar";
  return datosFiltrados;
}

// -----------------------------------------------------------------
// 9- Funcion para colocar en mayuscula inicial dato
// -----------------------------------------------------------------
function mayusculaIniclal(texto) {
  let resultado = texto
    .split("")
    .map((x, index) => (index === 0 ? x.toUpperCase() : x.toLowerCase()));
  return resultado.join('');
}

// Exporto las funciones
export default {
  referenciarElementosDom,
  registrarContacto,
  mostrarDatos,
  filtrarContactos,
  imprimirRegistro,
  datos,
};
