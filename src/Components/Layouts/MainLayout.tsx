import React from "react";
import UserSideBar from "../SideBars/UserSideBar";
import MainNavbar from "../Navbars/MainNavbar";

interface Props {
  children: React.ReactNode;
}
function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-orange-50">
      {/* Sidebar */}
      <UserSideBar />

      {/* Main Content */}
      <article className="flex-1 p-4 flex-1 p-4 overflow-hidden">
        <header>
          <MainNavbar />
        </header>
        <main className="">{children}</main>
      </article>
    </div>
  );
}

export default MainLayout;
