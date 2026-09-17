import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Musical Programs & Masterclasses | 2nd Inversion Musical School",
  description:
    "Explore instrument masterclasses, vocal coaching, music theory, studio recording, and ensemble performance programs at 2nd Inversion Musical School.",
  openGraph: {
    title: "Musical Programs & Masterclasses | 2nd Inversion Musical School",
    description:
      "Explore instrument masterclasses, vocal coaching, music theory, studio recording, and ensemble performance programs at 2nd Inversion Musical School.",
    url: "https://2ndinversion.com/services",
    siteName: "2nd Inversion Musical School",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
