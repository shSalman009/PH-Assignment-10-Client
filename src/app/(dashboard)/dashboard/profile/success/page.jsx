import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Crown, ArrowRight, Sparkles, User } from "lucide-react";
import { addTransactionAction } from "@/lib/actions/payment";
import { getUserSession } from "@/lib/services/session";

export default async function PremiumSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const { status, customer_details, metadata, payment_status, amount_total } =
    session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const { userId } = metadata || {};

    if (userId) {
      const payload = {
        userId,
        amount: amount_total / 100,
        type: "premium",
        transactionId: session_id,
        sessionId: session_id,
        paymentStatus: payment_status,
      };

      await addTransactionAction(payload);
      getUserSession();
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50/50 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-100 p-8 text-center shadow-xs space-y-6">
          <div className="relative flex justify-center">
            <div className="h-16 w-16 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
              <Crown className="h-8 w-8 fill-amber-400" />
            </div>
            <div className="absolute top-0 right-[35%] animate-bounce text-orange-500">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">
              Upgrade Successful!
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Your account has been permanently upgraded to{" "}
              <span className="font-bold text-amber-600">PRO status</span>. You
              now have unlimited uploads and a verified user badge active!
            </p>
          </div>

          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-left space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-medium">Account Email:</span>
              <span className="text-zinc-800 font-semibold">
                {customerEmail}
              </span>
            </div>
            <div className="flex justify-between text-xs border-t border-zinc-200/60 pt-2.5">
              <span className="text-zinc-400 font-medium">
                Receipt Reference:
              </span>
              <span className="text-zinc-700 font-mono text-[10px] truncate max-w-45">
                {session_id.substring(0, 22)}...
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/dashboard/profile"
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm group"
            >
              <User className="h-4 w-4" />
              Go to My PRO Profile
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
