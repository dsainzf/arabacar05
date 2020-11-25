/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bd;

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

function iniciar() {
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
}
function guardarViaje() {
  var origen = document.getElementById("listaValoresOrig").value;
  var destino = document.getElementById("listaValoresDest").value;
  var fechayHora = document.getElementById("tiempolocal").value;

  var transaccion = bd.transaction(["viajes"], "readwrite");
  var almacen = transaccion.objectStore("viajes");
  transaccion.addEventListener("complete", completado);
  transaccion.addEventListener("error", error);
  var solicitud = almacen.add({listaValoresOrig: origen, listaValoresDest: destino, tiempolocal: fechayHora});
  document.getElementById("listaValoresOrig").value = "";
  document.getElementById("listaValoresDest").value = "";
  document.getElementById("tiempolocal").value = "";
}
function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "AltaViaje.html";
}

window.addEventListener("load", iniciar);