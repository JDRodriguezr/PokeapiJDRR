//URL API
const API = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0";
//const API = "https://rickandmortyapi.com/api/character";
//OBTENER LOS RESULTADOS DE LA API
const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results),
        paginacion(json.next, json.previous);
        console.log(json.results, json.info);
    })

    .catch((error) => {
      console.log("Error: ", error);
    });
};
const pokeData = (data) => {
  let html = "";
  document.getElementById("datosPersonajes").innerHTML = "";
  data.forEach((pj) => {
    const URL = pj.url;
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        llenarDatos(json, html);
      })
      .catch((error)=> {
          console.log("Error: ", error)
      });
  });
};

//DIBUJAR CARDS DE PERSONAJES
const llenarDatos = (data, html) => {
  html += '<div class="col mt-5">';
  html += '<div class ="card" style="width: 12rem;">';
  html += `<img src ="${data.sprites.front_default}" class="card-img-top" alt="algun pokemon"`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title" style="font-weight: bold; text-align:center; color = rgb(238, 124, 124);"">${mayus(data.name)}</h5>`;
  html += `<p class="card-text" >Número en la Pokédex: ${data.id}</p>`;
  html += `<p class="card-text">Peso: ${data.weight}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";

  document.getElementById("datosPersonajes").innerHTML += html;
};

const paginacion = (next, prev) => {
    let prevDisable = "";
    let nextDisable = "";
  
    let html = `<li class="page-item ${
      prev == null ? (prevDisable = "disable") : (prevDisable = "")
    }"><a class ="page-link" onclick = "getData('${prev}')">Previous</a></li> <li class="page-item ${
      next == null ? (nextDisable = "disable") : (nextDisable = "")
    }"><a class ="page-link" onclick = "getData('${next}')">Next</a></li>`;
  
    document.getElementById("paginacion").innerHTML = html;
  };

const mayus = (nombre) =>{
    inicialMinus = nombre.charAt(0); 
    slice = nombre.slice(1);
    inicialMayus = inicialMinus.toUpperCase();
    
    buenNombre = inicialMayus+slice;
    console.log(buenNombre);
    return buenNombre;
    
    }

//SE EJECUTA LA API-
getData(API);
