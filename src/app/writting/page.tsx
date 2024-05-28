import { getAllPosts } from "@/utils/contentful";
import { NavLink } from "@mantine/core";

async function getAllWritting() {
  const allWrittings = await getAllPosts();
  return allWrittings;
}

export default async function Writtings() {
  const writtings = await getAllWritting();

  return <></>;
}
