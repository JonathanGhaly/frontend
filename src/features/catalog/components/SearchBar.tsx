import Input from "../../../components/Input/Input";

interface Props {
    value: string;

    onChange: (
        value: string
    ) => void;
}

const SearchBar = ({
    value,
    onChange,
}: Props) => {
    return (
        <Input
            placeholder="Search..."
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
};

export default SearchBar;