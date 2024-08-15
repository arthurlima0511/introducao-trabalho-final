import { Button } from "./ui/button";

interface NavProps {
  setView: (view: string) => void;
  currentView: string;
}

export default function Nav({ setView, currentView }: NavProps) {
  const getButtonClass = (view: string) =>
    `text-white hover:text-gray-400 ${
      currentView === view ? "font-bold underline" : ""
    }`;

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Button
            onClick={() => setView("compostos")}
            className={getButtonClass("compostos")}
          >
            Juros Compostos
          </Button>
        </li>
        <li>
          <Button
            onClick={() => setView("simples")}
            className={getButtonClass("simples")}
          >
            Juros Simples
          </Button>
        </li>
      </ul>
    </nav>
  );
}
