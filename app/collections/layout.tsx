import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/site-footer";
export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
