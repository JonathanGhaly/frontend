import type { Cart } from "../types";

interface Props {
    cart: Cart;
}

const PaymentSummary = ({
    cart,
}: Props) => {
    return (
        <div>
            <h2>Payment Summary</h2>

            <p>Total Items: {cart.items.length}</p>

            <h3>${cart.total.toFixed(2)}</h3>
        </div>
    );
};

export default PaymentSummary;
