import { Link } from 'react-router-dom';
import '../../styles/Home.css';
import livingroom from '@/assets/home/livingroom.png'
import bedroom from '@/assets/home/room.png'
import zebra from '@/assets/home/zebra.png'

const categories = [
  {
    id: 1,
    title: 'پرده پذیرایی',
    image: livingroom,
    path: '/categories/living-room',
  },
  {
    id: 2,
    title: 'پرده اتاق خواب',
    image: bedroom,
    path: '/categories/bedroom',
  },
  {
    id: 3,
    title: 'پرده زبرا',
    image: zebra,
    path: '/categories/zebra',
  },
];

export default function PopularCategories() {
  return (
    <section className="popular-categories">
      <div className="popular-categories__header">
        <h2 className="popular-categories__title">دسته‌بندی‌های محبوب</h2>
        <span className="popular-categories__underline" />
      </div>

      <div className="popular-categories__grid">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className="popular-categories__card"
          >
            <div className="popular-categories__image-wrapper">
              <img
                src={cat.image}
                alt={cat.title}
                className="popular-categories__image"
              />
            </div>
            <span className="popular-categories__card-title">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}