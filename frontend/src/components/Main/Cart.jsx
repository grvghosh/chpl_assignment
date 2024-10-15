// Cart.js
import { useState, useEffect } from "react";

const Cart = () => { // changed here
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from localStorage or API
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(items);
    }, []);

    const handlePlaceOrder = () => {
        if (cartItems.length > 0) {
            alert('Order placed successfully!');
            setCartItems([]);
            localStorage.removeItem("cart");
        } else {
            alert('Add items to cart to place order.');
        }
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.map((item) => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    return (
        <div style={{ background: '#f5f5f5', padding: '20px' }}>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {cartItems.map((item) => (
                            <li
                                key={item.productId}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '15px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '40px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                />
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.title}</span>
                                <h2 style={{ display: 'inline-block', marginLeft: '10px', color: '#555' }}>({item.quantity})</h2>

                                <button
                                    onClick={() => handleRemoveFromCart(item.productId)}
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        padding: '8px 12px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        right: '20px',
                                        bottom: '10px',
                                    }}
                                >
                                    Remove
                                </button>

                                <div style={{ height: '3px', background: '#ff4d4d', marginTop: '10px' }}></div>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handlePlaceOrder}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '15px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            textAlign: 'center',
                        }}
                    >
                        Place Order
                    </button>
                </>
            ) : (
                <p>No items in cart</p>
            )}
        </div>

    );
};


export default Cart;

