export default function SectionHeading({
  kicker,
  title,
  text,
  align = "center",
}: {
  kicker?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {kicker && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{text}</p>}
      <div className={`gold-rule mt-5 w-24 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
