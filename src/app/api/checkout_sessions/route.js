import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getUserSession } from "@/lib/services/session";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUserSession();

    if (!user) {
      return NextResponse.redirect(`${origin}/login`, 303);
    }

    const formData = await req.formData();
    const purchaseType = formData.get("purchaseType") || "recipe";

    let priceId, stripeMode, metadata, successUrl;

    if (purchaseType === "premium") {
      priceId = "price_1TmcudIUlFL3NgFD9SFNp6p2";
      stripeMode = "payment";
      metadata = {
        userId: user.id.toString(),
        type: "premium_upgrade",
      };
      successUrl = `${origin}/dashboard/profile/success?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      const recipeId = formData.get("recipeId");
      priceId = "price_1TlTrGIUlFL3NgFD5mZJUhrF";
      stripeMode = "payment";
      metadata = {
        userId: user.id.toString(),
        recipeId: recipeId,
        type: "recipe_purchase",
      };
      successUrl = `${origin}/recipes/success?session_id={CHECKOUT_SESSION_ID}`;
    }

    // Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      metadata: metadata,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: stripeMode,
      success_url: successUrl,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
