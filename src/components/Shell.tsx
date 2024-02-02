"use client";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Nav } from "./Nav";
import { Avatar } from "@mantine/core";
import L from "@/assets/L.png";

import { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex flex-start items-center">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          className="ml-5"
        />{" "}
        <Avatar
          src={L.src}
          alt="This is actually picture of L :P"
          className="ml-5"
        />
        <div className="ml-5">Hanzi&apos;s Personal Site</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
