import Section from '@/components/shared/Section'

export default function OurStory() {
  return (
    <div className="pt-20">
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/api/placeholder/1920/800')`
          }}
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-heading font-bold">Our Story</h1>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-6">The Vacation in France</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              The VIF began with a simple belief: the French Riviera deserves to be experienced with intention, comfort, and authenticity. We're not a faceless booking platform or a sprawling rental company—we're a small team of Riviera enthusiasts who genuinely care about your stay.
            </p>
            <p>
              Each property in our collection has been personally selected for its character, location, and ability to provide an exceptional base for your Mediterranean escape. We've stayed in these villas and apartments ourselves. We know the best morning bakery nearby, which beach is quietest on weekends, and where to watch the sunset with a glass of local rosé.
            </p>
            <p>
              What sets us apart is our commitment to thoughtful hospitality. From the moment you inquire, you're working with people who know the region intimately and want to share it with you. We handle the logistics, provide local insights, and remain available throughout your stay—not because we have to, but because we want your time here to be everything you hoped for.
            </p>
            <p>
              The French Riviera is more than glamorous beaches and designer boutiques. It's morning markets filled with fresh figs and lavender. It's hilltop villages where time seems to slow. It's the way golden light falls across terracotta rooftops as the sun sets over the Mediterranean. We help you experience all of it.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <h2 className="text-3xl font-heading font-semibold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏡</span>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Authenticity</h3>
            <p className="text-muted-foreground">
              We showcase properties with genuine character and provide honest, transparent information. No false promises, no surprises.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Quality</h3>
            <p className="text-muted-foreground">
              Every property meets our standards for comfort, cleanliness, and amenities. We visit personally and maintain high expectations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💙</span>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Hospitality</h3>
            <p className="text-muted-foreground">
              Your experience matters to us. We're responsive, helpful, and genuinely invested in ensuring your Riviera stay exceeds expectations.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-semibold mb-6">Let's Plan Your Escape</h2>
          <p className="text-muted-foreground mb-8">
            Whether you're planning a family holiday, a romantic getaway, or a celebration with friends, we'd love to help you find the perfect Riviera retreat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/stays"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              View Our Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
