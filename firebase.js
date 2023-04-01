import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxa4yXcQmeeefk0h6pUylkMfb30aFbuL4",
  authDomain: "winter-of-code-27821.firebaseapp.com",
  projectId: "winter-of-code-27821",
  storageBucket: "winter-of-code-27821.appspot.com",
  messagingSenderId: "389618249461",
  appId: "1:389618249461:web:00f97c5ddf5cd10a5d9fbc",
  measurementId: "G-M3K37SEK1G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
