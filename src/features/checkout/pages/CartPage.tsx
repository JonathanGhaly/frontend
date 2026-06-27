import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
    const cart = useCart();

    if (cart.items.length === 0) {
        return (
            <div>
                <h1>Cart</h1>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Cart</h1>
            <CartList items={cart.items} />

            <CartSummary cart={cart} />
        </div>
    );
};

export default CartPage;
