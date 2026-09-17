import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Korals Design Private Limited | Pune",
  description:
    "Get in touch with Korals Design Private Limited for architectural, structural, and industrial engineering services, consultations, and project inquiries in Pune.",
  openGraph: {
    title: "Contact Us | Korals Design Private Limited | Pune",
    description:
      "Get in touch with Korals Design Private Limited for architectural, structural, and industrial engineering services, consultations, and project inquiries in Pune.",
    siteName: "Korals Design Private Limited",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
