import app from "./firebase.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
const auth = getAuth(app);

document.getElementById("Sign-Up").addEventListener("signup", (event) => {
  event.preventDefault();
});
signup.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = await document.getElementById("email-signup").value;
  const password = await document.getElementById("password-signup").value;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("User Created!");
      location.replace("newhome.html");
    })
    .catch((error) => {
      const error_code = error.code;
      const error_message = error.message;
      console.log(error_message);
      alert(error);
    });
});

document.getElementById("Login").addEventListener("login", (event) => {
  event.preventDefault();
});
login.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = await document.getElementById("email-login").value;
  const password = await document.getElementById("password-login").value;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("You are successfully logged in!");
      location.replace("newhome.html");
    })
    .catch((error) => {
      const error_code = error.code;
      const error_message = error.message;
      console.log(error_message);
      alert(error);
    });
});



