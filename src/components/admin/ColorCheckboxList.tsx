import type { AvailableColor } from "../../types/productForm";
import "../../styles/admin.css";

interface ColorCheckboxListProps {
  colors: AvailableColor[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

function ColorCheckboxList({ colors, selectedIds, onToggle }: ColorCheckboxListProps) {
  return (
    <div className="color-checkbox-list">
      {colors.map((color) => {
        const isChecked = selectedIds.includes(color.id);
        return (
          <label key={color.id} className="color-checkbox-list__item">
            <span
              className="color-checkbox-list__swatch"
              style={{ backgroundColor: color.hex }}
            />
            <span className="color-checkbox-list__name">{color.name}</span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(color.id)}
              className="color-checkbox-list__checkbox"
            />
          </label>
        );
      })}
    </div>
  );
}

export default ColorCheckboxList;