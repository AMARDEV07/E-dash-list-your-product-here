import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

  // Component mount hone pe saare products fetch ho jaayenge
  useEffect(() => {
    getProducts();
  }, []);

  
  // Sare products backend se laa rahe hain
  
  const getProducts = async () => {
    const result = await fetch(`${backendUrl}/products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    
    const data = await result.json();
    setProducts(Array.isArray(data) ? data : data.products || []);
  };




  // Product delete karne wali function
  
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const response = await fetch(`${backendUrl}/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    const data = await response.json();

    if (data) {
      getProducts(); // Delete ke baad list refresh
    }
  };




  // Search bar ka handle function
  const searchHandle = async (e) => {
    let key = e.target.value;
    setSearchKey(key);

    if (key) {
      let result = await fetch(`${backendUrl}/search/${key}`,{
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
      
      if (result) {
        setProducts(result); // Search result show karo
      }
    } else {
      getProducts(); // Agar search khali ho gaya toh original list dikhao
    }
  };

  // Product detail page pe navigate karne ke liye
  const viewProductDetails = (id) => {
    navigate(`/product/${id}`);
  };
  

  return (
    <div className='product-div'>

      <div className='product-list-header'>
        <h1>Product List</h1>

        {/* Search input field */}
      
        <input 
          type="text" 
          placeholder='Search listed product' 
          value={searchKey}
          onChange={searchHandle} 
        />
      
      </div>


      {/* Table header */}
      <div className='product-list-header'>
        <ul className='product-list-ul'>
          <li><strong>Serial No</strong></li>
          <li><strong>Name</strong></li>
          <li><strong>Category</strong></li>
          <li><strong>Price</strong></li>
          <li><strong>Company</strong></li>
          <li><strong>Actions</strong></li>
        </ul>
      </div>

      {/* Products data */}
      <div className='product-list'>
        {products.length === 0 ? (
          <p>No products available....</p>
        ) : (
          products.map((product, index) => (
            <ul key={product._id}>
              <li>{index + 1}</li>

              {/* Name pe click karne se detail page khulta hai */}
              <li>
                <span 
                  className="product-name-link" 
                  onClick={() => viewProductDetails(product._id)}
                  style={{ cursor: 'pointer', color: 'black', }}
                >
                  {product.name}
                </span>
              </li>

              <li>{product.category}</li>
              <li>{product.price}</li>
              <li>{product.company}</li>
              <li>
                {/* Delete button */}
                {/* <button className='opration' onClick={() => deleteProduct(product._id)}>Delete</button> */}
                <i className="fa-solid fa-trash opration " onClick={() => deleteProduct(product._id)}></i>
                {/* Update link */}
                <Link to={`/update/${product._id}`}><i className="fa-solid fa-pen"></i></Link>

                {/* View details button (optional if user doesn't click name) */}
                <button className='view-details opration' onClick={() => viewProductDetails(product._id)}>
                  View Details
                </button>
            


              </li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsList;
