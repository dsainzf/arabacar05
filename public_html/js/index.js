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
    
    if(document.getElementById("usuario")===null)
    {
        
    }
    else
    {
        sesionStorage();
    }
    
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
  if (sessionStorage.length === 0)
    {
        if (localStorage.length === 0)
        {
            document.getElementById("usuario").innerHTML = "";
        } else
        {
            var datos = window.localStorage[ window.localStorage.length - 1];

            datos = JSON.parse(datos);

            document.getElementById("usuario").innerHTML = 'Hola, ' + datos[0];
        }
    } 
    else
    {
        //el sesionStorage esta vacio, asi que cogemos datos
        //del localStorage del ultimo usuario que ha entrado
        var datos = window.sessionStorage[window.sessionStorage.length - 1];

        datos = JSON.parse(datos);   

        alert("usuaaariiiioooo");

        var usuario = datos[0];
        document.getElementById("usuario").innerHTML = 'Hola, ' + usuario;
        
        if(document.title  === "buscarViajes")
        {
            return usuario;
        }

    }
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
