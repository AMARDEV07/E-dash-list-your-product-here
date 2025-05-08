import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);




  const getProductDetails = async () => {

    
    try {
      setLoading(true);
      const result = await fetch(`http://localhost:3000/product/${params.id}`,{
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const data = await result.json();
      
      setProduct(data);
      
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-detail-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="product-detail-error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h1>{product.name}</h1>
        <p className="product-company">By {product.company}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-price">Price: ${product.price}</p>
      </div>

      {product.imageUrl && (
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      )}

      {product.description && (
        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
      )}

      {product.features && product.features.length > 0 && (
        <div className="product-features">
          <h2>Key Features</h2>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="product-specifications">
          <h2>Specifications</h2>
          <table>
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="spec-name">{key}</td>
                  <td className="spec-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="product-actions">
        <Link to="/" className="back-button">Back to Products</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
