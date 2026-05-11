import API from "../api";

function CartPage({ cart, removeFromCart }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {
  try {
    const token =
      localStorage.getItem("token");

    // CREATE PAYMENT ORDER
    const { data } = await API.post(
      "/payments/create-order",
      {
        amount: totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // OPEN RAZORPAY
    const options = {
      key: "rzp_test_SoDDzdwM4qF5QE",

      amount: data.amount,

      currency: data.currency,

      name: "FoodExpress",

      description: "Food Order Payment",

      order_id: data.id,

      handler: async function (
        response
      ) {
        // SAVE ORDER AFTER PAYMENT
        await API.post(
          "/orders",
          {
            items: cart,
            total: totalPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Payment Successful & Order Placed"
        );
      },

      theme: {
        color: "#111",
      },
    };

    const razor = new window.Razorpay(
      options
    );

    razor.open();
  } catch (error) {
    console.log(error);

    alert("Payment Failed");
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >
              <div>
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>

          <button
            onClick={placeOrder}
            style={{
              marginTop: "20px",
              padding: "15px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;