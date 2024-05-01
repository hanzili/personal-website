import { getAllPosts } from "@/utils/contentful";
import { NavLink } from "@mantine/core";

async function getAllWritting() {
  const allWrittings = await getAllPosts();
  return allWrittings;
}

export default async function Writtings() {
  const writtings = await getAllWritting();

  return (
    <div>
      {writtings.map((writting) => (
        <NavLink
          href={`/writting/${writting.slug}`}
          key={writting.slug}
          label={writting.slug}
          description={writting.firstPublishedAt}
        />
      ))}
    </div>
  );
}
