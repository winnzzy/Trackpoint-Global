import {
  Globe,
  Shield,
  Users,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TrackPoint Global</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connecting people and businesses across borders with fast, secure, and reliable courier delivery services.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              TrackPoint Global was founded with a clear mission: to make international shipping accessible, transparent, and reliable for everyone. We saw firsthand how individuals and small businesses struggled with lost packages, unclear tracking, and unreliable delivery timelines when shipping across borders.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Starting from Lagos, Nigeria, we built a logistics platform that prioritizes real-time visibility, secure handling, and customer communication at every step. Today, we serve thousands of customers shipping to and from major destinations across Africa, Europe, North America, the Middle East, and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of experienced logistics professionals, customs specialists, and technology experts work around the clock to ensure every package reaches its destination safely and on time. Whether you are sending a single document or managing bulk cargo for your business, TrackPoint Global is your trusted shipping partner.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-14">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                desc: "We connect people and businesses across more than 200 countries and territories through our extensive logistics network.",
              },
              {
                icon: Shield,
                title: "Trust & Security",
                desc: "Every shipment is handled with the highest standards of care, insurance, and security from pickup to final delivery.",
              },
              {
                icon: Users,
                title: "Customer First",
                desc: "Our customers are at the heart of everything we do. We listen, adapt, and continuously improve our services based on feedback.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We hold ourselves to the highest standards of service quality, professionalism, and operational efficiency.",
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                desc: "We invest in technology and process improvements to make shipping faster, smarter, and more transparent for our customers.",
              },
              {
                icon: Heart,
                title: "Community Impact",
                desc: "We believe in empowering communities by enabling trade, supporting small businesses, and creating jobs across our operating regions.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="bg-orange/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-orange" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Packages Delivered" },
              { value: "200+", label: "Countries Served" },
              { value: "99.2%", label: "On-Time Delivery" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-orange mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}