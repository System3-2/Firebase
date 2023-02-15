import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
const container = document.getElementById("container");

const firebaseConfig = {
  apiKey: "AIzaSyDhcTB822pW_zlaWncaPKH4CwZc9tHkr9A",
  authDomain: "test-907c4.firebaseapp.com",
  projectId: "test-907c4",
  storageBucket: "test-907c4.appspot.com",
  messagingSenderId: "904761099635",
  appId: "1:904761099635:web:186c4635125796214c3106",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const colRef = collection(db, "books");

// queries

const q = query(colRef, where('author', '==', 'Charles dickens' ))
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//     books.map((item) => {
//       const { author, book, id } = item;

//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
  books.map((item) => {
    const { author, book, id } = item;

    container.innerHTML += `
        <div class="flex justify-center items-center text-center p-4 flex-col shadow-lg shadow-slate-400">
          <p>${book}</p>
          <h2>${author}</h2>
        </div>
      `;
  });
});
// adding book

const addBook = document.querySelector(".add");

addBook.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    author: addBook.author.value,
    book: addBook.book.value,
  }).then(() => {
    addBook.reset();
  });
});

// deleting book
const deleteBook = document.querySelector(".delete");

deleteBook.addEventListener("submit", (e) => {
  const docRef = doc(db, "books", deleteBook.id.value);
  deleteDoc(docRef).then(() => {
    deleteBook.reset();
    console.log(`doc ${deleteBook.id.value} deleted`);
  });
  e.preventDefault();
});


