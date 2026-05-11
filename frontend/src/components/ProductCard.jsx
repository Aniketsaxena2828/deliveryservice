function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        width: "260px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "15px" }}>
        <h3>{product.name}</h3>

        <p
          style={{
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;