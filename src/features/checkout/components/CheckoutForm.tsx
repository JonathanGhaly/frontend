import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import ShippingAddressForm from "./ShippingAddressForm";
import { useCart } from "../hooks/useCart";
import { useCreateOrder } from "../hooks/useCreateOrder";
import type { AddressDto } from "../types";

const emptyAddress: AddressDto = {
    street: "",
    city: "",
    postalCode: "",
    country: "",
};

const CheckoutForm = () => {
    const cart = useCart();
    const [shippingAddress, setShippingAddress] = useState<AddressDto>(emptyAddress);
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const { mutate, isPending, error } = useCreateOrder();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: Record<string, string | undefined> = {};
        if (!shippingAddress.street.trim()) nextErrors.street = "Street is required.";
        if (!shippingAddress.city.trim()) nextErrors.city = "City is required.";
        if (!shippingAddress.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
        if (!shippingAddress.country.trim()) nextErrors.country = "Country is required.";

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        mutate({
            items: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            shippingAddress: {
                ...shippingAddress,
                street: shippingAddress.street.trim(),
                city: shippingAddress.city.trim(),
                postalCode: shippingAddress.postalCode.trim(),
                country: shippingAddress.country.trim(),
            },
            billingAddress: {
                ...shippingAddress,
                street: shippingAddress.street.trim(),
                city: shippingAddress.city.trim(),
                postalCode: shippingAddress.postalCode.trim(),
                country: shippingAddress.country.trim(),
            },
            notes: notes.trim() || undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <ShippingAddressForm
                value={shippingAddress}
                onChange={(value) => {
                    setShippingAddress(value);
                    setErrors((current) => ({ ...current, street: undefined, city: undefined, postalCode: undefined, country: undefined }));
                }}
                errors={errors}
            />

            <Input
                label="Notes"
                name="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
            />

            {error && <p className="feedback">Unable to place this order.</p>}

            <Button
                type="submit"
                loading={isPending}
                disabled={cart.items.length === 0}
            >
                Place Order
            </Button>
        </form>
    );
};

export default CheckoutForm;
