"use strict";

// Variables globales
const datos = [];
let indiceEditar,
  bandera = 0;

// 1- Referencias de Elementos DOM
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

// 2- Funcion para validar inputs Vacios
function hayInputsVacios() {
  // Array con los inputs del formulario
  const inputsArr = [inputNombre, inputApellido, inputTelefono];

  // Evaluo cuantos inputs estan vacios
  let cantidadInputsVacios = 0;
  inputsArr.forEach((input) => {
    if (input.value === "") {
      input.style.border = "1px solid red";
      cantidadInputsVacios++;
    } else {
      input.style.border = "";
    }
  });

  return cantidadInputsVacios !== 0; // true:inputs vacios, false:datos completos
}

// 3- Borrado de inputs
function borrarInputs() {
  inputNombre.value = "";
  inputApellido.value = "";
  inputTelefono.value = "";
}

// 4- Funcion para mostrar sweet alerts
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

// 5- Funcion para colocar en mayuscula inicial dato
function colocarMayusculaIniclal(texto) {
  return texto.charAt(0).toUpperCase() + texto.substr(1).toLowerCase();
}

// 6- Constructor de Objetos (registros)
function Contacto(nombre, apellido, telefono) {
  this.id = datos.length;
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
}

// 7- Logica del boton mostrar/ocultar
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

// 8- Funcion que muestra datos registrados en la tabla
function mostrarDatos(array) {
  // creo filas e inserto datos en la tabla
  resultados.innerHTML = "";
  array.forEach((contacto) => {
    resultados.innerHTML += `
      <tr>
      <td>${contacto.id + 1}</td>
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

// 9- Funcion para buscar contactos por nombre en tiempo real
function filtrarContactos() {
  // Capturo palabra a filtrar
  let nombreAFiltrar = colocarMayusculaIniclal(inputFiltro.value);

  // Creo array con los datos filtrados
  let datosFiltrados = datos.filter((contacto) =>
    contacto.nombre.includes(nombreAFiltrar)
  );

  // si no hay datos a filtrar quita datos de la tabla y establece texto del boton
  if (datosFiltrados.length === 0) botonMostrar.textContent = "Mostrar";

  // si hay datos filtrados, los Muestra
  mostrarDatos(datosFiltrados);
}

// 10- Funcion que registra contactos
function registrarContacto() {
  // Si no hay inputs vacios procedo con el registro
  if (!hayInputsVacios()) {
    // Obtengo los valores de los Campos (desestructuro)
    const [nombre, apellido, telefono] = [
      colocarMayusculaIniclal(inputNombre.value),
      colocarMayusculaIniclal(inputApellido.value),
      inputTelefono.value,
    ];

    // Acciones si se edita un contacto (editar = 1, registrar = 0)
    if (bandera === 1) {
      console.log(`Editando contacto existente...`);
      console.log(`Bandera:${bandera}`);
      console.log(`Indice a Editar:${indiceEditar}`);
      console.log(datos);

      // Agrego nuevos valores al objeto a editar
      datos[indiceEditar].nombre = nombre;
      datos[indiceEditar].apellido = apellido;
      datos[indiceEditar].telefono = telefono;

      // borro input de filtrado
      inputFiltro.value = "";

      // Reseteo bandera para habilitar nueos registros sin reescribir el ediado
      bandera = 0;

      // Acciones si se registra un nuevo contacto (bandera = 0)
    } else {
      console.log(`Creando nuevo contacto...`);
      console.log(`Bandera:${bandera}`);
      console.log(`Indice a Editar:${indiceEditar}`);
      console.log(datos);

      // Instancio (creo) un objeto (registro)
      const contacto = new Contacto(nombre, apellido, telefono);

      // Agrego nuevo contacto al array datos
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

    // Muestro datos en la tabla
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
}

// 11- Funciones Editar y Eliminar por delegacion de Eventos
function delegarEventosTabla(e) {
  const elemento = e.target;
  if (elemento.classList.contains("icon-pencil")) {
    // se obtiene la fila que contiene el icono clickado
    const fila = e.target.closest("tr");

    // se obtienen los datos incluidos en la fila seleccionada
    indiceEditar =
      Number(fila.querySelector("td:nth-child(1)").textContent) - 1;
    const nombre = fila.querySelector("td:nth-child(2)").textContent;
    const apellido = fila.querySelector("td:nth-child(3)").textContent;
    const telefono = fila.querySelector(".celdaTelefono__dato").textContent;

    bandera = 1;

    // Se pasan los datos a los inputs para editarlos
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputTelefono.value = Number(telefono);

    // Funcionalidad Eliminar Contacto
  } else if (elemento.classList.contains("icon-bin")) {
    // se obtiene la fila que contiene el span clickado
    const fila = e.target.closest("tr");

    // Se obtiene el indice del contacto a eliminar
    indiceEditar = fila.querySelector("td:nth-child(1)").textContent - 1;

    if (confirm("Deseas eliminar el contacto?")) {
      console.log(`Eliminando contacto...`);
      console.log(`Bandera:${bandera}`);
      console.log(`Indice a Editar:${indiceEditar}`);
      console.log(datos);

      // Elimino contacto del array de datos
      datos.splice(indiceEditar, 1);

      // Mensaje de confirmacion exitosa de borrado
      mensajeSweetAlert(
        "success",
        "green",
        "#FDEBD0 ",
        "Registro Eliminado exitosamente!!",
        "",
        "green",
        2000
      );

      // reseteo bandera para evitar sobreescritura con nuevos registros
      bandera = 0;

      // Reestructuro los indices del array de datos
      datos.forEach((contacto, index) => {
        contacto.id = index;
      });

      console.log(datos);

      // imprimo (muestro) registro en la tabla
      mostrarDatos(datos);
    }
  }
}

// 12- Exporto todos los elementos
export {
  datos,
  referenciarElementosDom,
  // hayInputsVacios,
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
