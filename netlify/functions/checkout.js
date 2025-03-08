const stripe = require("stripe")("sk_test_51QjrDjKPekmBM7jYFbYRxxZUf4Z4q1NO7pHU2pzq323Mv4VWuRp7aSHfxI3YukBGUOTWZSncukBR3WoRgAIl7PnH002lgQqJAc"); 

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
