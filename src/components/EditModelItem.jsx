import { useState } from "react"
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";

const EditModel = () => {
    const [editItemId, setEditItemId] = useState(null);
const [editItemName, setEditItemName] = useState("");
 const [items , setItems ] = useState([])

const handleEditItem = (item) =>{
    setEditItemId(item._id);
    setEditItemName(item.itemName);
}
const saveEdittedName = async() =>{
    try {
        await axiosInstance.put(`/inventory/update${editItemId}`,{itemName:editItemName})
        setItems(prev => prev.map(item=>item._id === editItemId ?{...item , itemName : editItemName} : item))
          setEditItemId(null);
    setEditItemName("");
    toast.success("Item updated");
    } catch (error) {
            toast.error("Failed to update item");

        
    }
}
  return (
    <div></div>
  )
}

export default EditModel