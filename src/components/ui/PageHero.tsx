import SectionHeading from "./SectionHeading";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
      <div className="eng-grid pointer-events-none absolute inset-0" />
      <div className="orb -left-40 -top-32 size-[28rem] bg-violet/15" />
      <div className="orb -right-40 top-0 size-[24rem] bg-cyan/10" />
      <div className="shell relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} as="h1" />
        {children}
      </div>
    </section>
  );
}
