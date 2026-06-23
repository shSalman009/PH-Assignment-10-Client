import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, ChefHat } from "lucide-react";
import { purchaseRecipeAction } from "@/lib/actions/payment";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // Retrieve session data from Stripe and expand metadata
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const {
    status,
    customer_details,
    metadata,
    payment_intent,
    payment_status,
    amount_total,
  } = session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }
  console.log(status);
  if (status === "complete") {
    const { userId, recipeId } = metadata || {};

    if (userId && recipeId) {
      const payload = {
        userId,
        recipeId,
        amount: amount_total / 100,
        type: "recipe",
        transactionId: payment_intent,
        sessionId: session_id,
        paymentStatus: payment_status,
      };

      const data = await purchaseRecipeAction(payload);
      console.log(data);
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50/50 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-100 p-8 text-center shadow-xs space-y-6">
          <div className="relative flex justify-center">
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="absolute top-0 right-[35%] animate-bounce text-orange-500">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">
              Payment Confirmed!
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We appreciate your business. Your recipe guide has been unlocked
              permanently and saved to your account directory.
            </p>
          </div>

          {/* Receipt Info Subcard */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-left space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-medium">
                Sent receipt to:
              </span>
              <span className="text-zinc-800 font-semibold">
                {customerEmail}
              </span>
            </div>
            <div className="flex justify-between text-xs border-t border-zinc-200/60 pt-2.5">
              <span className="text-zinc-400 font-medium">
                Transaction Reference:
              </span>
              <span className="text-zinc-700 font-mono text-[10px] truncate max-w-45">
                {session_id.substring(0, 22)}...
              </span>
            </div>
          </div>

          {/* Call-to-Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href={`/recipes/${metadata?.recipeId}`}
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm group"
            >
              <ChefHat className="h-4 w-4" />
              Start Cooking Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/recipes"
              className="w-full h-11 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center"
            >
              Browse Other Recipes
            </Link>
          </div>

          <p className="text-[10px] text-zinc-400">
            Have questions? Contact us at{" "}
            <a
              href="mailto:support@recipehub.com"
              className="underline hover:text-zinc-600"
            >
              support@recipehub.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}
