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
    
    nombre = document.getElementById("nombre");
    nombre.addEventListener("input", comprobacionRegistro);

    dni = document.getElementById("dni");
    dni.addEventListener("input", comprobacionRegistro);

    edad = document.getElementById("edad");
    edad.addEventListener("input", comprobacionRegistro);

    email = document.getElementById("email");
    email.addEventListener("input", comprobacionRegistro);

    contraseña = document.getElementById("contraseña");
    contraseña.addEventListener("input", comprobacionRegistro);
    
    coche = document.getElementById("coche");
    coche.addEventListener("input", comprobacionRegistro);

    cajadatos = document.getElementById("cajadatos");

    //var archivos = document.getElementById("imagen");
    //archivos.addEventListener("change", procesar);

    var boton = document.getElementById("botonRegistrarse");
    boton.addEventListener("click", guardarUsuario);
}
function guardarUsuario() {
  var nombre = document.getElementById("nombre").value;
  var dni = document.getElementById("dni").value;
  var edad = document.getElementById("edad").value;
  var email = document.getElementById("email").value;
  var contraseña = document.getElementById("contraseña").value;
  var foto = document.getElementById("foto").value;
  var coche = document.getElementById("coche").value;
  

  var transaccion = bd.transaction(["usuarios"], "readwrite");
  var almacen = transaccion.objectStore("usuarios");
  transaccion.addEventListener("complete", completado);
  transaccion.addEventListener("error", error);
  var solicitud = almacen.add({nombre: nombre, dni: dni, edad: edad, email: email, contraseña: contraseña, coche: coche});
  localStorage.setItem(nombre + "-" + dni+ "-" + edad+ "-" + email+ "-" + contraseña + "-" + foto + "-" + coche);
  document.getElementById("nombre").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("foto").value = "";
  document.getElementById("coche").value = "";
  
 function error(){
 alert ("error");
 }
 
 
 
function completado(){
 alert ("completado");
 location.href = "index.html";
}

}
function comprobacionRegistro()
{
    comprobarNombre(nombre.value);
    comprobarDNI(dni.value);
    comprobarEdad(edad.value);
    comprobarEmail(email.value);
    comprobarContraseña(contraseña.value);
    comprobarContraseña(coche.value);
    
    if(comprobarNombre(nombre.value)&& comprobarDNI(dni.value) && comprobarMovil(edad.value) && comprobarEmail(email.value)
            && comprobarContraseña(contraseña.value) && comprobarContraseña(coche.value) === true)
    {
        return true;
    }   
}

function comprobarEmail(pEmail)
{
    var ex = /^([a-zA-Z]+[a-zA-Z0-9._-]*)@{1}([a-zA-Z0-9\.]{2,})\.([a-zA-Z]{2,3})$/;
   
    if (ex.test(pEmail) || pEmail === '')
    {
        email.style.background = '#FFFFFF';
        return true;
    } else
    {
        email.style.background = '#FFDDDD';
        return false;
    }
}

function comprobarContraseña(pContraseña)
{
    var er = /^[a-zA-Z0-9]{4,16}$/;
    
    if (er.test(pContraseña) || pContraseña === '')
    {
        contraseña.style.background = '#FFFFFF';
        return true;
    } else
    {
        contraseña.style.background = '#FFDDDD';
        return false;
    }
}

function comprobarEdad(pEdad)
{
    
    if (pEdad > 18)
    {
        pEdad.document.write("edad correcta");
        return true;
    } else
    {
        pEdad.document.write("edad inferiro a 18");
        return false;
    }
}

function comprobarDNI(pDNI)
{
    var er = /^[0-9]{8}$/;
    
    if (er.test(pDNI) || pDNI === '')
    {
        dni.style.background = '#FFFFFF';
        return true;
    } else
    {
        dni.style.background = '#FFDDDD';
        return false;
    }
}

function comprobarNombre(pNombre)
{
    var er = /^[a-zA-Z]{3,12}$/;
    
    if (er.test(pNombre) || pNombre === '')
    {
        nombre.style.background = '#FFFFFF';
        return true;
    } else
    {
        nombre.style.background = '#FFDDDD';
        return false;
    }
}
window.addEventListener("load", iniciar);