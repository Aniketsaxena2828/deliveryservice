import { useEffect, useState } from "react";
import API from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Order History
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Total: ₹{order.total}</h3>

            <p>
              Date:
              {" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <div style={{ marginTop: "15px" }}>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <strong>{item.name}</strong>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;