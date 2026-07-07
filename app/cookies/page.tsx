import LegalDocument from "@/components/legal/LegalDocument";
import CookiePreferences from "@/components/legal/CookiePreferences";
export default function CookiesPage() {
  return (
    <LegalDocument
      eyebrow="Browser preferences"
      title="Cookie policy"
      summary="How Aurela may use browser storage and similar technologies for essential functionality, measurement and marketing."
      sections={[
        {
          title: "What cookies are",
          paragraphs: [
            "Cookies and similar browser technologies store or read small pieces of information on a device. Local storage may also preserve settings such as wishlist and workspace theme preferences.",
          ],
        },
        {
          title: "Categories",
          items: [
            "Necessary technologies support security, sessions, carts and requested features.",
            "Analytics technologies measure performance and usage patterns.",
            "Marketing technologies measure campaigns and personalise advertising where consent permits.",
          ],
        },
        {
          title: "Managing preferences",
          paragraphs: [
            "Optional technologies should remain disabled until valid consent is obtained where required. Browser controls can also delete or block stored information, but blocking necessary storage may affect functionality.",
          ],
        },
      ]}
    >
      <CookiePreferences />
    </LegalDocument>
  );
}
