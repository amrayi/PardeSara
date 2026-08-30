import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import profile from '../assets/icons/Container.png';
import buy from '../assets/icons/buy.png';

const navItems = [
  { label: 'خانه',       path: '/' },
  { label: 'محصولات',   path: '/products' },
  { label: 'دسته‌بندی‌ها', path: '/categories' },
  { label: 'درباره ما',  path: '/about' },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span>پرده‌سرا</span>
      </div>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="header__nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="حساب کاربری">
          <img
            src= {profile}
            alt="user"
            className="header__icon"
          />
        </button>
        <button className="header__icon-btn" aria-label="سبد خرید">
          <img
            src= {buy}
            alt="cart"
            className="header__icon"
          />
        </button>
      </div>
    </header>
  );
}