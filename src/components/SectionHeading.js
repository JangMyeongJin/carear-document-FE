export default function SectionHeading({
  number,
  title,
  children
}) {
  return <div className="section-heading"><p className="eyebrow">{number} / {title}</p><h2>{children}</h2></div>;
}
