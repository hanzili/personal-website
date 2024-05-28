import { getPostBySlug } from "@/utils/contentful";
import Contentful from "@/components/Contentful";
import { Document } from "@contentful/rich-text-types";

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

  if (!writting) {
    return <div>Writting not found</div>;
  }

  return (
    <div className="p-5">
      {writting.title}
      {writting.firstPublishedAt}
      {writting.publishedAt}
      <Contentful content={writting.content as Document} />
    </div>
  );
}
