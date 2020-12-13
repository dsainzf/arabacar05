/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var bd;


function iniciar() {
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
    
    sessionStorage.setItem('usuario', 'null');
    localStorage.setItem('usuario', 'null');
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if(document.getElementById("usuario").value=== null)
    {
        $("altaViaje").remove();
        $("verViajesPublicados").remove();
        $("cerrarSesion").remove();
    }
    else
    {
        //$("#registro.html").remove();
        $("iniciarSesion").remove();
        //sesionStorage();
        
        if(usuario.coche.value === "")
            $("altaViaje").remove();
            $("verViajesPublicados").remove();
    } 
    var boton = document.getElementById("cerrarSesion");
    boton.addEventListener("click", cerrarSesion);
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

function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "index.html";
}
function cerrarSesion()
{
    alert("cierra sesion");
    sessionStorage.clear();
}

window.addEventListener("load", iniciar);
