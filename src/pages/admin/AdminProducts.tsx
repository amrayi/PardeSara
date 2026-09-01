import { useEffect, useState } from "react";
import { getAdminProducts } from "../../services/adminService";
import type { AdminProductListItem, StockStatus } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../../components/ui/Button";
import plusIcon from "../../assets/icons/plus.svg";
import searchIcon from "../../assets/icons/search.png";
import filterIcon from "../../assets/icons/Icon (22).png";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/delete.png";

const CATEGORIES = ["همه", "کتان", "مخمل", "حریر"];

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: "موجود",
  low_stock: "رو به اتمام",
  out_of_stock: "ناموجود",
};

function AdminProducts() {
  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminProducts(activeCategory).then(setProducts);
  }, [activeCategory]);

  const filteredProducts = products.filter((p) => p.name.includes(search));

  const handleDelete = (id: string) => {
    console.log("delete product", id);
  };

  const handleEdit = (id: string) => {
    console.log("edit product", id);
  };

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <Button type="button" variant="main" size="sm" radius="md" className="admin-add-btn">
          <img src={plusIcon} alt="" />
          افزودن محصول
        </Button>
        <div>
          <h1>محصولات</h1>
          <p>مدیریت لیست پرده‌ها و پارچه‌های موجود.</p>
        </div>
      </div>

      <div className="admin-products__toolbar">
        <div className="admin-search-bar">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-products__categories">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              type="button"
              variant={activeCategory === cat ? "main" : "secondary"}
              size="sm"
              radius="pill"
              className="admin-chip"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
          <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn">
            <img src={filterIcon} alt="فیلتر" />
          </Button>
        </div>
      </div>

      <div className="admin-table admin-table--products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="admin-table__row">
            <div className="admin-table__product">
              {product.image ? (
                <img src={product.image} alt="" className="admin-table__product-thumb" />
              ) : (
                <div className="admin-table__product-thumb admin-table__product-thumb--empty" />
              )}
              <div>
                <span className="admin-table__product-name">{product.name}</span>
                <span className="admin-table__product-category">دسته‌بندی: {product.category}</span>
              </div>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">وضعیت انبار</span>
              <span className={`admin-stock-status admin-stock-status--${product.stockStatus}`}>
                {STOCK_LABEL[product.stockStatus]}
                {product.stockMeters !== undefined && ` (${product.stockMeters} متر)`}
              </span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">قیمت هر متر</span>
              <span>{formatPrice(product.pricePerMeter)} تومان</span>
            </div>

            <div className="admin-table__actions">
              <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn" onClick={() => handleEdit(product.id)}>
                <img src={editIcon} alt="ویرایش" />
              </Button>
              <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn" onClick={() => handleDelete(product.id)}>
                <img src={trashIcon} alt="حذف" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;