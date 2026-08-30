import "../styles/FilterSidebar.css";

// TODO: این کامپوننت فعلاً static است.
// در تسک جداگانه باید state فیلترها بالا بیاد (یا با useState یا با URL searchParams)
// و onChange هر گزینه، لیست محصولات رو دوباره فچ/فیلتر کنه.

function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      <h3 className="filter-sidebar__title">فیلترها</h3>

      <div className="filter-sidebar__group">
        <h4 className="filter-sidebar__group-title">محدوده قیمت (تومان)</h4>
        <label className="filter-sidebar__option">
          <span>زیر ۱,۰۰۰,۰۰۰</span>
          <input type="checkbox" />
        </label>
        <label className="filter-sidebar__option">
          <span>۱,۰۰۰,۰۰۰ تا ۳,۰۰۰,۰۰۰</span>
          <input type="checkbox" />
        </label>
        <label className="filter-sidebar__option">
          <span>بالای ۳,۰۰۰,۰۰۰</span>
          <input type="checkbox" />
        </label>
      </div>

      <div className="filter-sidebar__group">
        <h4 className="filter-sidebar__group-title">جنس پارچه</h4>
        <label className="filter-sidebar__option">
          <span>حریر</span>
          <input type="checkbox" />
        </label>
        <label className="filter-sidebar__option">
          <span>مخمل</span>
          <input type="checkbox" />
        </label>
        <label className="filter-sidebar__option">
          <span>کتان</span>
          <input type="checkbox" />
        </label>
      </div>
    </aside>
  );
}

export default FilterSidebar;