import { useTheme } from "next-themes";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeChanger = () => {
  const { setTheme } = useTheme();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    setTheme(toggle ? "light" : "dark");
  };

  return (
    <div onClick={handleToggle}>
      {toggle ? <Moon /> : <Sun color="white" />}
    </div>
  );
};
