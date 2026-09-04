import { useEffect, useState } from "react";
import { getStoreSettings } from "../services/storeSettingsService";
import type { StoreSettings } from "../types/storeSettings";
import { aboutUsIntro, achievements } from "../data/aboutUsContent";
import phoneIcon from "../assets/icons/phone.png";
import mailIcon from "../assets/icons/box.png";
import mapPinIcon from "../assets/icons/store.png";
import "../styles/AboutUs.css";

function AboutUs() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getStoreSettings().then((data) => {
      if (!isMounted) return;
      setSettings(data);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="about-us-page">
      <section className="about-us__hero">
        {settings?.logoUrl && (
          <img src={settings.logoUrl} alt={settings.storeName} className="about-us__logo" />
        )}
        <h1 className="about-us__title">{aboutUsIntro.title}</h1>
        {aboutUsIntro.paragraphs.map((p, index) => (
          <p key={index} className="about-us__paragraph">
            {p}
          </p>
        ))}
      </section>

      <section className="about-us__achievements">
        {achievements.map((item) => (
          <div key={item.id} className="about-us__achievement-card">
            <span className="about-us__achievement-value">{item.value}</span>
            <span className="about-us__achievement-label">{item.label}</span>
          </div>
        ))}
      </section>

      <section className="about-us__contact">
        <h2 className="about-us__contact-title">راه‌های ارتباط با ما</h2>

        {isLoading ? (
          <p className="about-us__status">در حال بارگذاری...</p>
        ) : (
          settings && (
            <div className="about-us__contact-grid">
              <div className="about-us__contact-item">
                <img src={phoneIcon} alt="" />
                <div>
                  <span className="about-us__contact-label">تلفن تماس</span>
                  <span className="about-us__contact-value" dir="ltr">
                    {settings.phone}
                  </span>
                </div>
              </div>

              <div className="about-us__contact-item">
                <img src={mailIcon} alt="" />
                <div>
                  <span className="about-us__contact-label">ایمیل پشتیبانی</span>
                  <span className="about-us__contact-value" dir="ltr">
                    {settings.supportEmail}
                  </span>
                </div>
              </div>

              <div className="about-us__contact-item about-us__contact-item--full">
                <img src={mapPinIcon} alt="" />
                <div>
                  <span className="about-us__contact-label">آدرس</span>
                  <span className="about-us__contact-value">{settings.address}</span>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default AboutUs;