import { priceRanges } from "../data/priceRange";
import { productCategories } from "../data/mockProductFormOptions";
import "../styles/FilterSidebar.css";

interface FilterSidebarProps {
  selectedPriceRangeIds: string[];
  selectedCategoryIds: string[];
  onTogglePriceRange: (id: string) => void;
  onToggleCategory: (id: string) => void;
}

function FilterSidebar({
  selectedPriceRangeIds,
  selectedCategoryIds,
  onTogglePriceRange,
  onToggleCategory,
}: FilterSidebarProps) {
  return (
    <aside className="filter-sidebar">
      <h3 className="filter-sidebar__title">فیلترها</h3>

      <div className="filter-sidebar__group">
        <h4 className="filter-sidebar__group-title">محدوده قیمت (تومان)</h4>
        {priceRanges.map((range) => (
          <label key={range.id} className="filter-sidebar__option">
            <span>{range.label}</span>
            <input
              type="checkbox"
              checked={selectedPriceRangeIds.includes(range.id)}
              onChange={() => onTogglePriceRange(range.id)}
            />
          </label>
        ))}
      </div>

      <div className="filter-sidebar__group">
        <h4 className="filter-sidebar__group-title">دسته‌بندی</h4>
        {productCategories.map((category) => (
          <label key={category.id} className="filter-sidebar__option">
            <span>{category.name}</span>
            <input
              type="checkbox"
              checked={selectedCategoryIds.includes(category.id)}
              onChange={() => onToggleCategory(category.id)}
            />
          </label>
        ))}
      </div>
    </aside>
  );
}

export default FilterSidebar;