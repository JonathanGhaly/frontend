import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import PaymentSummary from "../components/PaymentSummary";
import { useCart } from "../hooks/useCart";

const CheckoutPage = () => {
    const cart = useCart();

    if (cart.items.length === 0) {
        return (
            <div>
                <h1>Checkout</h1>
                <p>Your cart is empty.</p>
                <Link to="/catalog">Browse products</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Checkout</h1>

            <CheckoutForm />
            <PaymentSummary cart={cart} />
        </div>
    );
};

export default CheckoutPage;
