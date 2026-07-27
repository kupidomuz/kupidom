"use client";

import { toggleAgentStatus } from "@/lib/agentActions";
import { useTransition } from "react";


export default function AgentStatusButton({
  id,
  status,
}: {
  id:string;
  status:string;
}) {


  const [loading, startTransition] = useTransition();



  function changeStatus(){

    startTransition(async()=>{

      await toggleAgentStatus(
        id,
        status
      );

    });

  }



  return (

    <button
      onClick={changeStatus}
      disabled={loading}
      className={
        status === "active"
        ? "rounded-lg bg-red-600 px-3 py-2 text-white text-sm"
        : "rounded-lg bg-green-600 px-3 py-2 text-white text-sm"
      }
    >

      {loading
        ? "..."
        : status === "active"
          ? "🔒 Блок"
          : "✅ Включить"
      }

    </button>

  );

}