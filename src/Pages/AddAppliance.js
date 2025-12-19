import "./../Styles/AddAppliance.css";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

const AddAppliance = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "New AC Unit",
      category: "Air Conditioner",
      price: 500,
      image: "https://via.placeholder.com/300",
      description: "Fast cooling and energy efficient."
    }});
  const { data, setData } = useOutletContext(); 

  const onSubmit = (appliance) => {
    console.log("Form submitted:", appliance); 

    const newAppliance = {
      id: data.length + 1,
      ...appliance,
    };

    setData([...data, newAppliance]); 
    alert("Appliance added successfully ✅");
    reset();
  };

  return (
    <div className="addAppliancePage">
      <h2>Add New Appliance</h2>
      <form className="addApplianceForm" onSubmit={handleSubmit(onSubmit)}>
        <label>Appliance Name</label>
        <input type="text" {...register("name", { required: true })} />

        <label>Category</label>
        <input type="text" {...register("category", { required: true })} />

        <label>Price</label>
        <input type="number" {...register("price", { required: true })} />

        <label>Image URL</label>
        <input type="text" {...register("image", { required: true })} />

        <label>Description</label>
        <textarea {...register("description", { required: true })}></textarea>

        <button type="submit">Add Appliance</button>
      </form>
    </div>
  );
};

export default AddAppliance;
