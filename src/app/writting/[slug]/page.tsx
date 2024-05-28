import { getPostBySlug, flattenPost } from "@/utils/contentful";
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

  const flattenedWritting = flattenPost(writting);

  return (
    <div className="p-5">
      {flattenedWritting.title}
      {flattenedWritting.firstPublishedAt}
      {flattenedWritting.publishedAt}
      {flattenedWritting.content ? (
        <Contentful content={flattenedWritting.content as Document} />
      ) : (
        <div>In process...</div>
      )}
    </div>
  );
}
