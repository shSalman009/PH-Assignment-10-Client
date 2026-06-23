import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { getUserSession } from "@/lib/services/session";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUserSession();

    const formData = await req.formData();
    const recipeId = formData.get("recipeId");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      metadata: {
        userId: user.id.toString(),
        recipeId: recipeId,
      },
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1TlTrGIUlFL3NgFD5mZJUhrF",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/recipes/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
