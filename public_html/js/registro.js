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
    var boton = document.getElementById("botonCrear");
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
  
  /*document.querySelector("#mifoto").addEventListener("change", function(){
    const reader = new FileReader();
                
        reader.addEventListener("load", () => {
        /*console.log(reader.result);
        localStorage.setItem("recent-image",reader.result);
        });
                
        reader.readAsDataURL(this.files[0]);
        });
            
        document.addEventListener("DOMContentLoaded", () => {
            const recentImageDataUrl = localStorage.getItem("recent-image");
                
            if (recentImageDataUrl){
                document.querySelector("#imgPreview").setAttribute( "src",recentImageDataUrl);
            }
        });*/
  
 function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "index.html";
}

}
window.addEventListener("load", iniciar);