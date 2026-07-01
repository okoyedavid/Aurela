import LegalDocument from "@/components/legal/LegalDocument";
export default function AccessibilityPage() { return <LegalDocument eyebrow="Inclusive experience" title="Accessibility statement" summary="Aurela intends to make its marketplace usable across abilities, devices and assistive technologies." sections={[
  { title: "Our commitment", paragraphs: ["Aurela aims to follow recognised accessibility guidance, including WCAG 2.2 Level AA where reasonably applicable to the digital service."] },
  { title: "Measures", items: ["Keyboard-accessible navigation and controls.", "Meaningful headings, labels and alternative text.", "Sufficient contrast and visible focus states.", "Responsive layouts that support zoom and reflow.", "Reduced-motion support and clear validation messages."] },
  { title: "Known limitations", paragraphs: ["Third-party seller media, payment interfaces and delivery tools may introduce limitations. Aurela should audit these integrations and provide alternatives where possible."] },
  { title: "Feedback", paragraphs: ["Users should be able to report an accessibility barrier through a published email address or support route. Include the page, device and assistive technology when possible."] },
]} />; }
