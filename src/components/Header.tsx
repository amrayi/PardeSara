import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { searchProductsClientSide } from "../services/productService";
import SearchOverlay from "./SearchOverlay";
import "../styles/Header.css";
import profile from "../assets/icons/Container.png";
import buy from "../assets/icons/buy.png";
import searchIcon from "../assets/icons/search.png";

const navItems = [
  { label: "خانه", path: "/" },
  { label: "محصولات", path: "/products" },
  { label: "درباره ما", path: "/about-us" },
];

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: allProducts = [], isLoading: isProductsLoading } = useProductsQuery();

  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsHidden(true);
          } else if (currentScrollY < lastScrollY) {
            setIsHidden(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchBarOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchBarOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchBarOpen]);

  const searchResults = useMemo(
    () => searchProductsClientSide(allProducts, submittedQuery),
    [allProducts, submittedQuery]
  );

  const handleProfileClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user/profile");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearchIconClick = () => {
    setIsSearchBarOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInputValue.trim()) return;
    setSubmittedQuery(searchInputValue.trim());
    setIsSearchOverlayOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  return (
    <>
      <header
        className={`header ${isHidden ? "header--hidden" : ""} ${
          isMobileMenuOpen ? "header--menu-open" : ""
        }`}
      >
        <div className="header__brand">
          <a href="/">
            <span>پرده‌سرا</span>
          </a>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">

          <div className="header__search">
            <form
              className={`header__search-bar ${
                isSearchBarOpen ? "header__search-bar--open" : ""
              }`}
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="جستجوی محصول..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="header__search-input"
              />
            </form>

            <button
              type="button"
              className="header__icon-btn"
              aria-label="جستجو"
              onClick={() => {
                if (isSearchBarOpen && searchInputValue.trim()) {
                  setSubmittedQuery(searchInputValue.trim());
                  setIsSearchOverlayOpen(true);
                } else {
                  handleSearchIconClick();
                }
              }}
            >
              <img src={searchIcon} alt="search" className="header__icon" />
            </button>
          </div>
          
          <button
            className="header__icon-btn"
            aria-label="حساب کاربری"
            onClick={handleProfileClick}
          >
            <img src={profile} alt="user" className="header__icon" />
          </button>

          <NavLink to="/cart" className="header__icon-btn" aria-label="سبد خرید">
            <img src={buy} alt="cart" className="header__icon" />
          </NavLink>

        </div>

        <button
          className="header__hamburger"
          aria-label="باز کردن منو"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className={`header__hamburger-line ${isMobileMenuOpen ? "header__hamburger-line--open-1" : ""}`} />
          <span className={`header__hamburger-line ${isMobileMenuOpen ? "header__hamburger-line--open-2" : ""}`} />
          <span className={`header__hamburger-line ${isMobileMenuOpen ? "header__hamburger-line--open-3" : ""}`} />
        </button>
      </header>

      <div className={`header__drawer ${isMobileMenuOpen ? "header__drawer--open" : ""}`}>
        <ul className="header__drawer-list">
          {navItems.map((item) => (
            <li key={item.path} className="header__drawer-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `header__drawer-link ${isActive ? "header__drawer-link--active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="header__overlay" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        query={submittedQuery}
        results={searchResults}
        isLoading={isProductsLoading}
        onClose={closeSearchOverlay}
      />
    </>
  );
}