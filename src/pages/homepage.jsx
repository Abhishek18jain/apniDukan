import { useNavigate } from "react-router-dom";
import { Upload, ListCheck, Package, Tags, Settings, User } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { name: "Upload Bill", icon: Upload, path: "/upload" },
    { name: "Review Items", icon: ListCheck, path: "/review/sample" },
    { name: "Inventory", icon: Package, path: "/inventory" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* MAIN TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Inventory Scanner
      </h1>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">

        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="
                bg-white p-6 rounded-2xl shadow-md 
                flex flex-col items-center justify-center text-center
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1 active:scale-95
                cursor-pointer
              "
            >
              <Icon className="w-10 h-10 text-indigo-600 mb-3" />
              <p className="text-gray-800 font-semibold text-sm">{feature.name}</p>
            </div>
          );
        })}

      </div>

      {/* FOOTER */}
      <p className="text-center text-gray-400 text-xs mt-10">
        © {new Date().getFullYear()} Inventory Scanner
      </p>
    </div>
  );
};

export default Home;
