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
    
    email = document.getElementById("email");
    email.addEventListener("input", comprobacionLogin);
        
    contraseña = document.getElementById("contraseña");
    contraseña.addEventListener("input", comprobacionLogin);
        
    var boton = document.getElementById("login");
    boton.addEventListener("click", validarUsuario);
    
    var boton = document.getElementById("login");
    boton.addEventListener("click", completado);
    
    
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


function comprobacionLogin()
{
    comprobarEmail(email.value);
    
    comprobarContraseña(contraseña.value);
 }
 
function validarUsuario()
{
    var emailABuscar = document.getElementById("email").value;
    var passwordABuscar = document.getElementById("contraseña").value;
   
   //----------- CONECTAR A LA BD ----------------   
    var transaccion = bd.transaction(["arabaCar05"],"readonly");
    var almacen = transaccion.objectStore("arabaCar05");
    var puntero = almacen.openCursor();
    var elementos = [];
   //---------------------------------------------
   
    puntero.onsuccess = function (e) {
        var result = e.target.result;
        if (result === null) {
            return;
        }
        elementos.push(result.value);
        result.continue();
    };
    
    transaccion.oncomplete = function()
    {
        var encontrado = false;
        var i = 0;
        while( i < elementos.length && !encontrado )
        {   
            if ( elementos[i].email === emailABuscar && elementos[i].contraseña === passwordABuscar )
            {
                alert( "Contraseña verificada");
                encontrado = true;
                
                var clave = elementos[i].email;
                var contraseña = elementos[i].contraseña;
                
                var datos = new Array();//Creamos un nuevo array vacío
                datos[0] = elementos[i].nombre;
                datos[1] = clave;
                datos[2] = contraseña;

                //en sessionStorage cuando cierras la pestaña no se guarda la info
                window.sessionStorage[ window.sessionStorage.length ] = JSON.stringify(datos);
                //en localStorage cuando cierras la pestaña si se guarda la info
                window.localStorage[ window.localStorage.length ] = JSON.stringify(datos);
                
//                //en sessionStorage cuando cierras la pestaña no se guarda la info
//                window.sessionStorage[ clave ] = usuario; 
//                //en localStorage cuando cierras la pestaña si se guarda la info
//                window.localStorage[ window.localStorage.length ] = usuario;
               
                var usuario = elementos[i].nombre;
                
                alert("usuaaariiiioooo");
                
                document.getElementById("usuario").innerHTML = 'Hola, ' + usuario;
                
//                if(elementos[i].email === "rs@gmail.com")
//                {
//                    
//                }
                
            }      
            else if ( elementos[i].email === emailABuscar && elementos[i].contraseña !== passwordABuscar )
            {
                alert( "Contraseña incorrecta!!!!");
                encontrado = true;
            }
            else
            {
                i++;
            }
        }
        
        if( !encontrado )
            alert("El email no esta en la BD");
        
    };
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

function error(){
 alert ("error");
 }
function completado(){
 alert ("completado");
 location.href = "index.html";
        
}
window.addEventListener("load", iniciar);
