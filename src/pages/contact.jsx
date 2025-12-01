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
  Smartphone,
  Globe,
  ShieldCheck,
  User,
  AlertCircle
} from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    message: "",
    inquiryType: "general",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        shopName: "",
        phone: "",
        email: "",
        message: "",
        inquiryType: "general",
      });
    }, 2500);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#0f1217] text-gray-200">

      {/* HERO */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center bg-[#1a1d23] border border-[#2a2e36] px-4 py-1 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-300">24/7 Kirana Support</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4">
            Contact Us  
            <span className="block text-yellow-500">We're here to help</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Any questions? Need help? Reach out via call, WhatsApp, or email.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {/* Phone */}
          <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">
            <div className="w-16 h-16 bg-[#161a20] border border-[#2a2e36] rounded-full flex items-center justify-center mb-4">
              <Phone className="w-7 h-7 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Phone Support</h3>
            <p className="text-gray-400 text-sm mb-4">9 AM – 9 PM</p>
            <a 
              href="tel:+91-800-123-4567"
              className="text-yellow-500 font-semibold text-lg hover:text-yellow-400"
            >
              +91-800-123-4567
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">
            <div className="w-16 h-16 bg-[#161a20] border border-[#2a2e36] rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">WhatsApp</h3>
            <p className="text-gray-400 text-sm mb-4">24/7 Instant Chat</p>
            <a
              href="https://wa.me/918001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 font-semibold text-lg hover:text-green-400 flex items-center"
            >
              +91-800-123-4567
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">
            <div className="w-16 h-16 bg-[#161a20] border border-[#2a2e36] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Email</h3>
            <p className="text-gray-400 text-sm mb-4">Detailed inquiries</p>
            <a 
              href="mailto:support@myshopkirana.com"
              className="text-purple-400 font-semibold hover:text-purple-300"
            >
              support@myshopkirana.com
            </a>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mt-16 bg-[#1a1d23] border border-[#2a2e36] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">
            Need Help Now?
          </h3>
          <p className="text-gray-400 mb-6">Contact us immediately through call or WhatsApp.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+91-800-123-4567" className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400">
              Call Now
            </a>

            <a 
              href="https://wa.me/918001234567"
              target="_blank"
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Send Message</h2>

            {submitted ? (
              <div className="bg-[#161a20] border border-green-600 rounded-xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-500">Message Sent!</h3>
                <p className="text-gray-300 text-sm mt-1">We’ll reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NAME */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Your Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      placeholder="Ramesh Kumar"
                    />
                  </div>
                </div>

                {/* SHOP */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Shop Name</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      placeholder="Vardhman Kirana Store"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      placeholder="+91-9876543210"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* TYPE */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Type of Question</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  >
                    <option value="general">FAQ</option>
                    <option value="technical">Technical Help</option>
                    <option value="billing">Billing / Payment</option>
                    <option value="distributor">Add Distributor</option>
                    <option value="gst">GST Support</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#161a20] border border-[#2a2e36] text-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                    placeholder="Write your message..."
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            {/* ADDRESS */}
            <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">Office Address</h3>
                  <p className="text-gray-400 text-sm">
                    MyShop Kirana, Inc.<br />
                    123, Business Park, Tech Hub<br />
                    Bengaluru, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* WORKING HOURS */}
            <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Work Time</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Mon–Sat: 9:00 AM – 9:00 PM<br />
                    Sun: 10:00 AM – 6:00 PM
                  </p>
                  <p className="text-green-500 text-sm font-semibold mt-2">
                    24/7 Support Available
                  </p>
                </div>
              </div>
            </div>

            {/* DISTRIBUTORS */}
            <div className="bg-[#1a1d23] border border-yellow-600 rounded-xl p-6">
              <div className="flex gap-4">
                <Truck className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Distributors / Wholesalers</h3>
                  <p className="text-gray-400 text-sm mt-2 mb-3">
                    Want to list your products? Contact our partnership team.
                  </p>
                  <a
                    href="mailto:partners@myshopkirana.com"
                    className="text-yellow-500 font-semibold hover:text-yellow-400 flex items-center"
                  >
                    partners@myshopkirana.com
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* EMERGENCY */}
            <div className="bg-[#1a1d23] border border-red-600 rounded-xl p-6">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Emergency Support</h3>
                  <p className="text-gray-400 text-sm mt-2 mb-3">
                    System down or data issue? Call instantly.
                  </p>
                  <a
                    href="tel:+91-800-999-8888"
                    className="text-red-500 font-bold text-lg hover:text-red-400"
                  >
                    +91-800-999-8888
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-100 text-center mb-10">
            Contact Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <details className="bg-[#1a1d23] border border-[#2a2e36] p-5 rounded-lg cursor-pointer">
              <summary className="text-gray-100 font-semibold flex justify-between items-center">
                How long does a response take?
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </summary>
              <p className="text-gray-400 mt-2 text-sm">
                Email replies within 24 hrs. WhatsApp replies within 1–2 hrs.
              </p>
            </details>

            <details className="bg-[#1a1d23] border border-[#2a2e36] p-5 rounded-lg cursor-pointer">
              <summary className="text-gray-100 font-semibold flex justify-between items-center">
                How do I start a free trial?
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </summary>
              <p className="text-gray-400 mt-2 text-sm">
                Just register and start using the platform instantly.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0f13] text-gray-400 px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xl text-gray-100">MyShop</span>
              </div>

              <p className="text-gray-400 mb-6 max-w-xs">
                Smart bill scanning and inventory management for Indian Kirana stores.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition mb-6"
              >
                Register
              </button>

              <div className="flex space-x-3">
                {[Smartphone, Globe, ShieldCheck].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#161a20] border border-[#2a2e36] rounded-lg flex items-center justify-center hover:bg-[#1d2229]"
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-100 mb-4">Features</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate("/upload")} className="hover:text-yellow-500">Bill Scan</button></li>
                <li><button onClick={() => navigate("/inventory")} className="hover:text-yellow-500">Inventory</button></li>
                <li><button className="hover:text-yellow-500">Auto Stock Update</button></li>
                <li><button className="hover:text-yellow-500">Stocks</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-100 mb-4">Help</h4>
              <ul className="space-y-3 text-sm">
                <li><button className="hover:text-yellow-500">Chat Support</button></li>
                <li><button className="hover:text-yellow-500">Call Support</button></li>
                <li><button className="hover:text-yellow-500">Community</button></li>
                <li><button className="hover:text-yellow-500">Status</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-100 mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><button className="hover:text-yellow-500">About Us</button></li>
                <li><button className="hover:text-yellow-500">Careers</button></li>
                <li><button className="hover:text-yellow-500">Privacy</button></li>
                <li><button className="hover:text-yellow-500">Terms</button></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-[#2a2e36] pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MyShop, Inc. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Contact;
