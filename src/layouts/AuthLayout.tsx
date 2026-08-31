import type { ReactNode } from "react";
import bgImage from "../assets/Login/verify.jpg";
import "../styles/AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout" style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className="auth-layout__logo">پرده‌سرا</h1>
      <div className="auth-layout__card">{children}</div>
    </div>
  );
}

export default AuthLayout;