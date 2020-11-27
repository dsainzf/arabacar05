/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global transaccion */

/*var formulario;*/
function iniciar() {
    var boton = document.getElementById("botonBuscar");
    boton.addEventListener("click", nuevoitem);
    formulario = document.querySelector("form[name='miformulario']");
    formulario.addEventListener("invalid", validacion, true);
    boton.addEventListener("click", completado);
}
function validacion(evento) {
    var elemento = evento.target;
    elemento.style.background = "#FFDDDD";
}
/*function enviarFormulario() {
    var valido = formulario.checkValidity();
    if (valido) {
        formulario.submit();
    }
}*/
function nuevoitem() {
    var origen = document.getElementById("listaValoresOrig").value;
    var destino = document.getElementById("listaValoresDest").value;
    var fechayhora = document.getElementById("tiempolocal").value;
    sessionStorage.setItem(origen + "-" + destino, fechayhora);
    document.getElementById("listaValoresOrig").value = "";
    document.getElementById("listaValoresDest").value = "";
    document.getElementById("tiempolocal").value = "";
}

function completado(){
 alert ("completado");
 location.href = "ViajesBuscados.html";
}
window.addEventListener("load", iniciar);

