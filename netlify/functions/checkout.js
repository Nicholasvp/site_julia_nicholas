require('dotenv').config(); // Carrega as variáveis do arquivo .env

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        if (!amount || amount < 100) {
            return { statusCode: 400, body: JSON.stringify({ error: "Valor inválido!" }) };
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: { name: "Pagamento Personalizado" },
                        unit_amount: amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: "https://seusite.com/sucesso",
            cancel_url: "https://seusite.com/cancelado"
        });

        return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
