import { DEMO_MODE, listDemoPostsWithRelations } from "./demo-data";
import { prisma } from "./prisma";

const PAGE_SIZE = 20;

export type PostCursor = {
  id: string;
  createdAt: Date;
};

export const getForYouPosts = async (cursor?: PostCursor) => {
  if (DEMO_MODE) {
    const items = listDemoPostsWithRelations({ replyToPostId: null });
    return {
      items,
      nextCursor: null
    };
  }
  const posts = await prisma.post.findMany({
    where: { replyToPostId: null },
    take: PAGE_SIZE + 1,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      author: true,
      product: true
    },
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: cursor.id }
        }
      : {})
  });

  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;

  return {
    items,
    nextCursor: hasMore
      ? { id: items[items.length - 1].id, createdAt: items[items.length - 1].createdAt }
      : null
  };
};

export const getProductPosts = async ({
  productId,
  type,
  cursor
}: {
  productId: string;
  type?: "REVIEW" | "LOG";
  cursor?: PostCursor;
}) => {
  if (DEMO_MODE) {
    const items = listDemoPostsWithRelations({ productId, type });
    return {
      items,
      nextCursor: null
    };
  }
  const posts = await prisma.post.findMany({
    where: {
      productId,
      ...(type ? { type } : {})
    },
    take: PAGE_SIZE + 1,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      author: true,
      product: true
    },
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: cursor.id }
        }
      : {})
  });

  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;

  return {
    items,
    nextCursor: hasMore
      ? { id: items[items.length - 1].id, createdAt: items[items.length - 1].createdAt }
      : null
  };
};

export const getCommunityPosts = async (communityId: string, cursor?: PostCursor) => {
  if (DEMO_MODE) {
    const items = listDemoPostsWithRelations({ communityId });
    return {
      items,
      nextCursor: null
    };
  }
  const posts = await prisma.post.findMany({
    where: { communityId },
    take: PAGE_SIZE + 1,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      author: true,
      product: true
    },
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: cursor.id }
        }
      : {})
  });

  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;

  return {
    items,
    nextCursor: hasMore
      ? { id: items[items.length - 1].id, createdAt: items[items.length - 1].createdAt }
      : null
  };
};
