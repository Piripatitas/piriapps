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

// Referencia al almacenamiento de Firebase
const storageRef = firebase.storage().ref();

// Obtener referencia al formulario de carga
const uploadForm = document.getElementById('uploadForm');
const locationInput = document.getElementById('locationInput');
const getLocationButton = document.getElementById('getLocationButton');

// Variable para almacenar el mapa
let map;

// Variable para almacenar el marcador
let marker;

// Función para inicializar el mapa
function initMap() {
    // Comprueba si el navegador admite la geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Obtiene las coordenadas de la ubicación actual
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Crea un objeto con las coordenadas de la ubicación actual
            const currentLocation = { lat: latitude, lng: longitude };

            // Configura el mapa para que se centre en la ubicación actual
            map = new google.maps.Map(document.getElementById('map'), {
                center: currentLocation,
                zoom: 12 // Ajusta el nivel de zoom según tus preferencias
            });

            // Crea un marcador en la ubicación actual
            marker = new google.maps.Marker({
                position: currentLocation,
                map: map,
                draggable: true
            });

            // Agrega un evento al marcador para obtener la ubicación actual cuando se arrastra
            marker.addListener('dragend', function(event) {
                const location = event.latLng; // Obtén la ubicación
                locationInput.value = location.toString(); // Almacena la ubicación en el campo de entrada

                // Genera un enlace de Google Maps con las coordenadas
                const lat = location.lat();
                const lng = location.lng();
                const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                document.getElementById('googleMapsLink').href = googleMapsLink;
            });
        }, function(error) {
            // Manejar errores de geolocalización
            console.error(error);
            alert('No se pudo obtener la ubicación actual. Asegúrate de habilitar la geolocalización en tu dispositivo.');
        });
    } else {
        // El navegador no admite la geolocalización
        alert('Tu navegador no admite la geolocalización. Asegúrate de habilitar la geolocalización en tu dispositivo.');
    }
}


// Agregar un evento de escucha al botón "Obtener Ubicación Actual"
// Agregar un evento de escucha al botón "Obtener Ubicación Actual"
getLocationButton.addEventListener('click', function() {
    if (navigator.geolocation) {
        // El navegador admite la geolocalización
        navigator.geolocation.getCurrentPosition(function(position) {
            // Obtener las coordenadas de la ubicación actual
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Mostrar la ubicación en el mapa y en el campo de entrada
            const location = { lat: latitude, lng: longitude };
            marker.setPosition(location); // Actualizar la posición del marcador en el mapa

            // Almacena las coordenadas en el campo de entrada
            locationInput.value = latitude + ', ' + longitude;

            // Centrar el mapa en la ubicación actual
            map.setCenter(location);

            // Genera un enlace de Google Maps con las coordenadas
            const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            document.getElementById('googleMapsLink').href = googleMapsLink;
        }, function(error) {
            // Manejar errores de geolocalización
            console.error(error);
            alert('No se pudo obtener la ubicación actual. Asegúrate de habilitar la geolocalización en tu dispositivo.');
        });
    } else {
        // El navegador no admite la geolocalización
        alert('Tu navegador no admite la geolocalización. Asegúrate de habilitar la geolocalización en tu dispositivo.');
    }
});


// Agregar un evento de escucha al formulario
uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const imageFile = document.getElementById('imageInput').files[0];
    const description = document.getElementById('descriptionInput').value;
    const location = document.getElementById('locationInput').value;

    // Generar un nombre único para la imagen
    const imageName = new Date().getTime() + '-' + imageFile.name;

    // Ruta de la imagen en el almacenamiento de Firebase
    const imageRef = storageRef.child('images/' + imageName);

    // Subir la imagen al almacenamiento de Firebase
    const uploadTask = imageRef.put(imageFile);

    // Manejar eventos de carga de la imagen
    uploadTask.on('state_changed',
        function(snapshot) {
            // Mostrar el progreso de la carga si lo deseas
        },
        function(error) {
            // Manejar cualquier error durante la carga de la imagen
            console.error(error);
        },
        function() {
            // La imagen se ha cargado exitosamente

            // Obtener la URL de descarga de la imagen desde Firebase
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Aquí puedes realizar las acciones necesarias para guardar la URL de descarga, la descripción y la ubicación en tu base de datos Firebase Realtime Database

                // Guardar los datos en la base de datos
                const database = firebase.database();
                const animalData = {
                    description: description,
                    location: location,
                    imageUrl: downloadURL
                };

                // Generar una clave única para el animal
                const animalKey = database.ref().child('animales').push().key;

                // Guardar los datos en la base de datos bajo la referencia 'animales'
                const updates = {};
                updates['/animales/' + animalKey] = animalData;

                database.ref().update(updates);

                // Limpiar el formulario después de subir los datos
                document.getElementById('imageInput').value = '';
                document.getElementById('descriptionInput').value = '';
                document.getElementById('locationInput').value = '';
            });
        }
    );
});
