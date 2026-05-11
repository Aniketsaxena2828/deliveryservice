import { useEffect, useState } from "react";
import API from "../api";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageFile: null,
  });

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      // IMAGE FORM DATA
      const formData = new FormData();

      formData.append(
        "image",
        product.imageFile
      );

      // UPLOAD IMAGE TO CLOUDINARY
      const uploadRes = await API.post(
        "/upload",
        formData
      );

      const imageUrl =
        uploadRes.data.imageUrl;

      // CREATE PRODUCT
      await API.post(
        "/products",
        {
          name: product.name,
          price: product.price,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added");

      // RESET FORM
      setProduct({
        name: "",
        price: "",
        imageFile: null,
      });

      // REFRESH PRODUCTS
      fetchProducts();
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await API.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Admin Panel
      </h1>

      {/* ADD PRODUCT FORM */}
      <form
        onSubmit={addProduct}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
          marginBottom: "50px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProduct({
              ...product,
              imageFile: e.target.files[0],
            })
          }
          required
        />

        <button
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Add Product
        </button>
      </form>

      {/* PRODUCTS LIST */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              padding: "20px",
              width: "250px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h3 style={{ marginTop: "15px" }}>
              {item.name}
            </h3>

            <p
              style={{
                margin: "10px 0",
                fontWeight: "bold",
              }}
            >
              ₹{item.price}
            </p>

            <button
              onClick={() =>
                deleteProduct(item._id)
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;