import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
export default function PremiumPurchaseButton() {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="purchaseType" value="premium" />

      <section>
        <Button
          type="submit"
          variant="primary"
          className="w-full h-12 cursor-pointer rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center relative z-10"
        >
          <Zap className="h-4 w-4 text-orange-200 group-hover:text-white transition-colors" />
          Upgrade to PRO
        </Button>
      </section>
    </form>
  );
}
