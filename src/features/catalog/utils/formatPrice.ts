export const formatPrice = (
    price: number | string | null | undefined
) => {
    const numericPrice =
        typeof price === "number"
            ? price
            : Number(price);

    if (!Number.isFinite(numericPrice)) {
        return "$0.00";
    }

    return `$${numericPrice.toFixed(2)}`;
};
