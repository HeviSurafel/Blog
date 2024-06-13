import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <main className="p-10 max-w-[700px] my-0 mx-auto ">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
