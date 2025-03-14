const apiKey = 'b83efaf1ac35dc9ac62e365e7cc8027a'; // Reemplaza con tu clave API de TMDb
const baseUrl = 'https://api.themoviedb.org/3';
const eventList = document.getElementById('event-list');
const categorias = document.getElementById('categorias');
const boton = document.getElementById('boton');

// Función para obtener las películas, series o documentales según la categoría
async function fetchContent(category) {
    let endpoint = '';

    // Filtrar por películas, series o documentales
    if (category === '1') {
        endpoint = '/discover/movie';  // Películas
    } else if (category === '2') {
        endpoint = '/discover/tv';  // Series
    } else if (category === '3') {
        endpoint = '/discover/movie';  // Documentales (En TMDb, se usan películas para documentales)
    } else {
        endpoint = '/discover/movie';  // Por defecto, mostrar películas
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&language=es-ES`);
        const data = await response.json();
        displayContent(data.results);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para mostrar el contenido en la página
function displayContent(content) {
    eventList.innerHTML = '';  // Limpiar la lista antes de mostrar nuevos resultados

    if (content.length === 0) {
        eventList.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    content.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
            <h2>${item.title || item.name}</h2>
            <p>${item.overview ? item.overview : 'Sin descripción disponible.'}</p>
        `;
        eventList.appendChild(listItem);
    });
}

// Evento cuando el usuario hace clic en el botón para filtrar
boton.addEventListener('click', () => {
    const category = categorias.value;
    fetchContent(category);
});

// Cargar contenido al cargar la página (mostrar todos los contenidos)
window.onload = () => {
    fetchContent('0');
};
