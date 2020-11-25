/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var formulario;
function iniciar() {
    var boton = document.getElementById("botonBuscar");
    boton.addEventListener("click", enviarFormulario);
    formulario = document.querySelector("form[name='miformulario']");
    formulario.addEventListener("invalid", validacion, true);
}
function validacion(evento) {
    var elemento = evento.target;
    elemento.style.background = "#FFDDDD";
}
function enviarFormulario() {
    var valido = formulario.checkValidity();
    if (valido) {
        formulario.submit();
    }
}
window.addEventListener("load", iniciar);

