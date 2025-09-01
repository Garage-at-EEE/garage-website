import { useContext, createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [userCredits, setUserCredits] = useState();
    const [cartCount, setCartCount] = useState();
    const [cartItems, setCartItems] = useState([]);

    const setCredits = (credits) => {
        setUserCredits(credits);
    };

    const setCart = (count, items) => {
        setCartCount(count);
        setCartItems(items);    // contains item names, quantities, and unit prices
    };

    return (
    <CartContext.Provider value = {{ userCredits, cartCount, cartItems, setCredits, setCart }}>
        {children}
    </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => {
    return useContext(CartContext);
}