import { getAllPosts } from "@/utils/contentful";
import { NavLink } from "@mantine/core";

async function getAllWritting() {
  const allWrittings = await getAllPosts();
  return allWrittings;
}

export default async function WrittingsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const writtings = await getAllWritting();

    return (
        <div className="w-full flex h-full overflow-y-hidden">
            <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
                {writtings.map((writting) => (
                    <NavLink
                        href={`/writting/${writting.slug}`}
                        key={writting.slug}
                        label={writting.slug}
                        description={writting.firstPublishedAt}
                    />
                ))}
            </div>
            <div className="border-l border-gray-300 overflow-y-auto">{children}</div>
        </div>
    );
}
