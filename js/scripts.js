import crearTabla from "./tabla.js";
import agregarManejadorTR from "./tabla.js";
import Persona from "./persona.js";


let listaPersonas;
let frmPersona;
let proximoId;
let divTabla;
let btnEliminar = document.getElementById('btnEliminar');
let btnCancelar = document.getElementById('btnCancelar');
let btnAltaMod = document.getElementById('btnAltaModif');

btnEliminar.hidden = true;
btnCancelar.hidden = true;

window.addEventListener('load', incializarManejadores);



export default function cargarFormulario() {

    listaPersonas.forEach(element => {
        if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
            document.getElementById('txtNombre').value = element.nombre;
            document.getElementById('txtApellido').value = element.apellido;
            document.getElementById('txtEmail').value = element.email;

            if (element.sexo == "Male") {
                document.getElementById("rdoM").checked = true;
            } else {
                document.getElementById("rdoF").checked = true;
            }
        }
    });

    btnAltaMod.textContent = 'Modificar';
    btnEliminar.hidden = false;
    btnCancelar.hidden = false;

}

btnEliminar.addEventListener('click', function (e) {
    var r = confirm("Eliminar?");
    if(r == true){
    for (let index = 0; index < listaPersonas.length; index++) {
        const element = listaPersonas[index];
        if(JSON.parse(localStorage.getItem('idSeleccionado')) == element.id){
            listaPersonas.splice(index,1);
        }
    }}else{
        limpiarDatosForm();
    }
    


});



function incializarManejadores() {
    listaPersonas = obtenerPersonas();
    proximoId = obtenerId();

    console.log(proximoId);
    divTabla = document.getElementById("divTabla");

    actualizarLista();

    frmPersona = document.forms[0];
    frmPersona.addEventListener('submit', e => {
      
        e.preventDefault();
        if (btnAltaMod.textContent == 'Modificar') {

            listaPersonas.forEach(element => {
                if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
                    element.nombre = frmPersona.nombre.value;
                    element.apellido = frmPersona.apellido.value;
                    element.email = frmPersona.email.value;
                    element.sexo = frmPersona.gender.value;
                    
                }
            });
            limpiarDatosForm();
            guardarDatos();
            actualizarLista();

        } else {

            const nuevaPersona = obtenerPersona();
            if (nuevaPersona) {
                listaPersonas.push(nuevaPersona);
                proximoId++;
                guardarDatos();
                localStorage.setItem('nextId', proximoId);
                actualizarLista();
                limpiarDatosForm();
            }
        }

        // //capturar los elementos del form
        //     console.log(frmPersona.nombre.value);
        //     console.log(document.querySelector('#txtApellido').value);
        //     console.log(document.getElementById("txtEmail").value);
        //     console.log(frmPersona.gender.value);


    });
}

function obtenerPersona() {


    const nuevaPersona = new Persona(proximoId, frmPersona.nombre.value, frmPersona.apellido.value,
        frmPersona.email.value, frmPersona.gender.value);

    return nuevaPersona;
}


function guardarDatos() {
    localStorage.setItem('gente', JSON.stringify(listaPersonas));
}



function obtenerPersonas() {
    return JSON.parse(localStorage.getItem('gente')) || [];

}



function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 0;

}



function actualizarLista() {
    divTabla.innerHTML = "";
    document.getElementById("divTabla").innerHTML='<img src="../images/6.gif" alt="cargando...">'

    setTimeout(() => {

        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(listaPersonas));
        
    }, 500);
    
}


// function actualizarLista() {
//     divTabla.innerHTML = "";
//     divTabla.appendChild(crearTabla(listaPersonas));
// }

function limpiarDatosForm() {    
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtApellido').value = "";
    document.getElementById('txtEmail').value = "";
    btnAltaMod.textContent = 'Guardar';
    btnEliminar.hidden = true;
    btnCancelar.hidden = true;

}


btnCancelar.addEventListener('click',e=>{
    limpiarDatosForm();
})


