import { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { products } from "./data";
import { CartContext } from "./CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Select Size");
  const { addToCart, cartCount } = useContext(CartContext);

  const handleAddToCart = () => {
    if (size === "Select Size") {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product, quantity, size);
    navigate("/cart");
  };

  if (!product)
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#fff" }}>
        <h2>Product not found!</h2>
        <Link
          to="/products"
          className="btn"
          style={{ marginTop: "2rem", display: "inline-block" }}
        >
          Back to Products
        </Link>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="small-container single-product">
        <div className="row">
          <div className="col-2">
            <img src={product.images[0]} width="100%" alt={product.name} />
          </div>
          <div className="col-2">
            <p className="breadcrumb">Home / {product.category}</p>
            <h1>{product.name}</h1>
            <h4 id="product-price">${product.price.toFixed(2)}</h4>

            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option>Select Size</option>
              {product.category === "Shoes" ? (
                <>
                  <option>US 7</option>
                  <option>US 8</option>
                  <option>US 9</option>
                  <option>US 10</option>
                  <option>US 11</option>
                </>
              ) : product.category === "Smart Band" ? (
                <>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </>
              ) : (
                <>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </>
              )}
            </select>

            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <button
              className="btn"
              onClick={handleAddToCart}
              style={{
                display: "inline-block",
                margin: "1rem 0",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add To Cart <i className="fas fa-shopping-cart"></i>
            </button>

            <h3>
              Product Details <i className="fa fa-indent"></i>
            </h3>
            <br />
            <p>{product.description}</p>

            {product.features && (
              <div id="product-features">
                <h4>Key Features:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
