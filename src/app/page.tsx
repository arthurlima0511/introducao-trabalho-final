"use client";
import JurosCompostos from "@/components/jurosCompostos";
import JurosSimples from "@/components/jurosSimples";
import Nav from "@/components/nav";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState("compostos");

  const renderView = () => {
    switch (view) {
      case "compostos":
        return <JurosCompostos />;
      case "simples":
        return <JurosSimples />;
      default:
        return <JurosCompostos />;
    }
  };

  return (
    <>
      <Nav setView={setView} currentView={view} />
      <div className="p-4">{renderView()}</div>
    </>
  );
}
