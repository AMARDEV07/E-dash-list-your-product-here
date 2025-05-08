import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

  // Fetch current product details once component loads
  useEffect(() => {
    getUpdateDetails();
  }, []);



  
  // get signle page details 

  const getUpdateDetails = async () => {

    
      const result = await fetch(`${backendUrl}/product/${params.id}`,{
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const data = await result.json();
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setCompany(data.company);
   
  };

  // update api 

  const addProduct = async () => {
  
      const result = await fetch(`${backendUrl}/product/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        //we found data in json so we change them into  stringfy..
        body: JSON.stringify({ name, price, category, company })
      });

      const data = await result.json();

      navigate('/'); // redirect to product list
    
  };

  return (
    <div className='add-product-main'>
      <div className='add-product-header'>
        <h1>Update Product</h1>
      </div>

      <div className='add-product-inp-div'>
        <input
          type="text"
          placeholder="Enter product name"
          className='InputBox'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product price"
          className='InputBox'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product category"
          className='InputBox'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter company name"
          className='InputBox'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className='add-product-btn-div'>
        <button className='updatebtn' onClick={addProduct}>Update Product</button>
      </div>
    </div>
  );
}

export default UpdateProduct;
