import { getAllPosts } from "@/utils/contentful";
import Link from "next/link";

async function getAllWritting() {
  const allWrittings = await getAllPosts();
  return allWrittings;
}

export default async function Writting() {
  const writtings = await getAllWritting();

  return (
    <div>
      {writtings.map((writting) => (
        <Link href={`/writting/${writting.slug}`} key={writting.slug} className="flex w-full">
          <p>{writting.title}</p>
          <p>{writting.firstPublishedAt}</p>
        </Link>
      ))}
    </div>
  );
}
