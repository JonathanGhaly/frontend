import Input from "../../../components/Input/Input";

interface Props {
    value: string;

    onChange: (value: string) => void;
}

const CouponInput = ({
    value,
    onChange,
}: Props) => {
    return (
        <Input
            placeholder="Coupon Code"
            value={value}
            onChange={e =>
                onChange(e.target.value)
            }
        />
    );
};

export default CouponInput;