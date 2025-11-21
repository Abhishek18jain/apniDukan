import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Truck,
  Store,
  Send,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Smartphone,
  Globe,
  ShieldCheck,
  User,
 
  AlertCircle
} from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    message: "",
    inquiryType: "general"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        shopName: "",
        phone: "",
        email: "",
        message: "",
        inquiryType: "general"
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">24/7 Kirana Shop Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
Contact Us Now            <span className="block text-blue-600">take care of your shop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
         Any questions? Need help? We're here! Phone, WhatsApp, email - whatever suits you.
          </p>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Phone Support */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4 text-sm">9 am to 9 pm</p>
              <a href="tel:+91-800-123-4567" className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition">
                +91-800-123-4567
              </a>
              <p className="text-xs text-gray-500 mt-2">Will return your missed call!</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Whatsapp</h3>
              <p className="text-gray-600 mb-4 text-sm">24/7 Chat Support</p>
              <a href="https://wa.me/918001234567" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold text-lg hover:text-green-700 transition inline-flex items-center">
                +91-800-123-4567
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
              <p className="text-xs text-gray-500 mt-2">Send Hi and lets get started!</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4 text-sm">for detailed questions</p>
              <a href="mailto:support@myshopkirana.com" className="text-purple-600 font-semibold text-base hover:text-purple-700 transition">
                support@myshopkirana.com
              </a>
              <p className="text-xs text-gray-500 mt-2">Reply within 24 hours</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-16">
            <h3 className="text-2xl font-bold mb-4">Need Help Right Now?</h3>
            <p className="text-blue-100 mb-6">Click below and let's talk directly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+91-800-123-4567" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now
                </span>
              </a>
              <a href="https://wa.me/918001234567" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition inline-flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Whatsapp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-800">Message Send Successfully</h3>
                  <p className="text-green-700 text-sm">Will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="Ramesh Kumar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name of Shop</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="Vardhman Kirana Store "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="+91-9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Types Of Question </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="general">FAQ</option>
<option value="technical">Technical Help</option>
<option value="billing">Billing/Payment</option>
<option value="distributor">Adding a Distributor</option>
<option value="gst">GST Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message*</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Write your question or any help you need..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send</span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office Address</h3>
                    <p className="text-gray-600 text-sm">
                     MyShop Kirana, Inc.<br />
123, Business Park, Tech Hub<br />
Bengaluru, Karnataka - 560001<br />
India
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Work Time</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>सोमवार - शनिवार: 9:00 AM - 9:00 PM</p>
                      <p>रविवार: 10:00 AM - 6:00 PM</p>
                      <p className="text-green-600 font-medium mt-2">24*7 Support Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Distributors */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-orange-200 p-6">
                <div className="flex items-start space-x-4">
                  <Truck className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Distributors/Wholesellers</h3>
                    <p className="text-gray-600 text-sm mb-3">
                    Get your products on our platform! For larger orders and partnerships:
                    </p>
                    <a href="mailto:partners@myshopkirana.com" className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition inline-flex items-center">
                      partners@myshopkirana.com
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Emergency Support */}
              <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Emergency Support</h3>
                    <p className="text-gray-600 text-sm mb-3">
                     System down or data problem? Call immediately:
                    </p>
                    <a href="tel:+91-800-999-8888" className="text-red-600 font-bold text-lg hover:text-red-700 transition">
                      +91-800-999-8888
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for Contact */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Contact Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <details className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
              How long will it take to get a reply after sending a message?
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Email/form response within 24 hours. WhatsApp response within 2 hours.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
              How do I start a free trial?
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Just Register and Start Using</p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="bg-gray-900 text-white px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">MyShop</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-xs">
        Smart bill scanning and inventory management - built for Indian grocery stores.
              </p>
              <button 
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-6"
              >
            Register
              </button>
              <div className="flex space-x-3">
                {[ Smartphone, Globe, ShieldCheck].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition cursor-pointer">
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">features </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => navigate("/upload")} className="hover:text-white transition">Bill Scan</button></li>
                <li><button onClick={() => navigate("/inventory")} className="hover:text-white transition">Inventory Page</button></li>
                <li><button className="hover:text-white transition">Auto stock update</button></li>
                <li><button className="hover:text-white transition">Stocks</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button className="hover:text-white transition">Chat Support</button></li>
                <li><button className="hover:text-white transition">Call Support</button></li>
                <li><button className="hover:text-white transition">Community</button></li>
                <li><button className="hover:text-white transition">Status</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button className="hover:text-white transition">About Us</button></li>
                <li><button className="hover:text-white transition">Carrier</button></li>
                <li><button className="hover:text-white transition">Privacy</button></li>
                <li><button className="hover:text-white transition">Terms and Condition</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} MyShop, Inc. All rights reserved.</p>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;