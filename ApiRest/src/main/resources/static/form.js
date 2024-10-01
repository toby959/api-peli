
// document.getElementById('btnRegister').addEventListener('click', function (event) {
//     event.preventDefault(); // Evitar el envío del formulario por defecto

//     // Obtener los valores de los campos
//     const title = document.getElementById('title').value.trim();
//     const director = document.getElementById('director').value.trim();
//     const genre = document.getElementById('genre').value.trim();

//     // Validar que los campos no estén vacíos
//     if (!title || !director || !genre) {
//         alert('Please fill in all fields.'); // Mensaje de error
//         return; // Salir de la función si hay campos vacíos
//     }

//     // Crear un objeto con los datos
//     const data = {
//         title: title,
//         director: director,
//         genre: genre
//     };

//     // Enviar los datos a la API
//     fetch('http://localhost:8000/api/v1/movie', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Success:', data);
//             alert('Registration successful');
//             clearForm(); // Limpiar el formulario después de un registro exitoso
//             // listMovies(); 
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error registering');
//         });
// });

// // Función para limpiar el formulario
// function clearForm() {
//     document.getElementById('title').value = '';
//     document.getElementById('director').value = '';
//     document.getElementById('genre').value = '';
// }

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


function validateFields(title, director, genre) {
    return title.trim() !== '' && director.trim() !== '' && genre.trim() !== '';
}

function handleError(error) {
    console.error('Error:', error);
    alert('Error registering');
}

document.getElementById('btnRegister').addEventListener('click', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const genre = document.getElementById('genre').value;

    if (!validateFields(title, director, genre)) {
        alert('Please fill in all fields.');
        return;
    }

    const data = { title, director, genre };

    fetch('http://localhost:8000/api/v1/movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful');
            clearForm();
            // listMovies(); // Descomenta esta línea si quieres actualizar la lista
        })
        .catch((error) => {
            handleError(error);
        });
});

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('genre').value = '';
}