'use strict';

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


// Exporto las funciones
export default
{
  referenciarElementosDom,
  
}


