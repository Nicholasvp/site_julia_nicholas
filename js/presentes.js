document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.select-button');
    const totalValueElement = document.getElementById('total-value');
    let totalValue = 0;

    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            totalValue += price;
            totalValueElement.textContent = totalValue.toFixed(2).replace('.', ',');
        });
    });

    document.getElementById('pay-button').addEventListener('click', () => {
        // Redirecionar para o link do Stripe
        window.location.href = 'https://buy.stripe.com/test_6oEaFs5ZP8R9epWaEE';
    });
});