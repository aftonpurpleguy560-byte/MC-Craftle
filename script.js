// translations.js dosyasından gelen verileri kullanarak UI'ı güncelleyen ana fonksiyon
function updateUILanguage() {
    const lang = currentLang; // translations.js içindeki değişken (tr veya en)
    const data = translations[lang];

    // HTML elementlerini bul ve metinlerini değiştir
    document.getElementById('game-title').innerText = data.title;
    document.getElementById('search-input').placeholder = data.placeholder;
    document.getElementById('start-btn').innerText = data.start;
    
    // Dil değiştirme butonunun üstündeki yazıyı güncelle (Ters köşe yapar: TR'deyken EN yazar)
    document.getElementById('lang-toggle').innerText = data.langBtn;
}

// Dil değiştirme butonuna basıldığında çalışan fonksiyon
function changeLanguage() {
    // Dili tersine çevir
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    
    // UI'ı anında güncelle
    updateUILanguage();
    
    // Konsola bilgi bas (Hata ayıklamak için)
    console.log("Dil şu an: " + currentLang.toUpperCase());
}

// EŞYA KONTROLÜ: Kullanıcının girdiği ismi dile göre kontrol eder
function checkGuess() {
    const inputField = document.getElementById('search-input');
    const userGuess = inputField.value.trim().toLowerCase();
    
    // Mevcut dildeki eşya listesini al
    const currentItems = translations[currentLang].items;
    
    // Hedef eşyanın kod adı (Örneğin arka planda her zaman 'diamond_sword' arıyoruz)
    const targetItemKey = "diamond_sword"; 
    
    // translations.js içinde o dile karşılık gelen ismi bul
    const correctLocalizedName = currentItems[targetItemKey].toLowerCase();

    if (userGuess === "") return; // Boşsa bir şey yapma

    if (userGuess === correctLocalizedName) {
        // Doğru bildiğinde o dildeki başarı mesajını ver
        alert(translations[currentLang].success || "Doğru! / Correct!");
        // Bir sonraki aşamaya geçiş kodlarını buraya ekleyebilirsin
    } else {
        // Yanlış bildiğinde o dildeki hata mesajını ver
        alert(translations[currentLang].error || "Yanlış! / Wrong!");
    }
    
    inputField.value = ""; // Kutuyu temizle
}

// "BAŞLA" butonuna tıklandığında kontrolü çalıştır
document.getElementById('start-btn').addEventListener('click', checkGuess);

// Sayfa ilk yüklendiğinde dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    updateUILanguage();
});
