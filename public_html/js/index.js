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

function iniciar() {
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
    
    var usuario = JSON.parse(sesionStorage.getItem("usuario"));
    if (usuario === null){
        $("#altaViaje").remove();
        $("#verViajesPublicados").remove();
        $("#cerrarSesion").remove();
    }else{
        $("#registro").remove();
        $("#login").remove();
        
        if(usuario.marca === "")
            $("#altaViaje").remove();
            $("#verViajesPublicados").remove();
    }
}

function sesionStorage(){
    
    
}
function crearbd(evento) {
    var basededatos = evento.target.result;
    var usuarios = basededatos.createObjectStore("usuarios", {keyPath: "dni"});
    usuarios.createIndex("BuscarEmail", "email", {unique:true});
    var viajes = basededatos.createObjectStore("viajes", {keyPath: "id", autoIncrement:true});
    viajes.createIndex("fechaHora", "fechaHora", {unique:true});
}

function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "index.html";
}

window.addEventListener("load", iniciar);
