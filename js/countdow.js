const weddingDate = new Date('2025-07-26T18:30:00Z'); // 15:30 horário de Brasília (UTC-3)
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date();
    const timeDifference = weddingDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElement.textContent = `Faltam ${days} dias, ${hours}h ${minutes}min e ${seconds}s para o casamento!`;
    
}

setInterval(updateCountdown, 1000);
updateCountdown();