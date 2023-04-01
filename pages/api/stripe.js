import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MrdPAAqUGNfHj8CznmeFqLZxZ5KFKzsdRUXkcBySWfeZEGOOGZQ2hfkfZATJYSecrsj282xPqhlcMhKKfaOUb0v00eaqcPGy7"
);
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const lineItems = req.body.map((item) => {
        const img = item.image.asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/pg2kwzjw/production/"
          )
          .replace("-jpg", ".jpg");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: false,
          },
          quantity: item.quantity,
        };
      });

      if (!lineItems.length) {
        throw new Error("Line items cannot be empty");
      }

      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
