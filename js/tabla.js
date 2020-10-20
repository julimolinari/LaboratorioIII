import cargarFormulario from "./scripts.js";


let idSeleccionado;

// retornara un objeto crearTabla, con los objetos cargados

export default function crearTabla(lista){
    const tabla = document.createElement('table');
    tabla.setAttribute("id","Tabla");
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));


    return tabla;
}


//devuelve un thead -> tr -> th(depende de la cantidad de keys que tiene el objeto, sus atributos)
function crearCabecera(item){
    
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        // th.textContent = key;   otra manera valida
        const texto = document.createTextNode(key);
        th.appendChild(texto);

        tr.appendChild(th);                  
    }

    thead.appendChild(tr);

    return thead;

}


//devuelve un tbody -> tr -> td
function crearCuerpo(lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');        
     
        for (const key in element) { 
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);  
            td.appendChild(texto);   
            tr.appendChild(td);        
        }


        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id',element['id']);
            // tr.dataset.id = element['id'];
        }     

        agregarManejadorTR(tr);
        tbody.appendChild(tr);        
    });

    return tbody;
}


// agregar a th un Data.atribe data-id - valor id de la persona - despues cuando se construye la tablahay que agregar el manejador
// para que si clickeo algun elemento tengo el id. ponerl en un alert el id

function agregarManejadorTR(tr){    
    if(tr){
           tr.addEventListener('click',function(e){            
            idSeleccionado = e.target.parentElement.getAttribute('data-id');
            console.log(idSeleccionado);            

            localStorage.setItem('idSeleccionado',idSeleccionado);
            cargarFormulario();
           //otra manera: alert(e.target.dataset.id);
            //console.log(e.path[1].dataset.id);
            
          
        });//tercer parametro para que lo agarre el tr y no td
    }    
}


