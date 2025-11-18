import { useNavigate } from "react-router-dom";
import axiosInstance from "../utlis/axiosinstance";
import { useState } from "react";
const UploadBill = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Upload a file first");

    const form = new FormData();
    form.append("bill", file);

    const res = await axiosInstance.post("/bill/upload", form);

    navigate(`/review/${res.data.billId}`);
    console.log("navigated")
  };

  return (
    <div>
      <h2>Upload Bill</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload} >Upload Bill</button>
    </div>
  );
};

export default UploadBill;
