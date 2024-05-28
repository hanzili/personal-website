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
    content: { json: object, links: object };
    sys: { firstPublishedAt: string, publishedAt: string };
}

interface FlattendPost {
    title: string;
    firstPublishedAt: string;
    publishedAt: string;
    content: object | null;
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
            postCollection(where: { slug: "${slug}" }, limit:1) {
              items {
                sys {
                  firstPublishedAt
                  publishedAt
                }
                content {
                  json
                  links {
                    assets {
                      block {
                        sys {
                          id
                        }
                        url
                        title
                        width
                        height
                      }
                    }
                  }
                }
                title
              }
            }
          }
          `, preview: preview
    })

    if (!entries) return null;

    return entries.data.postCollection.items[0];
}

export function flattenPost(post: GetPostBySlugResponse) : FlattendPost {
    let flattenedPost : FlattendPost = {
        title: "",
        firstPublishedAt: "",
        publishedAt: "",
        content: null,
    }

    if (post.title) flattenedPost.title = post.title;
    if (post.sys.firstPublishedAt) flattenedPost.firstPublishedAt = extractDate(post.sys.firstPublishedAt);
    if (post.sys.publishedAt) flattenedPost.publishedAt = extractDate(post.sys.publishedAt);
    if (post.content) flattenedPost.content = post.content.json;

    return flattenedPost;
}
