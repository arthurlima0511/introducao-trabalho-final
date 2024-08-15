import { ThemeChanger } from "./themeChanger";
import { Button } from "./ui/button";

interface NavProps {
  setView: (view: string) => void;
}

export default function Nav({ setView }: NavProps) {
  return (
    <nav className="p-4 md:px-[5rem] flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-auto flex flex-row justify-between items-center md:justify-start">
        <ul className="flex flex-row space-x-2 md:space-x-4">
          <li>
            <Button
              className="text-sm md:text-base"
              onClick={() => setView("compostos")}
            >
              Juros Compostos
            </Button>
          </li>
          <li>
            <Button
              className="text-sm md:text-base"
              onClick={() => setView("simples")}
            >
              Juros Simples
            </Button>
          </li>
        </ul>
        <div className="ml-auto md:hidden">
          <ThemeChanger />
        </div>
      </div>
      <div className="hidden md:block">
        <ThemeChanger />
      </div>
    </nav>
  );
}
