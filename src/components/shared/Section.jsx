export default function Section({ children, className = '', containerClassName = '' }) {
  return (
    <section className={`section-padding ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>{children}</div>
    </section>
  )
}
