import type { ReactNode } from "react";

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  footer?: ReactNode;
}

function StatCard({ icon, title, value, footer }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <img src={icon} alt="" />
      </div>
      <div className="stat-card__body">
        <span className="stat-card__title">{title}</span>
        <span className="stat-card__value">{value}</span>
      </div>
      {footer && <div className="stat-card__footer">{footer}</div>}
    </div>
  );
}

export default StatCard;