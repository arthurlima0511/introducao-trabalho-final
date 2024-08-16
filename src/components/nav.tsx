import { ThemeChanger } from "./themeChanger";
import { Button } from "./ui/button";

interface NavProps {
  setView: (view: string) => void;
}

export default function Nav({ setView }: NavProps) {
  return (
    <nav className="p-4 lg:px-[2.5rem] xl:px-[5rem] flex flex-col lg:flex-row justify-between items-center">
      <div className="w-full lg:w-auto flex flex-row justify-between items-center lg:justify-start">
        <ul className="flex flex-row space-x-2 lg:space-x-4">
          <li>
            <Button
              className="text-sm lg:text-base"
              onClick={() => setView("compostos")}
            >
              Juros Compostos
            </Button>
          </li>
          <li>
            <Button
              className="text-sm lg:text-base"
              onClick={() => setView("simples")}
            >
              Juros Simples
            </Button>
          </li>
        </ul>
        <div className="ml-auto lg:hidden">
          <ThemeChanger />
        </div>
      </div>
      <div className="hidden lg:block">
        <ThemeChanger />
      </div>
    </nav>
  );
}
