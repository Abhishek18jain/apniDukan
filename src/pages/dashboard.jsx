import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
   
      const res = await axiosInstance.get("/profile/dashboard");
      setData(res.data) ;
     
    } catch (error) {
      toast.error("Failed to load dashboard Data");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchDashboardData();
    }, []);
    
    if (loading) {
      return <p className=" text-center text-grey-500">Loading...</p>;
    }
    if(!data){
       return <p className="text-center text-red-500">No data available.</p>;
    }
  return (
    <div>
      <h2>Dashboard Overview</h2>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-semibold">👤 User Info</h3>
        <p>
          <span className="font-medium">Name:</span> {data.user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {data.user.email}
        </p>
        <p>
          <span className="font-medium">Shop:</span> {data.user.shopName}
        </p>
      </div>
<div>
    <h4>total items : <span>{data.stats.totalItems}</span> </h4>
</div>
<div>
    <h4>items not ordered in 7 : {data.stats.notOrdered7}</h4>
    <h4>items not ordered in 15 : {data.stats.notOrdered15 }</h4>
    
</div>


    </div>
  );
};

export default Dashboard;
