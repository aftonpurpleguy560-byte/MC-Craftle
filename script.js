// Sayfa ilk yüklendiğinde ve dil değiştiğinde UI'ı güncelleyen fonksiyon
function updateUILanguage() {
    const data = translations[currentLang];

    // HTML Elementlerini bul ve metinlerini değiştir
    document.getElementById('game-title').innerText = data.title;
    document.getElementById('search-input').placeholder = data.placeholder;
    document.getElementById('start-btn').innerText = data.start;
    document.getElementById('lang-toggle').innerText = data.langBtn;
    
    // İmzanı her ihtimale karşı güncelle [cite: 2026-02-01]
    const footer = document.querySelector('.footer p') || document.getElementById('footer-text');
    if (footer) footer.innerText = "Purpleguy © 2026 - tablet power";
}

// Dil değiştirme butonu fonksiyonu
function changeLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    updateUILanguage();
    
    // Dil değişince sonucu temizle (karışıklık olmasın)
    const nameResult = document.getElementById('item-name-result');
    if (nameResult) nameResult.innerText = "";
}

// EŞYA KONTROLÜ VE SPRITE GÖSTERİMİ
function checkGuess() {
    const inputField = document.getElementById('search-input');
    const userGuess = inputField.value.trim().toLowerCase();
    const displayDiv = document.getElementById('item-display');
    const nameResult = document.getElementById('item-name-result');
    
    // Hangi eşyayı arıyoruz? (Burayı oyun mantığına göre değiştirebilirsin)
    const targetKey = "diamond_sword"; 
    
    // translations.js içindeki o dile ait doğru ismi çek
    const correctLocalizedName = translations[currentLang].items[targetKey].toLowerCase();

    if (userGuess === "") return;

    if (userGuess === correctLocalizedName) {
        // DOĞRU BİLDİĞİNDE: Sprite'ı göster
        displayDiv.style.display = "block";
        displayDiv.className = "item-icon"; // Temizle
        displayDiv.classList.add(`sprite-${targetKey}`); // CSS'teki koordinatı ekle
        
        nameResult.innerText = translations[currentLang].success;
        nameResult.style.color = "#55FF55"; // Yeşil
    } else {
        // YANLIŞ BİLDİĞİNDE
        displayDiv.style.display = "none";
        nameResult.innerText = translations[currentLang].error;
        nameResult.style.color = "#FF5555"; // Kırmızı
    }
}

// Event Listener'lar
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa açılır açılmaz siyah arka planı ve dili ayarla [cite: 2026-01-27]
    document.body.style.backgroundColor = "black"; 
    updateUILanguage();

    // Buton tıklama olayı
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', checkGuess);
    }

    // Enter tuşu ile kontrol etme kolaylığı
    const inputField = document.getElementById('search-input');
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkGuess();
        });
    }
});
