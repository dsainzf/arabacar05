/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cajadatos, bd;

function iniciar() {
    var boton = document.getElementById("verViaje");
    boton.addEventListener("click", mostrar);
    cajadatos = document.getElementById("cajadatos");
    
    
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
  alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
  bd = evento.target.result;
  //mostrar();
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
  var transaccion = bd.transaction(["viajes"]);
  var almacen = transaccion.objectStore("viajes");
  var puntero = almacen.openCursor();
  puntero.addEventListener("success", mostrarlista);
}
function mostrarlista(evento) 
{
  var puntero = evento.target.result;
  var fechaActual = document.getElementById("tiempolocal").value;
  //var usuario = JSON.parse(sessionStorage.getItem("usuario"));
  //var dni = usuario.dni
  if (puntero) {
      if( fechaActual < puntero.value.tiempolocal /*&& puntero.value.dni === dni*/)
      {
           cajadatos.innerHTML += "<div>" + puntero.value.listaValoresOrig + " - " + puntero.value.listaValoresDest + " - " + puntero.value.tiempolocal + "</div>";
            
      }
      puntero.continue();
  }
}

window.addEventListener("load", iniciar);
