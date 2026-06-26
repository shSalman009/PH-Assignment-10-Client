import { Button } from "@/components/ui/button";
export default function PremiumPurchaseButton() {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="purchaseType" value="premium" />

      <section>
        <Button
          type="submit"
          variant="primary"
          className="w-full h-11 cursor-pointer rounded-lg bg-primary text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center relative z-10"
        >
          Upgrade Account Now
        </Button>
      </section>
    </form>
  );
}
