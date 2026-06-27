import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
    return (
        <div>
            <h1>Order Successful</h1>

            <p>
                Thank you for your purchase.
            </p>

            <Link to="/catalog">Continue shopping</Link>
        </div>
    );
};

export default OrderSuccessPage;
