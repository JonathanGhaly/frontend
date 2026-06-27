import type { Category } from "../types";

interface Props {
    categories: Category[];
}

const CategorySidebar = ({
    categories,
}: Props) => {
    return (
        <aside>
            <h3>Categories</h3>

            {categories.map((category) => (
                <div key={category.id}>
                    {category.name}
                </div>
            ))}
        </aside>
    );
};

export default CategorySidebar;
