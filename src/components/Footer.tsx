import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const footerLinks = [
  { label: 'تماس با ما',     path: '/contact' },
  { label: 'سوالات متداول',  path: '/faq' },
  { label: 'قوانین و مقررات', path: '/terms' },
  { label: 'ارسال و بازگشت', path: '/returns' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand-section">
          <h3 className="footer__brand-name">پرده‌سرا</h3>
          <p className="footer__brand-desc">
            تجربه آرامش و زیبایی با پرده‌های مینیمال و باکیفیت. ما به طراحی
            فضایی دلنشین برای خانه شما اهمیت می‌دهیم.
          </p>
        </div>

        <ul className="footer__links">
          {footerLinks.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="footer__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © ۱۴۲ تمامی حقوق برای پرده‌سرا محفوظ است.
        </p>
      </div>
    </footer>
  );
}