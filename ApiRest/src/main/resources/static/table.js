//##################################################################

// window.onload = function() {
//     hideEdit()
//     listMovies();
// };

// //LISTAR PELICULAS
// let listMovies = async()=>{

//     const request = await fetch("http://localhost:8000/api/v1/movies",
//     {   method: 'GET',
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//         }, 
//     });

//     const movies = await request.json();

//     let contentTable ="";

//     for (const movie of movies) {
//         let contentRow = `<tr>
// <td>${movie.id}</td>
// <td>${movie.title}</td>
// <td>${movie.director}</td>
// <td>${movie.genre}</td>
// <td>                                           
//   <i onClick="editMovie(${movie.id})" class="material-icons button edit">edit</i>
//   <i onClick="deleteMovie(${movie.id})" class="material-icons button delete">delete</i>
// </td>
// </tr>`

// contentTable += contentRow;
//     }

//     document.querySelector("#table tbody").outerHTML = contentTable;

// }


// //BORRAR UNA PELÍCULA
// let deleteMovie = async(id)=>{

//     const request = await fetch("http://localhost:8000/api/v1/movie/"+id,
//     {   method: 'DELETE',
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         }, 
//     });

//     listMovies();

// }

// let idEdit;
// //EDITAR UNA PELICULA
// let editMovie = async(id)=>{

//     idEdit = id;
//     showForm();

//     const request = await fetch("http://localhost:8000/api/v1/movie/" + id,
//     {   method: 'GET',
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         }, 
//     });

//      // TRAIGO LA PELÍCULA A MODIFICAR    
//      if (!request.ok) {
//         console.error("Error fetching movie data:", request.statusText);
//         alert("Error fetching movie data");
//         return; // Salir si hay un error
//     }


// // TRAIGO LA PELICULA A MODIFICAR    
//     const movie = await request.json();
  
//     document.getElementsByClassName("formbold-form-input")[0].value=movie.title;
//     document.getElementsByClassName("formbold-form-input")[1].value=movie.director;
//     document.getElementsByClassName("formbold-form-input")[2].value=movie.genre;
 
 
//     let btnModify = document.getElementById("btnModify");

// }


// let btnModify = document.getElementById("btnModify");

// btnModify.addEventListener("click", async (evento) => {
//     await applyUpdate(idEdit);
  
// });

// let applyUpdate = async(id)=>{
    
//     let fields = {
//         id: id,
//         title: document.getElementById("title").value,
//         director: document.getElementById("director").value,
//         genre: document.getElementById("genre").value // Cambia 'categoria' a 'genero'
//     };



//     const request = await fetch("http://localhost:8000/api/v1/movie/" + id,
//     {   method: 'PUT',
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(fields)  
//     });

//     if (!request.ok) {
//         const error = await request.json();
//         console.error("Error when modifying the Movie:", error);
//     } else {
//         console.log("Movie modified successfully");
//         listMovies(); // Llama a la función para actualizar la lista
  
//     }
// }
// //OCULTAR Y MOSTRAR EL FORMULARIO DE EDICIÓN
// function hideEdit(){
//     let form = document.getElementById("form").style.visibility="hidden";
//     document.getElementsByTagName("h1")[0].style.visibility="hidden";
// }


// function showForm(){
//     let form = document.getElementById("form").style.visibility="visible";
//     document.getElementsByTagName("h1")[0].style.visibility="visible";
// }

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


window.onload = function() {
    hideEdit();
    listMovies();
};

// LISTAR PELÍCULAS
let listMovies = async () => {
    const request = await fetch("http://localhost:8000/api/v1/movies", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const movies = await request.json();
    let contentTable = "";

    for (const movie of movies) {
        let contentRow = `<tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.genre}</td>
            <td>                                           
                <i onClick="editMovie(${movie.id})" class="material-icons button edit">edit</i>
                <i onClick="deleteMovie(${movie.id})" class="material-icons button delete">delete</i>
            </td>
        </tr>`;
        contentTable += contentRow;
    }

    document.querySelector("#table tbody").innerHTML = contentTable; // Cambiado a innerHTML
}

// BORRAR UNA PELÍCULA
let deleteMovie = async (id) => {
    const request = await fetch("http://localhost:8000/api/v1/movie/" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    listMovies();
}

let idEdit;

// EDITAR UNA PELÍCULA
let editMovie = async (id) => {
    idEdit = id;
    showForm();

    const request = await fetch("http://localhost:8000/api/v1/movie/" + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!request.ok) {
        console.error("Error fetching movie data:", request.statusText);
        alert("Error fetching movie data");
        return; // Salir si hay un error
    }

    const movie = await request.json();
    document.getElementsByClassName("formbold-form-input")[0].value = movie.title;
    document.getElementsByClassName("formbold-form-input")[1].value = movie.director;
    document.getElementsByClassName("formbold-form-input")[2].value = movie.genre;
}

// OCULTAR Y MOSTRAR EL FORMULARIO DE EDICIÓN
function hideEdit() {
    document.getElementById("form").style.visibility = "hidden";
    document.getElementsByTagName("h1")[0].style.visibility = "hidden";
}

function showForm() {
    document.getElementById("form").style.visibility = "visible";
    document.getElementsByTagName("h1")[0].style.visibility = "visible";

    // Mover el evento aquí
    let btnModify = document.getElementById("btnModify");
    btnModify.addEventListener("click", async (evento) => {
        await applyUpdate(idEdit);
    });
}

// APLICAR ACTUALIZACIÓN
let applyUpdate = async (id) => {
    let fields = {
        id: id,
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        genre: document.getElementById("genre").value
    };

    const request = await fetch("http://localhost:8000/api/v1/movie/" + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields)
    });

    if (!request.ok) {
        const error = await request.json();
        console.error("Error when modifying the Movie:", error);
    } else {
        console.log("Movie modified successfully");
        listMovies(); // Llama a la función para actualizar la lista
    }
}
