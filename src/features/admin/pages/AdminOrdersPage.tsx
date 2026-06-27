import { Link } from "react-router-dom";
import {
    useAdminOrders,
    useUpdateOrderStatus,
} from "../hooks/useAdminOrders";
import {
    OrderStatus,
    orderStatusLabels,
} from "../types";
import styles from "../../../components/Layout/Layout.module.css";

const statuses = Object.values(OrderStatus).filter(
    (status): status is OrderStatus =>
        typeof status === "number"
);

const AdminOrdersPage = () => {
    const { data: orders = [], isLoading } = useAdminOrders();
    const updateStatus = useUpdateOrderStatus();

    return (
        <div>
            <h1 className={styles.pageTitle}>Orders</h1>

            {isLoading && <p>Loading orders...</p>}

            <section className={styles.section}>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className={styles.gridCards}>
                        {orders.map((order) => (
                            <article className={styles.card} key={order.id}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h2 className={styles.cardTitle}>
                                            {order.orderId ?? order.id}
                                        </h2>
                                        <p className={styles.cardMeta}>
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString()
                                                : "Date unavailable"}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/admin/orders/${order.id}`}
                                        className={styles.heroButtonSecondary}
                                    >
                                        View details
                                    </Link>
                                </div>

                                <div className={styles.orderSummaryRow}>
                                    <div>
                                        <p className={styles.cardFieldLabel}>Order total</p>
                                        <p className={styles.cardFieldValue}>
                                            ${(order.total ?? 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={styles.cardFieldLabel}>Current status</p>
                                        <p className={styles.cardFieldValue}>
                                            {orderStatusLabels[order.status ?? OrderStatus.Pending]}
                                        </p>
                                    </div>
                                    <div>
                                        <label className={styles.cardFieldLabel} htmlFor={`status-${order.id}`}>
                                            Change status
                                        </label>
                                        <select
                                            id={`status-${order.id}`}
                                            value={order.status ?? OrderStatus.Pending}
                                            onChange={(event) =>
                                                updateStatus.mutate({
                                                    id: order.id,
                                                    status: Number(event.target.value) as OrderStatus,
                                                })
                                            }
                                            className={styles.selectInput}
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {orderStatusLabels[status]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminOrdersPage;
