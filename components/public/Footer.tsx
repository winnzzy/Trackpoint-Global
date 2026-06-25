import Link from "next/link";
import { Package, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Package className="h-7 w-7 text-orange" />
              <span>
                Track<span className="text-orange">Point</span> Global
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fast, secure, and reliable international courier delivery services. Connecting businesses and individuals across borders with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-orange transition-colors">Home</Link></li>
              <li><Link href="/track" className="hover:text-orange transition-colors">Track Shipment</Link></li>
              <li><Link href="/services" className="hover:text-orange transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-orange transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-orange transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services" className="hover:text-orange transition-colors">International Courier</Link></li>
              <li><Link href="/services" className="hover:text-orange transition-colors">Express Shipping</Link></li>
              <li><Link href="/services" className="hover:text-orange transition-colors">Freight & Cargo</Link></li>
              <li><Link href="/services" className="hover:text-orange transition-colors">E-commerce Fulfillment</Link></li>
              <li><Link href="/services" className="hover:text-orange transition-colors">Customs & Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange" />
                +1 (307) 555-0198
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange" />
                support@trackpointglobal.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange mt-0.5" />
                30 N Gould St, Sheridan, WY 82801, United States
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TrackPoint Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}