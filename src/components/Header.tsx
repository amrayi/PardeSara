import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";
import profile from "../assets/icons/Container.png";
import buy from "../assets/icons/buy.png";

const navItems = [
  { label: "خانه", path: "/" },
  { label: "محصولات", path: "/products" },
  { label: "درباره ما", path: "/about-us" },
];

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      if (e.key === "Escape") setIsMobileMenuOpen(false);
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

  const handleProfileClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user/profile");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`header ${isHidden ? "header--hidden" : ""} ${
          isMobileMenuOpen ? "header--menu-open" : ""
        }`}
      >
        {/* لوگو (سمت راست در RTL) - فقط دسکتاپ */}
        <div className="header__brand">
          <a href="/">
            <span>پرده‌سرا</span>
          </a>
        </div>

        {/* ناوبری دسکتاپ (وسط) */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `header__nav-link ${
                      isActive ? "header__nav-link--active" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* آیکون‌های اکشن (سمت چپ در RTL) */}
        <div className="header__actions">
          <button
            className="header__icon-btn"
            aria-label="حساب کاربری"
            onClick={handleProfileClick}
          >
            <img src={profile} alt="user" className="header__icon" />
          </button>
          <button className="header__icon-btn" aria-label="سبد خرید">
            <NavLink to="/cart">
              <img src={buy} alt="cart" className="header__icon" />
            </NavLink>
          </button>
        </div>

        {/* همبرگر منو - فقط موبایل */}
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

      <div
        className={`header__drawer ${isMobileMenuOpen ? "header__drawer--open" : ""}`}
      >
        <ul className="header__drawer-list">
          {navItems.map((item) => (
            <li key={item.path} className="header__drawer-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `header__drawer-link ${
                    isActive ? "header__drawer-link--active" : ""
                  }`
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
        <div
          className="header__overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}