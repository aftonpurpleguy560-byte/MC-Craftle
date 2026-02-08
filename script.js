import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Firebase Yapılandırman ✨
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

// 🏆 Rekor Kaydet
async function saveScore(nickname, attempts) {
    try {
        await addDoc(collection(db, "leaderboard"), {
            name: nickname,
            score: attempts,
            timestamp: new Date()
        });
        loadLeaderboard(); 
    } catch (e) {
        console.error("❌ Hata: ", e);
    }
}

// 👑 Rekorları Listele
async function loadLeaderboard() {
    const listElement = document.getElementById('scores-list');
    if (!listElement) return;

    const q = query(collection(db, "leaderboard"), orderBy("score", "asc"), limit(10));
    const querySnapshot = await getDocs(q);
    
    listElement.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `👑 ${data.name}: ${data.score} Deneme`;
        listElement.appendChild(li);
    });
}

// 🎮 Oyun Fonksiyonları
window.changeLanguage = function() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    const data = translations[currentLang];
    document.getElementById('game-title').innerText = data.title;
    document.getElementById('search-input').placeholder = data.placeholder;
    document.getElementById('start-btn').innerText = data.start;
    document.getElementById('lang-toggle').innerText = data.langBtn;
};

window.checkGuess = function() {
    const inputField = document.getElementById('search-input');
    const userGuess = inputField.value.trim().toLowerCase();
    const targetKey = "diamond_sword"; 
    
    // Emojiyi temizleyip kontrol etme 🧠
    const correctName = translations[currentLang].items[targetKey].split(' ')[0].toLowerCase();

    if (userGuess.includes(correctName)) {
        const displayDiv = document.getElementById('item-display');
        displayDiv.style.display = "block";
        displayDiv.className = `item-icon sprite-${targetKey}`;
        document.getElementById('item-name-result').innerText = "🎉 " + translations[currentLang].success;
        saveScore("Efe", 1); // 🥇 Rekor [cite: 2026-02-01]
    } else {
        document.getElementById('item-name-result').innerText = "❌ " + translations[currentLang].error;
    }
};

// 🌑 Başlangıç Ayarları
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = "black"; // [cite: 2026-01-27]
    loadLeaderboard();
});
