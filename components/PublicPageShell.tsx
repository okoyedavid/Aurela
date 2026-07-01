import Navbar from "@/components/navBar";
import Footer from "@/components/navigation/Footer";

export default function PublicPageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><Navbar /><main>{children}</main><Footer /></div>;
}
