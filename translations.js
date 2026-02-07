// Varsayılan dili belirle
let currentLang = 'tr'; 

const translations = {
    tr: {
        // Arayüz Metinleri
        title: "MC CRAFTLE",
        start: "BAŞLA",
        placeholder: "Eşya ismi girin...",
        langBtn: "English", // Butonda görünecek yazı
        success: "Tebrikler! Doğru eşyayı buldun.",
        error: "Maalesef yanlış eşya, tekrar dene!",
        
        // Eşya Listesi (Oyuncunun TR modunda yazması gerekenler)
        items: {
            "diamond_sword": "Elmas Kılıç",
            "diamond": "Elmas",
            "stick": "Çubuk",
            "apple": "Elma",
            "iron_ingot": "Demir Külçesi",
            "gold_ingot": "Altın Külçesi",
            "pickaxe": "Kazma",
            "crafting_table": "Çalışma Masası"
        }
    },
    en: {
        // Arayüz Metinleri
        title: "MC CRAFTLE",
        start: "START",
        placeholder: "Enter item name...",
        langBtn: "Türkçe", // Butonda görünecek yazı
        success: "Congratulations! You found it.",
        error: "Wrong item, try again!",
        
        // Eşya Listesi (Oyuncunun EN modunda yazması gerekenler)
        items: {
            "diamond_sword": "Diamond Sword",
            "diamond": "Diamond",
            "stick": "Stick",
            "apple": "Apple",
            "iron_ingot": "Iron Ingot",
            "gold_ingot": "Gold Ingot",
            "pickaxe": "Pickaxe",
            "crafting_table": "Crafting Table"
        }
    }
};

