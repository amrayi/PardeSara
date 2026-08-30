import type { ProductColorVariant } from "../../types/product";
import "../../styles/ProductDetail.css";

interface ColorSwatchSelectorProps {
  variants: ProductColorVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function ColorSwatchSelector({
  variants,
  selectedId,
  onSelect,
}: ColorSwatchSelectorProps) {
  return (
    <div className="color-swatch-selector">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={`color-swatch-selector__swatch ${
            variant.id === selectedId
              ? "color-swatch-selector__swatch--active"
              : ""
          }`}
          style={{ backgroundColor: variant.colorHex }}
          onClick={() => onSelect(variant.id)}
          aria-label={variant.name}
        />
      ))}
    </div>
  );
}

export default ColorSwatchSelector;