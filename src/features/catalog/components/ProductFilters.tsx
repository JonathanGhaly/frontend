import SearchBar from "./SearchBar";

interface Props {
    search: string;

    setSearch: (
        value: string
    ) => void;
}

const ProductFilters = ({
    search,
    setSearch,
}: Props) => {
    return (
        <SearchBar
            value={search}
            onChange={setSearch}
        />
    );
};

export default ProductFilters;