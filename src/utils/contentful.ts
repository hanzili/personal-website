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

interface GetPostBySlugResponse {
    title: string;
    firstPublishedAt: string;
    publishedAt: string;
    content: object;
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

function extractDate(timestamp: string): string {
    const dateOnly = timestamp.split('T')[0];
    return dateOnly;
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
        flattenedAllPosts = entries.data.postCollection.items.map((item: any) => ({ firstPublishedAt: extractDate(item.sys.firstPublishedAt), title: item.title, slug: item.slug }));
    }

    return flattenedAllPosts;
}

export async function getPostBySlug(slug: string, preview = isDevelopment): Promise<GetPostBySlugResponse | null> {
    const entries = await fetchGraphQL({
        query: `query postQuery {
        postCollection(where: {slug: "${slug}"}, preview: ${preview}) {
          items {
            sys {
              firstPublishedAt
              publishedAt
            }
            content {
              json
            }
            title
          }
        }
      }`, preview: preview
    })

    let flattenedPost = null;

    if (entries) {
        const post = entries.data.postCollection.items[0];
        flattenedPost = {
            title: post.title,
            firstPublishedAt: extractDate(post.sys.firstPublishedAt),
            publishedAt: extractDate(post.sys.publishedAt),
            content: post.content,
        }
    }

    return flattenedPost;
}
