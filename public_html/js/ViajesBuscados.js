/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global indexedDB */

function mostrar() {
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML = "";
    var claveB = sessionStorage.key(0);
    var valorB = sessionStorage.getItem(claveB);
    for (var f = 0; f < localStorage.length; f++) {
        var clave = localStorage.key(f);
        var valor = localStorage.getItem(clave);
        if(claveB===clave && valorB===valor){
        cajadatos.innerHTML += "<div>" + clave + " - " + valor + "</div>";
    }
    }
}
window.addEventListener("load", mostrar);
