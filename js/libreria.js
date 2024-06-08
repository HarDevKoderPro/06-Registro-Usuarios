"use strict";

// Variables globales
const datos = [];
let indice;
let bandera = 0;

// Referencias de Elementos DOM
const referenciarElementosDom = () => {
  return {
    botonRegistrar: document.querySelector("#botonRegistrar"),
    botonMostrar: document.querySelector("#botonMostrar"),
    botonFiltrar: document.querySelector("#botonFiltrar"),
    botonEditar: document.querySelector(".icon-pencil"),
    inputNombre: document.querySelector("#inputNombre"),
    inputApellido: document.querySelector("#inputApellido"),
    inputTelefono: document.querySelector("#inputTelefono"),
    inputFiltro: document.querySelector("#inputFiltro"),
    tablaDatos: document.querySelector("#tablaDatos"),
    resultados: document.querySelector("#resultados"),
  };
};

// 1- Funcion para validar inputs Vacios
function validarInputsVacios() {
  // Array con los inputs del formulario
  const inputsArr = [inputNombre, inputApellido, inputTelefono];

  let cantidadInputsVacios = 0;
  inputsArr.forEach((input) => {
    if (input.value === "") {
      input.style.border = "1px solid red";
      cantidadInputsVacios++;
    } else {
      input.style.border = "";
    }
  });

  return cantidadInputsVacios;
}

// 2- Borrado de inputs
function borrarInputs() {
  inputNombre.value = "";
  inputApellido.value = "";
  inputTelefono.value = "";
}

// 3- Constructor de Objetos (registros)
function Contacto(nombre, apellido, telefono) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
}

// 4- Logica del boton mostrar/ocultar
function logicaBotonMostrar() {
  if (datos.length > 0) {
    if (botonMostrar.textContent === "Mostrar") {
      resultados.classList.remove("ocultar");
      botonMostrar.textContent = "Ocultar";
    } else {
      resultados.classList.add("ocultar");
      botonMostrar.textContent = "Mostrar";
    }
  } else {
    botonMostrar.textContent = "Mostrar";
  }
}

// 5- Funcion que imprime y muestra datos registrados en la tabla
function mostrarDatos(array) {
  // creo filas e inserto datos en la tabla
  resultados.innerHTML = "";
  array.forEach((contacto, indice) => {
    resultados.innerHTML += `
      <tr>
      <td>${indice + 1}</td>
      <td>${contacto.nombre}</td>
      <td>${contacto.apellido}</td>
      <td class='celdaTelefono'>
        <div class="celdaTelefono__dato">
          ${contacto.telefono}
        </div>
        <div class="celdaTelefono__iconosSpan">
          <span class="icon-pencil"></span>
          <span class="icon-bin"></span>
        </div>
      </td>
      </tr>`;
  });
}

// 6- Funcion que registra contactos
function registrarContacto() {
  // Contamos inputs vacios (validación)
  let cantidadInputsVacios = validarInputsVacios();

  // Si no hay inputs vacios procedo con el registro
  if (cantidadInputsVacios === 0) {
    // Obtengo los valores de los Campos (desestructuro)
    const [nombre, apellido, telefono] = [
      colocarMayusculaIniclal(inputNombre.value),
      colocarMayusculaIniclal(inputApellido.value),
      inputTelefono.value,
    ];

    // Instancio (creo) un objeto (registro)
    const contacto = new Contacto(nombre, apellido, telefono);

    // Acciones si se edita un contacto (editar = 1, registrar = 0)
    if (bandera === 1) {
      datos[indice] = contacto;
      bandera = 0; // Reseteo Bandera para nuevos registros

      // Acciones si se registra un nuevo contacto (bandera = 0)
    } else {
      datos.push(contacto);
    }

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

    // imprimo (muestro) registro en la tabla
    mostrarDatos(datos);

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

// 7- Funcion para mostrar sweet alerts
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

// 8- Funcion para buscar contactos por nombre en tiempo real
function filtrarContactos() {
  let nombreAFiltrar = colocarMayusculaIniclal(inputFiltro.value);
  let datosFiltrados = datos.filter((contacto) =>
    contacto.nombre.includes(nombreAFiltrar)
  );

  // si no hay datos a filtrar
  if (datosFiltrados.length === 0) botonMostrar.textContent = "Mostrar";

  return datosFiltrados;
}

// 9- Funcion para colocar en mayuscula inicial dato
function colocarMayusculaIniclal(texto) {
  let resultado = texto
    .split("")
    .map((x, index) => (index === 0 ? x.toUpperCase() : x.toLowerCase()));
  return resultado.join("");
}

// 10- Delegacion de eventos en la tabla
function delegarEventosTabla(e) {
  // Elemento objetivo
  const elemento = e.target;
  // acciones si se presionar icono de editar
  if (elemento.classList.contains("icon-pencil")) {
    // se obtiene la fila que contiene el span clickado
    const fila = e.target.closest("tr");

    // se obtienen los datos incluidos en la fila afectada
    indice = fila.querySelector("td:nth-child(1)").textContent;
    const nombre = fila.querySelector("td:nth-child(2)").textContent;
    const apellido = fila.querySelector("td:nth-child(3)").textContent;
    const telefono = fila.querySelector(".celdaTelefono__dato").textContent;
    bandera = 1;

    // Se pasan los datos a los inputs para editarlos
    indice = Number(indice - 1);
    alert(typeof indice);
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputTelefono.value = Number(telefono);
  } else if (elemento.classList.contains("icon-bin")) {
    // se obtiene la fila que contiene el span clickado
    const fila = e.target.closest("tr");

    // Se obtiene el indice del contacto a eliminar
    indice = fila.querySelector("td:nth-child(1)").textContent;

    if (confirm("Deseas eliminar el contacto?")) {
      // Elimino contacto del array de datos
      datos.splice(indice - 1, 1);

      // imprimo (muestro) registro en la tabla
      mostrarDatos(datos);
    }
  }
}

// Exporto todos los elementos
export {
  datos,
  referenciarElementosDom,
  validarInputsVacios,
  borrarInputs,
  logicaBotonMostrar,
  Contacto,
  registrarContacto,
  mostrarDatos,
  mensajeSweetAlert,
  filtrarContactos,
  colocarMayusculaIniclal,
  delegarEventosTabla,
};
