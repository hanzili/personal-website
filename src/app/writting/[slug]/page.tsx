import { getPostBySlug } from "@/utils/contentful";

async function getWritting(slug: string) {
  const writting = await getPostBySlug(slug);
  return writting;
}

export default async function Writting({
  params,
}: {
  params: { slug: string };
}) {
  const writting = await getWritting(params.slug);
  console.log(writting);

  if (!writting) {
    return <div>Writting not found</div>;
  }

  return (
    <div>
      {writting.title}
      {writting.firstPublishedAt}
      {writting.publishedAt}
    </div>
  );
}
