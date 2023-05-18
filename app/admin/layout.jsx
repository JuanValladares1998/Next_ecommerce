import UserNavbar from "@/components/UserNavbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <section className="min-h-screen bg-secondary w-full flex">
      <UserNavbar />
      <div className="bg-base-100 flex-grow rounded-lg p-4">{children}</div>
    </section>
  );
};

export default layout;
