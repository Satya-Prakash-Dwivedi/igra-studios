// app/api/create-stripe-session/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your SECRET KEY
// (Store this in your .env.local file!)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderItems, total } = body;

        // --- 1. Create a simple line item for Stripe ---
        // In a real app, you'd loop through `orderItems` to build a
        // detailed list. For this test, we just use the total.
        const lineItems = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Video Editing Services",
                        // You can add more details here
                        description: `Order with ${orderItems.length} item(s)`,
                    },
                    unit_amount: total * 100, // Stripe expects cents
                },
                quantity: 1,
            },
        ];

        // --- 2. Create the Stripe Checkout Session ---
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${req.headers.get("origin")}/order-success`, // URL to redirect on success
            cancel_url: `${req.headers.get("origin")}/create-order`, // URL to redirect on cancel
            // We can pass the order data to the webhook
            metadata: {
                orderData: JSON.stringify(orderItems),
            },
        });

        if (!session.url) {
            return NextResponse.json(
                { error: "Could not create Stripe session" },
                { status: 500 }
            );
        }

        // --- 3. Return the redirect URL to the frontend ---
        return NextResponse.json({ redirectUrl: session.url });

    } catch (error: any) {
        console.error("Stripe Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}