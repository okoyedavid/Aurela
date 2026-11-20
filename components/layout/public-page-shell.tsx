import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/site-footer";

export default function PublicPageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><Navbar /><main>{children}</main><Footer /></div>;
}
