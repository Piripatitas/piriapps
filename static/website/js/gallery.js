
// Configuración de Firebase (asegúrate de usar tu propia configuración)
const firebaseConfig = {
     apiKey: "AIzaSyDdFWR9Zj6XJkNe-H79niPyQU7VuXVm0UY",
     authDomain: "piristorage.firebaseapp.com",
     databaseURL: "https://piristorage-default-rtdb.firebaseio.com/",
     projectId: "piristorage",
     storageBucket: "piristorage.appspot.com",
     messagingSenderId: "429862321955",
     appId: "1:429862321955:web:006e30d3402c1847029696",
     measurementId: "G-Q3E4BVR6N4"
 };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener la referencia a la ubicación de los animales en la base de datos
const animalesRef = firebase.database().ref('animales');

// Obtener el contenedor de la galería de imágenes
const imageGallery = document.querySelector('.image-gallery');

// Obtener las referencias a la vista modal y sus elementos
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementsByClassName('close')[0];

// Escuchar cambios en los datos de los animales
animalesRef.on('child_added', function(snapshot) {
    const animalData = snapshot.val();
    if (animalData) {
        // Crear elementos HTML para mostrar la imagen, descripción y ubicación
        const imageElement = document.createElement('img');
        imageElement.src = animalData.imageUrl;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('image-description');
        descriptionElement.textContent = 'Descripción: ' + animalData.description;

        const locationElement = document.createElement('p');
        locationElement.classList.add('image-location');
        const locationLink = document.createElement('a'); // Elemento enlace
        locationLink.textContent = 'Ver Ubicación';
        locationLink.href = 'https://www.google.com/maps?q=' + animalData.location; // Enlace a Google Maps
        locationElement.appendChild(locationLink);

        // Crear un contenedor para los detalles del animal
        const animalContainer = document.createElement('div');
        animalContainer.classList.add('image-gallery-item');
        animalContainer.appendChild(imageElement);
        animalContainer.appendChild(descriptionElement);
        animalContainer.appendChild(locationElement);

        // Agregar el contenedor del animal a la galería
        imageGallery.appendChild(animalContainer);

        // Agregar un evento de clic a la imagen para mostrar la vista modal
        imageElement.addEventListener('click', function () {
            modalImage.src = imageElement.src;
            modal.style.display = 'block';
        });
    }
});

// Agregar un evento de clic para cerrar la vista modal
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Cerrar la vista modal si se hace clic fuera de la imagen
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

