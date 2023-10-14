
// Configuración de Firebase (asegúrate de usar tu propia configuración)
const firebaseConfig = {
  apiKey: "AIzaSyDA2fdzJbooF7LGbnSRO8yPlvq6DM3xihA",
  authDomain: "piripatitasdb.firebaseapp.com",
  databaseURL: "https://piripatitasdb-default-rtdb.firebaseio.com",
  projectId: "piripatitasdb",
  storageBucket: "piripatitasdb.appspot.com",
  messagingSenderId: "407141806527",
  appId: "1:407141806527:web:0698a28209c00e9622710a",
  measurementId: "G-Z0V10L5474"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia al almacenamiento de Firebase
const storageRef = firebase.storage().ref();

// Obtener referencia al formulario de carga de imagen de perfil
const uploadButton = document.getElementById('uploadButton');

// Obtener el usuario autenticado
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Obtén la referencia a la imagen de perfil en Firebase Storage
    const imageRef = storageRef.child('images/' + user.uid);

    // Obtén la URL de descarga de la imagen actual y configúrala como la fuente de la imagen de perfil
    imageRef.getDownloadURL().then(function(downloadURL) {
      const currentProfileImage = document.getElementById('current-profile-image');
      currentProfileImage.src = downloadURL;
    }).catch(function(error) {
      // Si el usuario no tiene una imagen de perfil, puedes manejarlo aquí
    });

    // Agregar un evento de escucha al input de selección de imagen
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', function() {
      const selectedImage = imageInput.files[0];

      if (!selectedImage) {
        alert('Selecciona una imagen antes de subir.');
        return;
      }

      // Mostrar una vista previa de la imagen seleccionada
      const imagePreview = document.getElementById('image-preview');
      imagePreview.style.display = 'block';
      const previewImage = imagePreview.querySelector('img');
      previewImage.src = URL.createObjectURL(selectedImage);
    });

    // Agregar un evento de escucha al botón de carga
    uploadButton.addEventListener('click', function() {
      // Obtener el archivo de imagen de perfil seleccionado
      const selectedImage = imageInput.files[0];

      if (!selectedImage) {
        alert('Selecciona una imagen antes de subir.');
        return;
      }

      // Generar un nombre único para la imagen de perfil
      const imageName = user.uid + '-' + new Date().getTime() + '-' + selectedImage.name;

      // Ruta de la imagen en el almacenamiento de Firebase
      const imageRef = storageRef.child('images/' + user.uid);

      // Subir la imagen al almacenamiento de Firebase
      const uploadTask = imageRef.put(selectedImage);

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
            // Limpiar el formulario después de subir la imagen

            // Establecer la URL de descarga como la fuente de la imagen de perfil en el HTML
            currentProfileImage.src = downloadURL;

            // Ocultar la vista previa
            imagePreview.style.display = 'none';

            imageInput.value = '';
            alert('Imagen subida exitosamente.');
          }).catch(function(error) {
            console.error('Error al actualizar la URL de la imagen de perfil:', error);
          });
        }
      );
    });
  } else {
    // El usuario no está autenticado, puedes redirigirlo o mostrar un mensaje de inicio de sesión
    console.error('El usuario no está autenticado.');
  }
});
