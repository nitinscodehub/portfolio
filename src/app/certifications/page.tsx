import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CertificateGallery from "@/components/certifications/CertificateGallery";
import { certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Education & Certifications",
  description: "Degree, certifications and course completions with source certificate previews.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications & training"
        title={<>Credentials with <span className="text-gradient">the source attached.</span></>}
        description="Certifications, training and courses are separated deliberately. Every preview comes from a certificate document on file; unconfirmed details are labelled. Degree information is on the About page."
      >
        <p className="mt-8 text-xs text-dim">{certifications.length} credentials catalogued · degree expected 2027</p>
      </PageHero>
      <section className="shell section-pad pt-4">
        <CertificateGallery />
      </section>
    </>
  );
}
