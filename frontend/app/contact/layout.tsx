import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the NovaLabs team. We're here to help with questions, feedback, or support.",
  keywords: ["contact", "support", "help", "NovaLabs"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
