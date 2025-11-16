import React, { useState } from 'react'
import axiosInstance from '../utlis/axiosinstance';
import toast from 'react-hot-toast';

const EditModelCat = () => {
    const [editCatId , seteditCatId] = useState(null);
    const [items , setItems ] = useState([])
    const [editCatName ,seteditCatName ] = useState("");

const handleCatEdit = (cat) =>{
    seteditCatId(cat._id);
    seteditCatName(cat.name);

}
const saveCategoryEdit = async() =>{
    try {
    await axiosInstance.put(`/categories/edit/${editCatId}`, {name:editCatName});
    setItems(prev => prev.map(item=> item.category._id === editCatId ? {...item , category :{...item.category , name:editCatName}} :item))
    seteditCatId(null);
    seteditCatName("");
    toast.success("Category updated");
  } catch (error) {
    toast.error("Failed to update category");
  }
} 


  return (
    <div></div>
  )
}

export default EditModelCat