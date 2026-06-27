import { Link } from "react-router-dom";
import type { Cart } from "../types";

interface Props {
    cart: Cart;
}

const CartSummary = ({ cart }: Props) => {
    return (
        <section>
            <h2>Cart summary</h2>
            <p>Subtotal: ${cart.subtotal.toFixed(2)}</p>
            <p>Shipping: ${cart.shipping.toFixed(2)}</p>
            <p>Total: ${cart.total.toFixed(2)}</p>
            {cart.items.length > 0 && (
                <Link to="/checkout">Checkout</Link>
            )}
        </section>
    );
};

export default CartSummary;
