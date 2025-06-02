"use client";
import { Orders } from "@/components";
import { useOrder } from "@/hooks";
import { useEffect } from "react";

export default function Home() {
  const { items, setup } = useOrder();

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="p-4">
      <Orders items={items} />
    </div>
  );
}
