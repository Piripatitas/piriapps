
const firebaseConfig = {
  apiKey: "AIzaSyDA2fdzJbooF7LGbnSRO8yPlvq6DM3xihA",
  authDomain: "piripatitasdb.firebaseapp.com",
  projectId: "piripatitasdb",
  storageBucket: "piripatitasdb.appspot.com",
  messagingSenderId: "407141806527",
  appId: "1:407141806527:web:0698a28209c00e9622710a",
  measurementId: "G-Z0V10L5474"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Función de registro
function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);

    promise.catch(e => alert(e.message));
    alert("Registro exitoso");

    // Guardar los valores de los campos de texto en el almacenamiento local
    localStorage.setItem("emailValue", email.value);
    localStorage.setItem("passwordValue", password.value);
}

// Función de inicio de sesión
function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);

    promise.then(() => {
        // Autenticación exitosa
        setSessionToken(); // Guardar el token de acceso en el almacenamiento local
        window.location.replace("/inicio/"); // Redirigir al usuario a la página de inicio de Django
    }).catch(e => alert(e.message));
}

// Función de cierre de sesión
function signOut() {
    auth.signOut();
    deleteSessionToken(); // Eliminar el token de sesión al cerrar sesión
    clearLocalStorage(); // Limpiar los valores de los campos de texto en el almacenamiento local
    alert("Cierre de sesión exitoso");
}

// Función para guardar el token de acceso en el almacenamiento local
function setSessionToken() {
    firebase.auth().currentUser.getIdToken()
        .then(function (token) {
            // Guardar el token de acceso en el almacenamiento local
            localStorage.setItem("sessionToken", token);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Función para obtener el token de sesión del almacenamiento local
function getSessionToken() {
    return localStorage.getItem("sessionToken");
}

// Función para eliminar el token de sesión del almacenamiento local
function deleteSessionToken() {
    localStorage.removeItem("sessionToken");
}

// Restaurar los valores de los campos de texto al cargar la página
window.onload = function () {
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");

    emailField.value = localStorage.getItem("emailValue") || "";
    passwordField.value = localStorage.getItem("passwordValue") || "";
};

// Limpiar los valores de los campos de texto en el almacenamiento local
function clearLocalStorage() {
    localStorage.removeItem("emailValue");
    localStorage.removeItem("passwordValue");
}

// Usuario activo para la página de inicio
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var email = user.email;
        window.location.replace("/inicio/"); // Redirigir al usuario a la página de inicio de Django
    } else {
        alert("No se encontró usuario activo");
    }
});