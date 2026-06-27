import Input from "../../../components/Input/Input";
import type { AddressDto } from "../types";

interface Props {
    value: AddressDto;
    onChange: (value: AddressDto) => void;
    errors?: Record<string, string | undefined>;
}

const ShippingAddressForm = ({ value, onChange, errors }: Props) => {
    return (
        <>
            <Input
                label="Street"
                name="street"
                value={value.street}
                onChange={(event) =>
                    onChange({
                        ...value,
                        street: event.target.value,
                    })
                }
                error={errors?.street}
                required
            />

            <Input
                label="City"
                name="city"
                value={value.city}
                onChange={(event) =>
                    onChange({
                        ...value,
                        city: event.target.value,
                    })
                }
                error={errors?.city}
                required
            />

            <Input
                label="Postal code"
                name="postalCode"
                value={value.postalCode}
                onChange={(event) =>
                    onChange({
                        ...value,
                        postalCode: event.target.value,
                    })
                }
                error={errors?.postalCode}
                required
            />

            <Input
                label="Country"
                name="country"
                value={value.country}
                onChange={(event) =>
                    onChange({
                        ...value,
                        country: event.target.value,
                    })
                }
                error={errors?.country}
                required
            />
        </>
    );
};

export default ShippingAddressForm;
