// Varsayılan dil ayarı (Oyun ilk açıldığında ne olsun?)
let currentLang = 'tr'; 

const translations = {
    tr: {
        // Genel Arayüz Metinleri
        title: "MC CRAFTLE",
        start: "BAŞLA",
        placeholder: "Eşya ismi girin...",
        langBtn: "English", // Butona basınca geçilecek olan dilin adı
        success: "Tebrikler! Doğru eşyayı buldun.",
        error: "Maalesef yanlış eşya, tekrar dene!",
        
        // Eşya Listesi (Anahtar: Kod Adı, Değer: Oyuncunun göreceği isim)
        // Buradaki değerlerin TAMAMEN Türkçe olduğundan emin ol.
        items: {
            "diamond": "Elmas",
            "stick": "Çubuk",
            "diamond_sword": "Elmas Kılıç",
            "crafting_table": "Çalışma Masası",
            "iron_ingot": "Demir Külçesi",
            "gold_ingot": "Altın Külçesi",
            "pickaxe": "Kazma",
            "apple": "Elma"
        }
    },
    en: {
        // Genel Arayüz Metinleri
        title: "MC CRAFTLE",
        start: "START",
        placeholder: "Enter item name...",
        langBtn: "Türkçe", // Butona basınca geçilecek olan dilin adı
        success: "Congratulations! You found the right item.",
        error: "Wrong item, try again!",
        
        // Eşya Listesi
        // Buradaki değerlerin TAMAMEN İngilizce olduğundan emin ol.
        items: {
            "diamond": "Diamond",
            "stick": "Stick",
            "diamond_sword": "Diamond Sword",
            "crafting_table": "Crafting Table",
            "iron_ingot": "Iron Ingot",
            "gold_ingot": "Gold Ingot",
            "pickaxe": "Pickaxe",
            "apple": "Apple"
        }
    }
};
