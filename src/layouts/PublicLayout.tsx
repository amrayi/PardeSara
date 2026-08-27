import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
        {/* add header component */}
      <header>
        <h1>My Website</h1>
      </header>

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