import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact 2nd Inversion Musical School | Pune",
  description:
    "Contact 2nd Inversion Musical School in Pune for admissions, masterclasses, vocal coaching, music theory, studio recording, and ensemble training.",
  openGraph: {
    title: "Contact 2nd Inversion Musical School | Pune",
    description:
      "Contact 2nd Inversion Musical School in Pune for admissions, masterclasses, vocal coaching, music theory, studio recording, and ensemble training.",
    url: "https://2ndinversion.com/contact",
    siteName: "2nd Inversion Musical School",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
