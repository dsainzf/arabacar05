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
function usuarioLogeado(evento) {
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    
    if(usuario == null){
        $("#crearViaje").remove();
        /*$("#cerrarSesion").remove();*/
        $("#verViajesPublicados").remove();
    }else{
        $("#login").remove();
        /* no se si login o iniciar sesion*/
        if(usuario.marca == ""){
            $("#crearViaje").remove();
            $("#verViajesPublicados").remove();
        }
    }
}

