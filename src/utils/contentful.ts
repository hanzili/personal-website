import { isDevelopment } from "./global"

interface FetchGraphQLOptions {
    query: string;
    preview?: boolean;
}

interface GetAllPostsResponse {
    title: string;
    slug: string;
    firstPublishedAt: string;
}


async function fetchGraphQL({ query, preview = isDevelopment }: FetchGraphQLOptions): Promise<any> {
    const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ query })
    });

    if (!res.ok) return undefined;

    return res.json();
}

export async function getAllPosts(preview = isDevelopment): Promise<GetAllPostsResponse[]> {
    const entries = await fetchGraphQL({
        query: `query postCollectionQuery {
                    postCollection {
                        items {
                            sys {
                                firstPublishedAt
                            }
                            title
                            slug
                        }
                    }
                }`,
        preview: preview
    });

    let flattenedAllPosts = [];
    if (entries) {
        flattenedAllPosts = entries.data.postCollection.items.map((item: any) => ({ firstPublishedAt: item.sys.firstPublishedAt, title: item.title, slug: item.slug }));
    }

    console.log(flattenedAllPosts);

    return flattenedAllPosts;
}
