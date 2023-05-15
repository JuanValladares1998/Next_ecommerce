"use client";

import { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();

    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Admin</h1>
    </section>
  );
};

export default Admin;
