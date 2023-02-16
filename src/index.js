import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhcTB822pW_zlaWncaPKH4CwZc9tHkr9A",
  authDomain: "test-907c4.firebaseapp.com",
  databaseURL: "https://test-907c4-default-rtdb.firebaseio.com",
  projectId: "test-907c4",
  storageBucket: "test-907c4.appspot.com",
  messagingSenderId: "904761099635",
  appId: "1:904761099635:web:186c4635125796214c3106",
};

const app = initializeApp(firebaseConfig);

// authentication

const auth = getAuth();

// signup

const signup = document.getElementById("signup");

// login
const signin = document.getElementById("signin");

// logout
const logout = document.getElementById('logout');

signup.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signup.email.value;
  const password = signup.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential.user);
      signup.reset();
      // console.log(`user signed up`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

signin.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signin.email.value;
  const password = signin.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential.user);
      signin.reset();
      // console.log(`user signed in`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

logout.addEventListener('click', () => {
  signOut(auth)
  .then(() => {
    console.log('user logged out');
  })
})

onAuthStateChanged(auth, (user) => {
  console.log(user);
})
