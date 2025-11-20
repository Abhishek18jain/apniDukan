import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UploadCloud,

  Package,

  ShieldCheck,
  Smartphone,
 
  CheckCircle2,
  ChevronRight,
  Play,
  ArrowRight,
 
  Globe,

  Building2,
  Menu,
  X,
 
  Shield,
  Sparkles,
  Receipt,
  Phone,
  Mail,

  FileText,
  Grid3x3,
  Truck,
  AlertTriangle,
  Store,
 
} from "lucide-react";
const Camera = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const features = [
    { icon: FileText, title: "Old and New Bill", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Camera, title: "Take Photo, Update Stock", color: "text-green-600", bg: "bg-green-50" },
    { icon: Package, title: "Auto Stock Update", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: Grid3x3, title: "Category", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Truck, title: "Auto Scans Bll", color: "text-red-600", bg: "bg-red-50" },
    { icon: AlertTriangle, title: "Low Stocks Alert", color: "text-indigo-600", bg: "bg-indigo-50" }
  ];

  const faqs = [
   { q: "How do I scan a bill?", a: "Just tap 'Upload Bill' or take a photo in the mobile app. Our OCR AI automatically extracts the item name, quantity, price and HSN code." },
    { q: "Does it support GST bills?", a: "Absolutely! GST number, HSN code, tax rates are auto-populated. Generate reports for GSTR-1 filing." },


  { q: "How do I track the expiry date?", a: "Auto remove from the bill or add manually. The system will alert 30 days in advance - 'Item is about to expire!'" },
   
{ q: "Can I use it in Hindi?", a: "Yes! The entire app is available in Hindi, English and 5+ Indian languages." }
  ];

 const steps = [
{ num: 1, title: "Scan Bill", desc: "Take a photo of a supplier's bill/invoice - OCR auto-extracts items, quantities, and rates. GST bills are also supported." },
{ num: 2, title: "Check and categorize", desc: "AI suggests categories for pulses, rice, and spices. Edit to suit your store." },
{ num: 3, title: "Stock will auto-update", desc: "Stock will be updated on the Inventory page as soon as it is approved. Sales will also be tracked." }
  ];

  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">  Bill Scanning with OCR </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
