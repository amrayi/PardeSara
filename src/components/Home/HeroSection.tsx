import Button from '../ui/Button';
import '@/styles/Home.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg" />

      <div className="hero__card">
        <h1 className="hero__title">زیبایی خانه‌تان با پرده‌های ما</h1>
        <p className="hero__desc">
          طراحی بی‌نظیر، کیفیت عالی و تنوع در رنگ و جنس برای هر سلیقه‌ای.
        </p>
        <Button variant="main" size="lg">
          مشاهده مجموعه جدید
        </Button>
      </div>
    </section>
  );
}