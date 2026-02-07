let score = 0; let currentUser = ""; let unlockedItems = []; let currentTarget = null;
let userGrid = Array(9).fill("E"); let selectedMat = "D";

const materials = ["D", "I", "S", "W", "C", "G", "B", "P", "E"];

const recipes = [
    { id: 0, name: "Elmas Kazma", pos: "-352px -32px", pattern: ["D","D","D","E","S","E","E","S","E"] },
    { id: 1, name: "Demir Kılıç", pos: "-288px -64px", pattern: ["E","I","E","E","I","E","E","S","E"] },
    { id: 2, name: "Demir Göğüslük", pos: "-224px -64px", pattern: ["I","E","I","I","I","I","I","I","I"] },
    { id: 3, name: "Elmas Göğüslük", pos: "-320px -64px", pattern: ["D","E","D","D","D","D","D","D","D"] },
    { id: 4, name: "Meşale", pos: "0px -160px", pattern: ["E","C","E","E","S","E","E","E","E"] },
    { id: 5, name: "Demir Kask", pos: "-224px -32px", pattern: ["I","I","I","I","E","I","E","E","E"] },
    { id: 6, name: "Elmas Kask", pos: "-320px -32px", pattern: ["D","D","D","D","E","D","E","E","E"] },
    { id: 7, name: "Kova", pos: "-32px -160px", pattern: ["E","E","E","I","E","I","E","I","E"] },
    { id: 8, name: "Fırın", pos: "-416px -32px", pattern: ["C","C","C","C","E","C","C","C","C"] },
    { id: 9, name: "Sandık", pos: "-320px -160px", pattern: ["W","W","W","W","E","W","W","W","W"] },
    { id: 10, name: "Demir Bot", pos: "-224px -128px", pattern: ["I","E","I","I","E","I","E","E","E"] },
    { id: 11, name: "Altın Elma", pos: "-320px -0px", pattern: ["G","G","G","G","D","G","G","G","G"] },
    { id: 12, name: "Yay", pos: "-160px -128px", pattern: ["E","S","P","S","E","P","E","S","P"] },
    { id: 13, name: "Olta", pos: "-256px -160px", pattern: ["E","E","S","E","S","P","S","E","P"] },
    { id: 14, name: "Demir Balta", pos: "-288px -0px", pattern: ["I","I","E","I","S","E","E","S","E"] },
    { id: 15, name: "Pusula", pos: "-384px -32px", pattern: ["E","I","E","I","G","I","E","I","E"] },
    { id: 16, name: "Çakmak", pos: "-192px -32px", pattern: ["I","E","E","E","G","E","E","E","E"] },
    { id: 17, name: "Kase", pos: "-448px -128px", pattern: ["W","E","W","E","W","E","E","E","E"] },
    { id: 18, name: "Demir Kürek", pos: "-288px -96px", pattern: ["E","I","E","E","S","E","E","S","E"] },
    { id: 20, name: "Ekmek", pos: "-352px -160px", pattern: ["E","E","E","W","W","W","E","E","E"] }
];

window.onload = () => {
    loadData();
    setupEvents();
    if(currentUser) { document.getElementById('login-screen').style.display = 'none'; showMenu(); }
};

function setupEvents() {
    document.getElementById('btn-login').onclick = registerUser;
    document.getElementById('btn-start').onclick = startGame;
    document.getElementById('btn-archive').onclick = showArchive;
    document.getElementById('btn-back-archive').onclick = showMenu;
    document.getElementById('btn-home').onclick = showMenu;
    document.getElementById('check-btn').onclick = processCraft;
    document.getElementById('btn-hint').onclick = buyHint;
}

function registerUser() {
    const val = document.getElementById('username-input').value.trim();
    if(val.length >= 2) { currentUser = val; saveData(); showMenu(); }
}

function showMenu() {
    hideAll();
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('welcome-text').textContent = `Hoş Geldin, ${currentUser}!`;
    document.getElementById('menu-score').textContent = score;
    document.getElementById('archive-count').textContent = unlockedItems.length;
}

function startGame() {
    const pool = recipes.filter(r => !unlockedItems.includes(r.id));
    if(pool.length === 0) { alert("Arşiv Tamamlandı!"); unlockedItems = []; }
    currentTarget = pool[Math.floor(Math.random() * pool.length)] || recipes[0];
    userGrid = Array(9).fill("E");
    hideAll();
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('target-hint').textContent = "Hedef: " + currentTarget.name;
    document.getElementById('res-slot').innerHTML = "";
    render();
}

function render() {
    const grid = document.getElementById('craft-grid'); grid.innerHTML = "";
    userGrid.forEach((v, i) => {
        const s = document.createElement('div'); s.className = 'slot';
        if(v !== "E") s.innerHTML = `<div class="mc-item item-${v}"></div>`;
        s.onclick = () => { userGrid[i] = selectedMat; render(); };
        grid.appendChild(s);
    });

    const inv = document.getElementById('inv-grid'); inv.innerHTML = "";
    materials.forEach(m => {
        const s = document.createElement('div');
        s.className = `inv-slot ${selectedMat === m ? 'selected' : ''}`;
        s.innerHTML = m === "E" ? "❌" : `<div class="mc-item item-${m}"></div>`;
        s.onclick = () => { selectedMat = m; render(); };
        inv.appendChild(s);
    });
    document.getElementById('game-score').textContent = score;
}

function processCraft() {
    const slots = document.querySelectorAll('.slot');
    let correct = 0;
    userGrid.forEach((v, i) => {
        slots[i].style.background = "";
        if(v === currentTarget.pattern[i]) { slots[i].style.background = "#538d4e"; correct++; }
        else if(currentTarget.pattern.includes(v) && v !== "E") slots[i].style.background = "#b59f3b";
        else slots[i].style.background = "#3a3a3c";
    });

    if(correct === 9) {
        score += 10;
        if(!unlockedItems.includes(currentTarget.id)) unlockedItems.push(currentTarget.id);
        saveData();
        document.getElementById('res-slot').innerHTML = `<div class="mc-item" style="background-position:${currentTarget.pos}"></div>`;
        setTimeout(() => { alert("BAŞARILI!"); showMenu(); }, 1000);
    }
}

function buyHint() {
    if(score >= 5) {
        score -= 5;
        for(let i=0; i<9; i++) {
            if(userGrid[i] !== currentTarget.pattern[i]) { userGrid[i] = currentTarget.pattern[i]; break; }
        }
        render(); saveData();
    }
}

function showArchive() {
    hideAll();
    document.getElementById('archive-screen').style.display = 'flex';
    const list = document.getElementById('archive-list'); list.innerHTML = "";
    recipes.forEach(r => {
        const item = document.createElement('div'); item.className = 'arch-item';
        if(unlockedItems.includes(r.id)) item.innerHTML = `<div class="mc-item" style="background-position:${r.pos}"></div>`;
        else item.textContent = "?";
        list.appendChild(item);
    });
}

function hideAll() { document.querySelectorAll('.screen').forEach(s => s.style.display = 'none'); }
function saveData() { localStorage.setItem('mc_save', JSON.stringify({u: currentUser, s: score, a: unlockedItems})); }
function loadData() {
    const data = JSON.parse(localStorage.getItem('mc_save') || "{}");
    currentUser = data.u || ""; score = data.s || 0; unlockedItems = data.a || [];
}
