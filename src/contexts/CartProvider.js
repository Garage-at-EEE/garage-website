import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [userCredits, setUserCredits] = useState(() => {
        return JSON.parse(localStorage.getItem("userCredits")) || 0;
    });

    const [cartCount, setCartCount] = useState(() => {
        return JSON.parse(localStorage.getItem("cartCount")) || 0;
    });

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    });

    useEffect(() => {
        if (userCredits !== null && userCredits !== undefined) {
            localStorage.setItem("userCredits", JSON.stringify(userCredits));
        } else {
            localStorage.removeItem("userCredits");
        }
    }, [userCredits]);

    useEffect(() => {
        if (cartCount !== null && cartCount !== undefined) {
            localStorage.setItem("cartCount", JSON.stringify(cartCount));
        } else {
            localStorage.removeItem("cartCount");
        }
    }, [cartCount]);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems]);

    const setCredits = (credits) => {
        setUserCredits(credits);
    };

    const setCart = (count, items) => {
        setCartCount(count);
        setCartItems(items);
    };

    const clearCart = () => {
        setUserCredits(0);
        setCartCount(0);
        setCartItems([]);
        localStorage.removeItem("userCredits");
        localStorage.removeItem("cartCount");
        localStorage.removeItem("cartItems");
    };

    return (
    <CartContext.Provider value = {{ userCredits, cartCount, cartItems, setCredits, setCart, clearCart }}>
        {children}
    </CartContext.Provider>
    )
};

export default CartProvider;

export const useCart = () => {
    return useContext(CartContext);
}