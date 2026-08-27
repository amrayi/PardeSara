import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function PublicLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

        {/* add footer component */}
      <footer>
        <p>My Website Footer</p>
      </footer>
    </div>
  );
}

export default PublicLayout;