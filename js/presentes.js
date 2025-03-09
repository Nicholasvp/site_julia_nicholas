document.addEventListener('DOMContentLoaded', () => {
    const giftItems = document.querySelectorAll('.gift-item');
    const totalValueElement = document.getElementById('total-value');
    const totalValueModal = document.getElementById('modal-total-value');
    const modal = document.getElementById("paymentModal");
    const span = document.getElementsByClassName("close")[0];
    const pixButton = document.getElementById("pix-button");
    const stripeButton = document.getElementById("stripe-button");
    let totalValue = 0;

    function parsePrice(priceString) {
        return parseFloat(priceString.replace('.', '').replace(',', '.'));
    }

    function updateTotalValue() {
        totalValueElement.textContent = totalValue.toFixed(2).replace('.', ',');
        totalValueModal.textContent = totalValue.toFixed(2).replace('.', ',');
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

        updateTotalValue();
    }

    function setupGiftItem(giftItem) {
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
    }

    function setupModal() {
        document.getElementById('pay-button').addEventListener('click', () => {
            const alertPlaceholder = document.querySelector('.alert.alert-warning');
            if (totalValue <= 0) {
                alertPlaceholder.classList.remove('d-none');
                alertPlaceholder.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Selecione pelo menos um presente!
                </div>
            `;
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
    }

    function setupPaymentButtons() {
        pixButton.addEventListener('click', () => {
            const originalText = pixButton.textContent;
            pixButton.textContent = 'Copiado!';
            navigator.clipboard.writeText("nicholasvpinheiro@gmail.com");
            pixButton.classList.add('copied');
            setTimeout(() => {
            pixButton.classList.remove('copied');
            pixButton.textContent = originalText;
            }, 2000);
        });

        stripeButton.addEventListener('click', async () => {
            const response = await fetch("/.netlify/functions/checkout", {
                method: "POST",
                body: JSON.stringify({ amount: totalValue }), 
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Erro ao criar pagamento");
            }
        });
    }

    giftItems.forEach(setupGiftItem);
    setupModal();
    setupPaymentButtons();
});