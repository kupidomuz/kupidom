"use client";

import { useEffect, useState } from "react";


export default function UserInfo() {


  const [user, setUser] = useState<any>(null);



  useEffect(() => {

    const saved =
      localStorage.getItem("user");


    if (saved) {

      setUser(JSON.parse(saved));

    }

  }, []);




  if (!user) return null;



  return (

    <div className="rounded-xl bg-gray-100 p-3 text-sm">

      👤 {user.name}

      <br />

      🔑 Роль:
      {" "}
      {user.role === "admin"
        ? "Руководитель"
        : "Агент"}

    </div>

  );

}