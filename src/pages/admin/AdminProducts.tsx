import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts } from "../../services/adminService";
import { deleteProduct } from "../../services/adminProductService";
import type { AdminProductListItem, StockStatus } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../../components/ui/Button";
import plusIcon_light from "../../assets/icons/plus.svg";
import plusIcon_dark from "../../assets/icons/plus-dark.png";
import searchIcon from "../../assets/icons/search.png";
import filterIcon from "../../assets/icons/filter.png";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/delete.png";
import Modal from "../../components/ui/Modal";

const CATEGORIES = ["همه", "اتاق خواب", "پذیرایی", "شید", "زبرا", "شب و روز", "کرکره فلزی"];

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: "موجود",
  low_stock: "رو به اتمام",
  out_of_stock: "ناموجود",
};

const PAGE_SIZE = 10;

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [productToDelete, setProductToDelete] = useState<AdminProductListItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAdminProducts(activeCategory).then(setProducts);
  }, [activeCategory]);

  useEffect(() => {
    setPage(1);
  }, [search, activeCategory]);

  const filteredProducts = products.filter((p) => p.name.includes(search));

  const totalPages = Math.max(Math.ceil(filteredProducts.length / PAGE_SIZE), 1);
  const currentPageProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const getPageNumbers = (): number[] => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDeleteClick = (product: AdminProductListItem) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch {
      // می‌تونیم اینجا یه پیام خطا نشون بدیم
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <div>
          <h1>محصولات</h1>
          <p>مدیریت لیست پرده‌ها و پارچه‌های موجود.</p>
        </div>
        <a href="/admin/add-product">
          <Button type="button" variant="main" size="sm" radius="md" className="admin-add-btn">
            <span className="btn-icon-swap">
              <img src={plusIcon_light} alt="" className="btn-icon-swap__light" />
              <img src={plusIcon_dark} alt="" className="btn-icon-swap__dark" />
            </span>
            افزودن محصول
          </Button>
        </a>
      </div>

      <div className="admin-products__toolbar">
        <div className="admin-search-bar">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="جستجو در محصولات ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-products__toolbar-filters">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            radius="sm"
            className="admin-icon-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <img src={filterIcon} alt="فیلتر" />
          </Button>

          <div
            className={`admin-products__categories ${showFilters ? "admin-products__categories--open" : ""
              }`}
          >
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
          </div>
        </div>
      </div>

      <div className="admin-table admin-table--products">
        {currentPageProducts.map((product) => (
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
              <Button
                type="button"
                variant="secondary"
                size="sm"
                radius="sm"
                className="admin-icon-btn"
                onClick={() => handleEdit(product.id)}
              >
                <img src={editIcon} alt="ویرایش" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                radius="sm"
                className="admin-icon-btn"
                onClick={() => handleDeleteClick(product)}
              >
                <img src={trashIcon} alt="حذف" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-pagination">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          radius="sm"
          className="admin-icon-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          &lt;
        </Button>

        {getPageNumbers()[0] > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="sm"
              className="admin-icon-btn"
              onClick={() => setPage(1)}
            >
              1
            </Button>
            <span>...</span>
          </>
        )}

        {getPageNumbers().map((p) => (
          <Button
            key={p}
            type="button"
            variant={p === page ? "main" : "secondary"}
            size="sm"
            radius="sm"
            className="admin-icon-btn"
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}

        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            <span>...</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="sm"
              className="admin-icon-btn"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          radius="sm"
          className="admin-icon-btn"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          &gt;
        </Button>
      </div>

      <Modal
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        title="حذف محصول"
        description={
          productToDelete
            ? `آیا از حذف محصول «${productToDelete.name}» اطمینان دارید؟ این عملیات قابل بازگشت نیست.`
            : ""
        }
        size="sm"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="md"
              className="modal-btn--neutral"
              onClick={() => setProductToDelete(null)}
              disabled={isDeleting}
            >
              انصراف
            </Button>
            <Button
              type="button"
              variant="main"
              size="sm"
              radius="md"
              className="modal-btn--danger"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "در حال حذف..." : "حذف محصول"}
            </Button>
          </>
        }
      />
    </div>
  );
}

export default AdminProducts;