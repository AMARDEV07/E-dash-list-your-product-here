import { useState } from 'react';
import API_CONFIG from '../config/api'; // Import the API config

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState("");
    const [specifications, setSpecifications] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const addProduct = async () => {
        // Basic validation check
        if (!name || !price || !category || !company) {
            setError(true);
            return; 
        }

        // Logged-in user ka ID localStorage se nikaal rahe hain
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        console.log("User ID is:", userId);

        // Features ko comma se split karke array bana rahe hain
        const featuresArray = features ? features.split(',').map(item => item.trim()) : [];
        
        // Specifications ko JSON me parse karne ki koshish
        let specsObject = {};
        try {
            specsObject = specifications ? JSON.parse(specifications) : {};
        } catch (err) {
            // Agar JSON nahi bana toh as a string object me daal diya
            specsObject = { details: specifications };
        }

        try {
            setLoading(true);
            // Backend ko POST request bhej rahe hain product details ke saath
            const result = await fetch(`${API_CONFIG.BASE_URL}/add-product`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    price,
                    category,
                    company,
                    userId,
                    description,
                    features: featuresArray,
                    specifications: specsObject,
                    imageUrl
                }),
                headers: API_CONFIG.getHeaders(),
                credentials: "include"
            });

<<<<<<< HEAD
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }
=======

        // Backend ko POST request bhej rahe hain product details ke saath

        const result = await fetch("https://e-dash-list-your-product-here-3.onrender.com/add-product", {
            method: "POST",
            body: JSON.stringify({
                name,
                price,
                category,
                company,
                userId,
                description,
                features: featuresArray,
                specifications: specsObject,
                imageUrl
            }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
              
            },
               credentials:"include"
>>>>>>> d5b3afac5a2ae52b574159e3f4762e8bd9dff699

            const data = await result.json();
            console.log("Product added:", data);
            
            // Clear the form and show success message
            setName("");
            setPrice("");
            setCategory("");
            setCompany("");
            setDescription("");
            setFeatures("");
            setSpecifications("");
            setImageUrl("");
            setError(false);
            setSuccess(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
            
        } catch (error) {
            console.error("Error adding product:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='add-product-main'>
            <div className='add-product-header'>
                <h1>Add Product</h1>
            </div>

            {success && (
                <div className="success-message">
                    Product added successfully!
                </div>
            )}

            <div className='add-product-inp-div'>
                {/* Product ka naam input */}
                <input
                    type="text"
                    placeholder="Enter product name"
                    className='InputBox'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span className='invalid-input'>Enter valid name...</span>}

                {/* Product ka price input */}
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

                {/* Product specifications input (JSON ya normal text) */}
                <textarea
                    placeholder="Enter specifications (JSON format preferred or normal)"
                    className='InputBox'
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    style={{ height: '100px' }}
                />

                {/* Product image ka URL input */}
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
                    className='addbtn' 
                    onClick={addProduct}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </div>
        </div>
    );
}

export default AddProduct;