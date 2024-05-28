import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

export default function Contentful({ content }: { content: Document }) {
  if (!content) return null;

  return documentToReactComponents(content as Document);
}
