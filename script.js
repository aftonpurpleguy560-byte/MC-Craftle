import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Firebase Config ✨
const firebaseConfig = {
  apiKey: "AIzaSyBvkxrjBY2pVLNo6fmjGpinlXcPmy5Mc_A",
  authDomain: "mc-craftle.firebaseapp.com",
  projectId: "mc-craftle",
  storageBucket: "mc-craftle.firebasestorage.app",
  messagingSenderId: "593377101435",
  appId: "1:593377101435:web:053380c4b753b11fea44de"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🏆 Rekorları Getir
async function loadLeaderboard() {
    const listElement = document.getElementById('scores-list');
    if (!listElement) return;
    const q = query(collection(db, "leaderboard"), orderBy("score", "asc"), limit(5));
    const querySnapshot = await getDocs(q);
    listElement.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `👑 ${data.name}: ${data.score} Deneme`;
        listElement.appendChild(li);
    });
}

// 🕹️ Tahmin Kontrolü
window.checkGuess = async function() {
    const inputField = document.getElementById('search-input');
    const userGuess = inputField.value.trim().toLowerCase();
    const targetKey = "iron_boots"; // Örnek hedef
    
    // Emojiyi ayır ve sadece ismi kontrol et
    const itemData = translations[currentLang].items[targetKey];
    const emoji = itemData.split(' ').pop();
    const cleanName = itemData.replace(emoji, '').trim().toLowerCase();

    if (userGuess === cleanName) {
        document.getElementById('item-display').innerHTML = emoji;
        document.getElementById('item-name-result').innerText = translations[currentLang].success;
        
        // Skor kaydet (Efe için) 🥇
        await addDoc(collection(db, "leaderboard"), {
            name: "Efe",
            score: 1,
            timestamp: new Date()
        });
        loadLeaderboard();
    } else {
        document.getElementById('item-name-result').innerText = translations[currentLang].error;
    }
};

// 🌑 Başlangıç
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = "black"; [cite: 2026-01-27]
    loadLeaderboard();
});
