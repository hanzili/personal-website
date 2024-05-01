import { useState } from "react";
import Link from "next/link";
import {
  IconHome,
  IconPacman,
  IconCode,
  IconFileText,
  IconWriting,
} from "@tabler/icons-react";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/personal-life", label: "Personal Life", icon: IconPacman },
  { link: "/technical-life", label: "Technical Life", icon: IconCode },
  { link: "/resume", label: "Resume", icon: IconFileText },
  { link: "/writting", label: "Writting", icon: IconWriting },
];

interface NavProps {
  onCategoryClick: () => void;
}

export function Nav({ onCategoryClick }: NavProps) {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      className={`flex items-center no-underline text-sm px-3 rounded-sm font-medium my-5 ${
        item.label === active ? "text-gray-400" : "text-gray-700"
      }`}
      data-active={item.label === active || undefined}
      onClick={() => {
        setActive(item.label);
        onCategoryClick();
      }}
    >
      <item.icon className="text-gray-600 mr-3 w-6 h-6" stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className="p-4 flex flex-col">
      <div className="flex-1">{links}</div>
    </nav>
  );
}
