import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from '@phosphor-icons/react'

export default function HowToBook() {
  const steps = [
    {
      number: '01',
      title: 'Browse Stays',
      description: 'Explore our collection of villas and apartments to find your perfect match.'
    },
    {
      number: '02',
      title: 'Check Availability',
      description: 'Contact us with your preferred dates and property to confirm availability.'
    },
    {
      number: '03',
      title: 'Confirm Details',
      description: 'We\'ll send you a booking agreement with all details, pricing, and policies.'
    },
    {
      number: '04',
      title: 'Secure with Deposit',
      description: 'Pay a 30% deposit to secure your dates. Balance due 30 days before arrival.'
    }
  ]

  const faqs = [
    {
      question: 'What\'s included in the nightly rate?',
      answer: 'All properties include welcome concierge service, WiFi, linens and towels, weekly cleaning, pool and garden maintenance (where applicable), and utilities. Some properties also include mid-stay cleaning for longer bookings.'
    },
    {
      question: 'Can I book directly or do I need to use a platform?',
      answer: 'You can book directly through us for the best rates and personalized service. We\'re also listed on select booking platforms, but direct bookings often have more flexibility with dates and services.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Full refund if cancelled 60+ days before arrival. 50% refund for cancellations 30-60 days before. No refund for cancellations less than 30 days before arrival. We recommend travel insurance for peace of mind.'
    },
    {
      question: 'Do you offer airport transfers?',
      answer: 'Yes! We offer private airport transfers from Nice Côte d\'Azur Airport to your property. This can be arranged when you book or added later.'
    },
    {
      question: 'What is the security deposit?',
      answer: 'A refundable security deposit of €500 is required for all properties. This is refunded within 7 days after checkout, pending inspection.'
    },
    {
      question: 'Can I extend my stay if I decide to?',
      answer: 'Subject to availability, we\'re happy to extend your stay. Contact us as early as possible to check if your property is available for additional nights.'
    }
  ]

  return (
    <div className="pt-20">
      <Section className="bg-card border-b border-border">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold mb-4">
            How to Book Your Stay
          </h1>
          <p className="text-xl text-muted-foreground">
            A simple, transparent process designed to make booking your French Riviera retreat effortless.
          </p>
        </div>
      </Section>

      <Section>
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-semibold mb-8 text-center">Booking Process</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-heading font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-semibold mb-8">Booking Policies</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <AnimatedSection delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Payment Terms
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 30% deposit to secure booking</li>
                  <li>• Balance due 30 days before arrival</li>
                  <li>• Secure payment via bank transfer or card</li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Cancellation Policy
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 60+ days: Full refund</li>
                  <li>• 30-60 days: 50% refund</li>
                  <li>• Under 30 days: No refund</li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Check-in & Check-out
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check-in: 4:00 PM</li>
                  <li>• Check-out: 10:00 AM</li>
                  <li>• Early/late options may be available</li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Security Deposit
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• €500 refundable deposit</li>
                  <li>• Charged before arrival</li>
                  <li>• Refunded within 7 days after checkout</li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </Section>

      <Section>
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-semibold mb-8">Frequently Asked Questions</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </Section>

      <Section className="bg-primary/5">
        <AnimatedSection direction="fade">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold mb-4">Ready to Book?</h2>
            <p className="text-muted-foreground mb-6">
              Get in touch to check availability and start planning your French Riviera escape.
            </p>
            <Button asChild size="lg">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
