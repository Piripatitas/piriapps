
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA2fdzJbooF7LGbnSRO8yPlvq6DM3xihA",
  authDomain: "piripatitasdb.firebaseapp.com",
  projectId: "piripatitasdb",
  storageBucket: "piripatitasdb.appspot.com",
  messagingSenderId: "407141806527",
  appId: "1:407141806527:web:0698a28209c00e9622710a",
  measurementId: "G-Z0V10L5474"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth =  firebase.auth();

  //signup function
  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    alert("Registro exitoso");

  }

  //signIN function
  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    
  }


  //signOut

  function signOut(){
    auth.signOut();
    alert("Cierre de sesión exitoso");
  }

//active user to homepage
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    var email = user.email;
    alert("usuario activo "+email);
    window.location.replace("/inicio/"); // Redirigir al usuario a la página de inicio de Django
  } else {
    alert("No se encontró usuario activo");
  }
})




  function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // El usuario inició sesión correctamente
  })
  .catch((error) => {
    // Error al iniciar sesión
  });
}



