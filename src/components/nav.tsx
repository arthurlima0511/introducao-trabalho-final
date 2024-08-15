import { ThemeChanger } from "./themeChanger";
import { Button } from "./ui/button";

interface NavProps {
  setView: (view: string) => void;
}

export default function Nav({ setView }: NavProps) {
  return (
    <nav className="p-4 px-[5rem] flex justify-between items-center">
      <div>
        <ul className="flex space-x-4">
          <li>
            <Button onClick={() => setView("compostos")}>
              Juros Compostos
            </Button>
          </li>
          <li>
            <Button onClick={() => setView("simples")}>Juros Simples</Button>
          </li>
        </ul>
      </div>
      <ThemeChanger />
    </nav>
  );
}
