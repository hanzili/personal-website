import { useState } from "react";
import Link from "next/link";
import {
  IconHome,
  IconPacman,
  IconCode,
  IconFileText,
  IconWriting,
  IconBrandLinkedin,
  IconBrandDiscord,
  IconMail,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react";
import { Divider } from "@mantine/core";

const linkData = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/personal-life", label: "Personal Life", icon: IconPacman },
  { link: "/technical-life", label: "Technical Life", icon: IconCode },
  { link: "/resume", label: "Resume", icon: IconFileText },
  { link: "/writting", label: "Writting", icon: IconWriting },
];

const socialData = [
  {
    link: "https://www.linkedin.com/in/hanzi-li-mcgill/",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    link: "https://discordapp.com/users/hanzili",
    label: "Discord",
    icon: IconBrandDiscord,
  },
  {
    link: "mailto:hanzili0217@gmail.com",
    label: "Email",
    icon: IconMail,
  },
  {
    link: "https://github.com/hanzili",
    label: "Github",
    icon: IconBrandGithub,
  },
];

interface NavProps {
  onCategoryClick: () => void;
}

export function Nav({ onCategoryClick }: NavProps) {
  const [active, setActive] = useState("Home");

  const navLinks = linkData.map((item) => (
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

  const socialLinks = socialData.map((item) => (
    <a
      href={item.link}
      key={item.label}
      className="flex items-center justify-between no-underline text-sm px-3 rounded-sm font-medium my-5 text-gray-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center">
        <item.icon className="text-gray-600 mr-3 w-6 h-6" stroke={1.5} />
        <span>{item.label}</span>
      </div>
      <IconExternalLink className="text-gray-600 mr-3 w-4 h-4" stroke={1.5} />
    </a>
  ));

  return (
    <nav className="p-4 flex flex-col justify-between h-full">
      <div className="flex-1">{navLinks}</div>
      <Divider my="md" label="Contact Me" labelPosition="left" />
      <div>{socialLinks}</div>
    </nav>
  );
}
