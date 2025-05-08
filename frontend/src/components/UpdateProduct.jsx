import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_CONFIG from '../config/api'; // Import the API config like other components

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const params = useParams();

  // Fetch current product details once component loads
  useEffect(() => {
    getProductDetails();
  }, []);

  // Fetch the product details
  const getProductDetails = async () => {
    try {
      setLoading(true);
      const result = await fetch(`${API_CONFIG.BASE_URL}/product/${params.id}`, {
        headers: API_CONFIG.getHeaders()
      });
      
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      
      const data = await result.json();
      
      // Populate form with existing data
      setName(data.name || "");
      setPrice(data.price || "");
      setCategory(data.category || "");
      setCompany(data.company || "");
      setDescription(data.description || "");
      
      // Handle features array
      if (data.features && Array.isArray(data.features)) {
        setFeatures(data.features.join(', '));
      }
      
      // Handle specifications object
      if (data.specifications) {
        if (typeof data.specifications === 'object') {
          setSpecifications(JSON.stringify(data.specifications, null, 2));
        } else {
          setSpecifications(data.specifications);
        }
      }
      
      setImageUrl(data.imageUrl || "");
      
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Update the product
  const updateProduct = async () => {
    // Basic validation
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    // Process features into array
    const featuresArray = features ? features.split(',').map(item => item.trim()) : [];
    
    // Process specifications into object
    let specsObject = {};
    try {
      specsObject = specifications ? JSON.parse(specifications) : {};
    } catch (err) {
      specsObject = { details: specifications };
    }

    try {
      setLoading(true);
      
      const result = await fetch(`${API_CONFIG.BASE_URL}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ 
          name, 
          price, 
          category, 
          company,
          description,
          features: featuresArray,
          specifications: specsObject,
          imageUrl
        }),
        headers: API_CONFIG.getHeaders(),
        credentials: "include"
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      
      if (data) {
        setSuccess(true);
        // Navigate back to products page after short delay
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !name) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className='add-product-main'>
      <div className='add-product-header'>
        <h1>Update Product</h1>
      </div>

      {success && (
        <div className="success-message">
          Product updated successfully! Redirecting...
        </div>
      )}

      <div className='add-product-inp-div'>
        {/* Product name input */}
        <input
          type="text"
          placeholder="Enter product name"
          className='InputBox'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className='invalid-input'>Enter valid name...</span>}

        {/* Product price input */}
        <input
          type="text"
          placeholder="Enter product price"
          className='InputBox'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className='invalid-input'>Enter valid price...</span>}

        {/* Product category input */}
        <input
          type="text"
          placeholder="Enter product category"
          className='InputBox'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className='invalid-input'>Enter valid category...</span>}

        {/* Company name input */}
        <input
          type="text"
          placeholder="Enter company name"
          className='InputBox'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className='invalid-input'>Enter valid company...</span>}

        {/* Product description input (textarea) */}
        <textarea
          placeholder="Enter detailed product description"
          className='InputBox'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ height: '100px' }}
        />

        {/* Product features input (comma separated) */}
        <input
          type="text"
          placeholder="Enter features (comma-separated)"
          className='InputBox'
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />

        {/* Product specifications input (JSON or normal text) */}
        <textarea
          placeholder="Enter specifications (JSON format preferred or normal)"
          className='InputBox'
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          style={{ height: '100px' }}
        />

        {/* Product image URL input */}
        <input
          type="text"
          placeholder="Enter product image URL"
          className='InputBox'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className='add-product-btn-div'>
        <button 
          className='updatebtn' 
          onClick={updateProduct} 
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;