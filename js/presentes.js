document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.select-button');
    const giftItems = document.querySelectorAll('.gift-item');
    const totalValueElement = document.getElementById('total-value');
    let totalValue = 0;

    function parsePrice(priceString) {
        return parseFloat(priceString.replace('.', '').replace(',', '.'));
    }

    function toggleSelection(giftItem, button) {
        const price = parsePrice(button.getAttribute('data-price'));

        if (giftItem.classList.contains('selected')) {
            totalValue -= price;
            giftItem.classList.remove('selected');
            button.textContent = 'Selecionar';
        } else {
            totalValue += price;
            giftItem.classList.add('selected');
            button.textContent = 'Remover';
        }

        totalValueElement.textContent = totalValue.toFixed(2).replace('.', ',');
    }

    giftItems.forEach(giftItem => {
        const button = giftItem.querySelector('.select-button');
        giftItem.addEventListener('click', (event) => {
            if (event.target !== button) {
                toggleSelection(giftItem, button);
            }
        });
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleSelection(giftItem, button);
        });
    });

    const modal = document.getElementById("paymentModal");
    const span = document.getElementsByClassName("close")[0];
    const pixButton = document.getElementById("pix-button");
    const stripeButton = document.getElementById("stripe-button");

    document.getElementById('pay-button').addEventListener('click', () => {
        if (totalValue <= 0) {
            alert("Selecione pelo menos um presente!");
            return;
        }
        modal.style.display = "block";
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    pixButton.addEventListener('click', () => {
        navigator.clipboard.writeText("chave-pix-aqui");
        alert("Chave PIX copiada!");
    });

    stripeButton.addEventListener('click', async () => {
        const response = await fetch("/.netlify/functions/checkout", {
            method: "POST",
            body: JSON.stringify({ amount: totalValue * 100 }), // Convert to cents
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert("Erro ao criar pagamento");
        }
    });
});