Scan Bill      and          <span className="block text-blue-600">Update Your Inventory.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
No need to enter every bill by hand! MyShop's OCR auto-extracts items, quantities, and prices from supplier bills - saving you time and reducing errors.

              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => navigate("/upload")}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>Try Demo</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition">
                  <Play className="w-5 h-5" />
                  <span>2-Minute Demo</span>
                </button>
              </div>

              {/* Feature badges */}
              <div className="grid grid-cols-3 gap-4">
                {["Fast", "Hindi & English", "Easy to use"].map((badge, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96 bg-gray-900 rounded-3xl shadow-2xl p-4">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative mt-4">
                  <div className="bg-blue-600 text-white p-4 text-center border-b border-blue-700">
                    <h3 className="font-semibold text-sm">OCR Scanning...</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Receipt Card 1 - Kirana Bill */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Vardhman Kirana Store</p>
                          <p className="text-xs text-gray-500">GSTIN: 27ABCDE1234F1Z5</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Scanned</span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between text-gray-700">
                          <span>Rice</span>
                          <span>₹325.00</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Sugar</span>
                          <span>₹180.00</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Oil</span>
                          <span>₹120.00</span>
                        </div>
                         <div className="flex justify-between text-gray-700">
                          <span>Maggie</span>
                          <span>₹195.00</span>
                        </div>
                      
                      </div>
                    </div>

                    {/* Receipt Card 2 - Inventory Update */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Inventory Updated</p>
                          <p className="text-xs text-gray-500">All Items Updated </p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Done</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Icons Grid */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                  <div className={`${feature.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                    <Icon className={`${feature.color} w-7 h-7`} />
                  </div>
                  <p className="text-sm text-gray-700 font-medium leading-tight">{feature.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How it works:</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
           
No more paper bills and manual entries! Stock updates in just three steps:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center group">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl font-bold">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcases */}
      <section className="px-6 py-20 bg-white space-y-24">
        {/* Feature 1: Scan & Auto-Inventory */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
           Scan your bill. Stock auto-updates. That's it!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
           Extract items, quantities, and prices directly from supplier invoices. Whether it's a serialized paper bill or a PDF, OCR reads it all!

            </p>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">No Manual Entry</p>
                  <p className="text-gray-600">99% accurate OCR data auto extract - dal, rice, oil all!
</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Auto Update Support</p>
                  <p className="text-gray-600">OCR made it easy</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Expiry Date Alert</p>
                  <p className="text-gray-600">You will receive an alert 30 days in advance regarding the bill due date</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Jain Kirana Store</p>
                    <p className="text-xs text-gray-500">Scanning...</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-medium">Place Your Bill here</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <p className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>10 Items Have been detected</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Stocks are ready to Update!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Inventory Management */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Control Inventory Digitally</h3>
            <p className="text-gray-600 mb-8 text-lg">
Edit, delete, or update each item. Create categories – cereals, spices, oils, biscuits. View real-time stock.
            </p>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Inventory Page</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Live</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Item</p>
                    <p className="font-medium">1,247</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Low Stock Alert</p>
                    <p className="font-medium text-red-600">23 Items</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600"><strong>Category Management:</strong> Pulses, Rice, Spices, Oils, Biscuits - Create custom categories.</p>. <p>Create categories - Grains, Spices, Oils, Biscuits. View real-time stock.
                </p>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-gray-900">Inventory Dashboard</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Updated</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Rice</span>
                    <span className="font-semibold text-gray-900">Instock</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 text-orange-600 bg-orange-50 px-2 rounded">
                    <span className="font-medium">Sugar</span>
                    <span className="font-semibold">Low Stock ⚠️</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Sarso Oil</span>
                    <span className="font-semibold text-gray-900">Instock</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Biscuit</span>
                    <span className="font-semibold text-gray-900">Instock</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700">
                    <span className="font-semibold">✓ OCR </span> Added 10 New Items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Multi-format Support */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Supports Each Type Of Bill</h3>
            <p className="text-gray-600 mb-8 text-lg">
             
From the old serial bill to PDF. Supplier's electronic bill or digital invoice - read.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Receipt, title :"Printed Bill", desc: "Also includes folded and torn bills" },
{ icon: Mail, title: "Email/PDF", desc: "Also via WhatsApp" },
{ icon: Truck, title: "Distributor Bill", desc: "Bulk Order" },
{ icon: Building2, title: "GST Invoice", desc: "Includes HSN Code" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100">
                  <item.icon className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-sm">Recent Bill</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Forwarded to:</p>
                  <p className="font-semibold text-gray-900">Laxman Rao Bill.pdf</p>
                  <p className="text-xs text-gray-500">15 Items </p>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">Auto Process:</span> All Items Added to Inventory
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-xs text-gray-500">
                  <div className="bg-gray-100 rounded p-2 text-center">📄 PDF</div>
                  <div className="bg-gray-100 rounded p-2 text-center">📷 Photo</div>
                  <div className="bg-gray-100 rounded p-2 text-center">📧 Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: GST & Multi-language */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Supports Hindi and English</h3>
            <p className="text-gray-600 mb-8 text-lg">
            Auto-remove HSN codes and tax from bills. Use the entire app in Hindi and English. Designed for Indian shopkeepers.

            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Hindi InterFace</p>
                  <p className="text-gray-600">Complete app in Hindi, Marathi, Tamil, Telugu and English</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Digital Shop</p>
                  <p className="text-gray-600">Secured and Safe Inventory Management</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-gray-900">Items</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">HSN</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Wheat - HSN 1006</span>
                    <span>₹500.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sugar- HSN 0907</span>
                    <span>₹300.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                    <span>टोटल</span>
                    <span className="text-blue-600">₹800.00</span>
                  </div>
                
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Language:</span> English
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">GSTIN:</span> 27ABCDE1234F1Z5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 5: Low Stock Alerts */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Auto Low Stock Alert</h3>
            <p className="text-gray-600 mb-8 text-lg">

Get automatic SMS/WhatsApp alerts when an item is about to run out. Set reorder points and never run out of stock.            </p>
            <div className="bg-white rounded-lg p-4 shadow-md border border-orange-200">
              <div className="flex items-start space-x-3 justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-800">Low Stock Alert</p>
                  <p className="text-sm text-orange-700 mt-1">3 items exceeded reorder level
</p>
                  <div className="mt-2 text-s text-gray-600 space-y-1">
                    <p>• Sugar - Out of Stocks </p>
                    <p>• Oil - Out of Stocks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-gray-900">Low Stock List</p>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Urgent</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700 bg-red-50 p-2 rounded">
                    <span>Moong Daal🚨</span>
                    <span className="line-through text-red-600">2 Days Ago</span>
                  </div>
                  <div className="flex justify-between text-gray-700 bg-yellow-50 p-2 rounded">
                    <span>Sarso Oil ⚠️</span>
                    <span>3 Days Ago</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sugar</span>
                    <span>1 Day Ago</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900 mt-2">
                    <span>Re-Order?</span>
                    <span className="text-blue-600">Check Once More</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-700">
                    <span className="font-semibold">Auto alert:</span> Items Fetched Successfully
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Question</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <summary className="cursor-pointer list-none p-6 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to digitize your shop?</h2>
          <p className="text-xl text-blue-100 mb-8">
              Watch in 2 minutes how stock gets auto updated by scanning the bill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/upload")}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <UploadCloud className="w-5 h-5" />
              <span>try Demo</span>
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-800 active:scale-95 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Register</span>
              <ArrowRight className="w-5 h-5" />
            </button>
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
export default Home;
