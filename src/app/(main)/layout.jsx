import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function MarketingLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
