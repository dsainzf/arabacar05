/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cajadatos, bd;
function iniciar() {
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
    var boton = document.getElementById("verViaje");
    boton.addEventListener("click", mostrar());
}
/*function iniciar() {
  cajadatos = document.getElementById("cajadatos");
  var boton = document.getElementById("grabar");
  boton.addEventListener("click", agregarobjeto);

  var solicitud = indexedDB.open("basededatos");
  solicitud.addEventListener("error", mostrarerror);
  solicitud.addEventListener("success", comenzar);
  solicitud.addEventListener("upgradeneeded", crearbd);
}*/

function mostrarerror(evento) {
  alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
  bd = evento.target.result;
  mostrar();
}
function crearbd(evento) {
    var basededatos = evento.target.result;
    var usuarios = basededatos.createObjectStore("usuarios", {keyPath: "dni"});
    usuarios.createIndex("BuscarEmail", "email", {unique:true});
    var viajes = basededatos.createObjectStore("viajes", {keyPath: "id", autoIncrement:true});
    viajes.createIndex("fechaHora", "fechaHora", {unique:true});
}

function mostrar() {
  
  cajadatos.innerHTML = "";
  var transaccion = bd.transaction(["viajes"], "readwrite");
  var almacen = transaccion.objectStore("viajes");
  transaccion.addEventListener("complete", completado);
  transaccion.addEventListener("error", error);
  var puntero = almacen.openCursor();
  puntero.addEventListener("success", mostrarlista);
}
function mostrarlista(evento) {
  var puntero = evento.target.result;
  if (puntero) {
     //cajadatos.innerHTML += "<div>" + clave + " - " + valor + "</div>";
    cajadatos.innerHTML += "<div>" + puntero.value.listaValoresOrig + " - " + puntero.value.listaValoresDest + " - " + puntero.value.tiempolocal + "</div>";
    puntero.continue();
  }
}

function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "verViajesPublicados.html";
}
window.addEventListener("load", iniciar);
