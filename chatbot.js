let conversationHistory = [
    { role: "system", content: "Você é o FURIAbot, um assistente amigável e informativo da equipe de eSports FURIA." }
];

function openChat() {
    const chat = document.querySelector('.chat-container');
    chat.style.display = 'block';
    backToMenu();
}

function closeChat() {
    const chat = document.querySelector('.chat-container');
    chat.style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    appendMessage("Você", message, "user");

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_message: message })
        });

        const data = await response.json();
        appendMessage("FURIAbot", data.response, "bot");
    } catch (error) {
        appendMessage("FURIAbot", "Desculpe, ocorreu um erro ao tentar responder.", "bot");
    }

    input.value = "";
}

function appendMessage(sender, text, cls) {
    const chatContent = document.getElementById("chatContent");
    const messageEl = document.createElement("div");
    messageEl.className = cls;
    messageEl.textContent = `${sender}: ${text}`;
    chatContent.appendChild(messageEl);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function showOptions(option) {
    const chatContent = document.getElementById('chatContent');
    chatContent.innerHTML = '';

    switch(option) {
        case 'jogos':
            chatContent.innerHTML = `
                <p><strong>FURIAbot:</strong> A próxima partida da FURIA (LOL) será contra RED Canids, no dia 03/05 às 15h e FURIA (RL) contra Team Secret ás 18h (horário de Brasília).</p>
                <p><strong>FURIAbot:</strong> Você gostaria de adicionar esse(s) evento(s) ao seu calendário?</p>
                <button class="botao-furia" onclick="addToCalendar()">Adicionar ao Calendário</button>
                <button class="botao-furia" onclick="backToMenu()">Voltar ao Menu Principal</button>
            `;
            break;

        case 'stats':
            chatContent.innerHTML = `
                <p><strong>FURIAbot:</strong> Escolha uma modalidade para ver as estatísticas:</p>
                <button class="botao-furia" onclick="showStatsCS('CS')">Counter-Strike</button>
                <button class="botao-furia" onclick="showStatsV('V')">Valorant</button>
                <button class="botao-furia" onclick="showStatsLOL('LOL')">League Of Legends</button>
                <button class="botao-furia" onclick="showStatsRL('RL')">Rocket League</button>
                <button class="botao-furia" onclick="showStatsRS('RS')">Rainbow Six</button>
                <button class="botao-furia" onclick="showStatsAL('AL')">Apex Legends</button>
                <button class="botao-furia" onclick="showStatsKL('KL')">Kings League</button>
                <button class="botao-furia" onclick="showStatsPUBG('PUBG')">PUBG</button>
                <button class="botao-furia" onclick="showStatsFF('FF')">Free Fire</button>
                <button class="botao-furia" onclick="backToMenu()">Voltar ao Menu Principal</button>
            `;
            break;

        case 'conteudo':
            chatContent.innerHTML = `
                <p><strong>FURIAbot:</strong> Confira nosso conteúdo nas redes sociais!</p>
                <button class="botao-furia" onclick="viewContentF()">Site Oficial</button>
                <button class="botao-furia" onclick="viewContentI()">Instagram</button>
                <button class="botao-furia" onclick="viewContentX()">X/Twitter</button>
                <button class="botao-furia" onclick="viewContentD()">Discord</button>
                <button class="botao-furia" onclick="viewContentY()">Youtube</button>
                <button class="botao-furia" onclick="viewContentT()">Twitch</button>
                <button class="botao-furia" onclick="viewContentM()">The Move</button>
                <button class="botao-furia" onclick="backToMenu()">Voltar ao Menu Principal</button>
            `;
            break;

        case 'loja':
            chatContent.innerHTML = `
                <p><strong>FURIAbot:</strong> Visite nossa loja oficial para adquirir produtos!</p>
                <button class="botao-furia" onclick="goToStore()">Visitar Loja</button>
                <button class="botao-furia" onclick="backToMenu()">Voltar ao Menu Principal</button>
            `;
            break;
    }
}

function backToMenu() {
    const chatContent = document.getElementById('chatContent');
    chatContent.innerHTML = `
        <p><strong>FURIAbot:</strong> Olá, Furioso/a/e! O que você gostaria de saber ou fazer?</p>
    `;
}

function showStats(gameName, statsUrl) {
    const chatContent = document.getElementById('chatContent');

    chatContent.innerHTML = `
        <p><strong>FURIAbot:</strong> Exibindo estatísticas de ${gameName.toUpperCase()}...</p>
        <p><a href="${statsUrl}" target="_blank" rel="noopener noreferrer">Clique aqui para ver as estatísticas da FURIA em ${gameName}</a></p>
        <button class="botao-furia" onclick="backToMenu()">Voltar ao Menu Principal</button>
    `;
}

function showStatsCS() {
    showStats('Counter-Strike', 'https://escharts.com/pt/teams/csgo/furia');
}

function showStatsV() {
    showStats('Valorant', 'https://escharts.com/pt/teams/valorant/furia-esports');
}

function showStatsLOL() {
    showStats('League of Legends', 'https://escharts.com/pt/teams/lol/furia');
}

function showStatsRL() {
    showStats('Rocket League', 'https://liquipedia.net/rocketleague/FURIA');
}

function showStatsRS() {
    showStats('Rainbow Six', 'https://escharts.com/pt/teams/rainbow-6/furia');
}

function showStatsAL() {
    showStats('Apex Legends', 'https://escharts.com/pt/teams/apex/furia');
}

function showStatsKL() {
    showStats('Kings League', 'https://kingsleague.pro/pt/times/50-furia-fc');
}

function showStatsPUBG() {
    showStats('PUBG', 'https://escharts.com/pt/teams/pubg/furia');
}

function showStatsFF() {
    showStats('Free Fire', 'https://liquipedia.net/freefire/FURIA_Esports');
}




function addToCalendar() {
    const eventDate = '20250430T150000Z';
    const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=FURIA+vs+&dates=${eventDate}&details=Não+perca+o+jogo+da+FURIA!`;
    window.open(calendarLink, '_blank');
}

function viewContentF() { window.open("https://www.furia.gg", "_blank"); }
function viewContentI() { window.open("https://www.instagram.com/furiagg", "_blank"); }
function viewContentX() { window.open("https://twitter.com/furia", "_blank"); }
function viewContentD() { window.open("https://discord.gg/furia", "_blank"); }
function viewContentY() { window.open("https://www.youtube.com/furia", "_blank"); }
function viewContentT() { window.open("https://www.twitch.tv/furia", "_blank"); }
function viewContentM() { window.open("https://themove.gg", "_blank"); }
function goToStore() { window.open("https://www.furia.gg/produtos", "_blank"); }

document.addEventListener('click', function(event) {
    const chat = document.querySelector('.chat-container');
    const wrapper = document.getElementById('chat-wrapper');

    if (
        chat.style.display === 'block' &&
        !wrapper.contains(event.target) &&
        !event.target.closest('.botao-furia') &&
        event.target.tagName !== 'A'
    ) {
        closeChat();
    }
});

window.openChat = openChat;
window.closeChat = closeChat;
window.sendMessage = sendMessage;
window.showOptions = showOptions;
window.showStats = showStats;
window.backToMenu = backToMenu;
window.addToCalendar = addToCalendar;
window.viewContentF = viewContentF;
window.viewContentI = viewContentI;
window.viewContentX = viewContentX;
window.viewContentD = viewContentD;
window.viewContentY = viewContentY;
window.viewContentT = viewContentT;
window.goToStore = goToStore;

window.showStatsCS = showStatsCS;
window.showStatsV = showStatsV;
window.showStatsLOL = showStatsLOL;
window.showStatsRL = showStatsRL;
window.showStatsRS = showStatsRS;
window.showStatsAL = showStatsAL;
window.showStatsKL = showStatsKL;
window.showStatsPUBG = showStatsPUBG;
window.showStatsFF = showStatsFF;

document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
 
