import { useParams } from "react-router-dom";
import { useAdminOrder } from "../hooks/useAdminOrders";
import {
    OrderStatus,
    orderStatusLabels,
} from "../types";
import styles from "../../../components/Layout/Layout.module.css";

const AdminOrderDetailsPage = () => {
    const { id = "" } = useParams();
    const { data: order, isLoading } = useAdminOrder(id);

    if (isLoading) {
        return <p>Loading order...</p>;
    }

    if (!order) {
        return <p>Order not found.</p>;
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>{order.orderId ?? order.id}</h1>

            <section className={styles.section}>
                <div className={styles.orderSummaryRow}>
                    <div>
                        <p className={styles.cardFieldLabel}>Order date</p>
                        <p className={styles.cardFieldValue}>
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
                        </p>
                    </div>
                    <div>
                        <p className={styles.cardFieldLabel}>Status</p>
                        <p className={styles.cardFieldValue}>
                            {orderStatusLabels[order.status ?? OrderStatus.Pending]}
                        </p>
                    </div>
                    <div>
                        <p className={styles.cardFieldLabel}>Total</p>
                        <p className={styles.cardFieldValue}>
                            ${(order.total ?? 0).toFixed(2)}
                        </p>
                    </div>
                </div>

                {order.notes ? (
                    <div style={{ marginTop: "1.5rem" }}>
                        <p className={styles.cardFieldLabel}>Customer notes</p>
                        <p style={{ marginTop: "0.5rem", lineHeight: 1.75 }}>{order.notes}</p>
                    </div>
                ) : null}
            </section>

            <section className={styles.section} style={{ marginTop: "1.5rem" }}>
                <h2 style={{ marginTop: 0 }}>Items</h2>
                <div className={styles.gridCards}>
                    {order.items?.map((item) => (
                        <article className={styles.card} key={item.productId}>
                            <div className={styles.cardHeader}>
                                <p className={styles.cardTitle}>
                                    {item.productName ?? item.productId}
                                </p>
                                <p className={styles.cardMeta}>Qty: {item.quantity}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminOrderDetailsPage;
