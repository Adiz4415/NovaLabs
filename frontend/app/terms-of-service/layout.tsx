import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Read the NovaLabs Terms of Service. Understand the rules and guidelines for using our platform.",
  keywords: ["terms of service", "legal", "NovaLabs", "terms"],
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
