import Link from "next/link";
import {
  Search,
  Truck,
  Globe,
  Shield,
  Headphones,
  ArrowRight,
  FileText,
  Zap,
  Building2,
  PackageCheck,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";
import TrackingHeroForm from "@/components/public/TrackingHeroForm";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy opacity-90" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              Live tracking available 24/7
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Ship Across Borders
              <br />
              <span className="text-orange">With Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              TrackPoint Global delivers your packages safely and on time to destinations across the world. Real-time tracking from pickup to doorstep.
            </p>
            <TrackingHeroForm />
            <p className="text-sm text-gray-400 mt-4">
              Try demo: <code className="bg-white/10 px-2 py-0.5 rounded text-orange">TPG-240620-1024</code>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Choose TrackPoint Global?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with logistics expertise to deliver an unmatched shipping experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Real-Time Tracking",
                desc: "Monitor your shipment every step of the way with live location updates and instant notifications.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Express and standard shipping options to meet your timeline. Priority handling for urgent packages.",
              },
              {
                icon: Shield,
                title: "Secure Handling",
                desc: "Every package is handled with care and fully insured. Your shipments are protected from start to finish.",
              },
              {
                icon: Headphones,
                title: "Reliable Support",
                desc: "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="bg-orange/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-orange" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive courier and logistics solutions tailored to your shipping needs, whether personal or business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "International Courier Delivery",
                desc: "Send packages to over 200 countries worldwide with full tracking and customs support. We handle all the logistics so you don't have to.",
              },
              {
                icon: PackageCheck,
                title: "Domestic Parcel Shipping",
                desc: "Fast and affordable domestic shipping across Nigeria and partner countries. Same-day and next-day options available in select cities.",
              },
              {
                icon: FileText,
                title: "Document Delivery",
                desc: "Secure and certified delivery of important documents, contracts, and legal papers. Signature confirmation on delivery.",
              },
              {
                icon: Zap,
                title: "Express Shipping",
                desc: "Time-critical deliveries with guaranteed express transit. Priority handling from pickup to destination within 1–3 business days.",
              },
              {
                icon: Building2,
                title: "Business Logistics Support",
                desc: "End-to-end logistics solutions for businesses of all sizes. Bulk shipping rates, API integration, and dedicated account management.",
              },
              {
                icon: Shield,
                title: "Cargo & Freight",
                desc: "Heavy and bulk shipments handled with professional cargo solutions. Sea and air freight options for large consignments.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 hover:bg-orange/5 transition-colors border border-gray-100 group"
              >
                <div className="bg-navy/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors">
                  <item.icon className="h-6 w-6 text-navy group-hover:text-orange transition-colors" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-semibold transition-colors"
            >
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Shipping with TrackPoint Global is simple. Follow these steps and let us handle the rest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Drop Off or Schedule", desc: "Bring your package to any of our locations or schedule a doorstep pickup." },
              { step: "2", title: "Get Tracking Number", desc: "Receive a unique tracking number to monitor your shipment in real time." },
              { step: "3", title: "Shipment In Transit", desc: "Your package moves through our secure logistics network to its destination." },
              { step: "4", title: "Track Online", desc: "Follow every milestone of your shipment with live status updates." },
              { step: "5", title: "Delivered", desc: "Package arrives safely at the destination. Confirmation sent to sender and receiver." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-orange text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage / Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Global Coverage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We ship to major destinations across the world. Our network spans continents to ensure your packages reach any corner of the globe.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { flag: "🇬🇧", name: "United Kingdom", cities: "London, Manchester, Birmingham" },
              { flag: "🇺🇸", name: "United States", cities: "New York, Houston, Chicago" },
              { flag: "🇨🇦", name: "Canada", cities: "Toronto, Vancouver, Montreal" },
              { flag: "🇦🇪", name: "UAE", cities: "Dubai, Abu Dhabi, Sharjah" },
              { flag: "🇪🇺", name: "Europe", cities: "Paris, Berlin, Amsterdam" },
              { flag: "🌍", name: "Africa", cities: "Lagos, Accra, Nairobi" },
            ].map((dest) => (
              <div
                key={dest.name}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-3">{dest.flag}</div>
                <h3 className="font-semibold text-navy mb-1">{dest.name}</h3>
                <p className="text-xs text-gray-500">{dest.cities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of businesses and individuals trust TrackPoint Global for their shipping needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adaeze Nwankwo",
                role: "Business Owner, Lagos",
                text: "TrackPoint Global has transformed how we ship products to our UK customers. The tracking is accurate and delivery times are consistently reliable. Highly recommended for any business.",
              },
              {
                name: "Robert Williams",
                role: "Import Manager, London",
                text: "We switched to TrackPoint for all our Africa-bound shipments. Their customs handling is excellent and we've had zero lost packages in over 200 shipments. Outstanding service.",
              },
              {
                name: "Chinwe Obi",
                role: "E-commerce Seller, Abuja",
                text: "The express shipping option is a game-changer. My customers love being able to track their orders in real time. The support team is also incredibly responsive and helpful.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-navy text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Ship or Track a Package?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Get started with TrackPoint Global today. Track your shipment now or contact our team for shipping quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/track"
              className="bg-white text-orange hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" /> Track Shipment
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}