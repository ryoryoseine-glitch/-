export const DEMO_MODE = process.env.DEMO_MODE === "true";

export type DemoUser = {
  id: string;
  handle: string;
  name: string | null;
  imageUrl: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
};

export type DemoCategory = {
  id: string;
  slug: string;
  name: string;
};

export type DemoProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  categoryId: string;
  avgRating: number;
  reviewCount: number;
};

export type DemoCommunity = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
};

export type DemoQuestion = {
  id: string;
  productId: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type DemoPost = {
  id: string;
  type: "NOTE" | "REVIEW" | "LOG";
  authorId: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  replyToPostId?: string | null;
  productId?: string | null;
  communityId?: string | null;
  ratingOverall?: number | null;
  ratingEffect?: number | null;
  ratingCost?: number | null;
  ratingEase?: number | null;
  ratingSafety?: number | null;
  usedAt?: Date | null;
  cropText?: string | null;
  targetText?: string | null;
  dilutionText?: string | null;
  amountText?: string | null;
  note?: string | null;
};

export type DemoStore = {
  users: DemoUser[];
  categories: DemoCategory[];
  products: DemoProduct[];
  communities: DemoCommunity[];
  questions: DemoQuestion[];
  posts: DemoPost[];
};

type DemoStoreGlobal = {
  demoStore?: DemoStore;
};

const createInitialStore = (): DemoStore => {
  const now = Date.now();
  const categories: DemoCategory[] = [
    { id: "cat-pesticide", slug: "pesticide", name: "農薬" },
    { id: "cat-fertilizer", slug: "fertilizer", name: "肥料" }
  ];

  const products: DemoProduct[] = [
    {
      id: "prod-mospilan",
      slug: "mospilan",
      name: "モスピラン",
      description: "アブラムシ対策に使いやすい浸透移行性の農薬。",
      categoryId: "cat-pesticide",
      avgRating: 4.2,
      reviewCount: 18
    },
    {
      id: "prod-greenplus",
      slug: "greenplus",
      name: "グリーンプラス",
      description: "初期育成を支える微量要素入り肥料。",
      categoryId: "cat-fertilizer",
      avgRating: 3.9,
      reviewCount: 7
    }
  ];

  const users: DemoUser[] = [
    {
      id: "demo-user",
      handle: "demo",
      name: "Demo User",
      imageUrl: null,
      bio: "デモ用のユーザーです。現場メモを共有します。",
      location: "千葉",
      website: null
    },
    {
      id: "demo-user-2",
      handle: "agrinote",
      name: "Agri Note",
      imageUrl: null,
      bio: "資材レビュー担当",
      location: "茨城",
      website: null
    }
  ];

  const communities: DemoCommunity[] = [
    {
      id: "com-organic",
      slug: "organic-growers",
      name: "有機栽培コミュニティ",
      description: "有機・減農薬での知見を共有しましょう。"
    }
  ];

  const posts: DemoPost[] = [
    {
      id: "post-note-1",
      type: "NOTE",
      authorId: "demo-user",
      content: "デモ投稿です。新しい散布スケジュールを検討中。",
      createdAt: new Date(now - 1000 * 60 * 20),
      likeCount: 3,
      replyCount: 1,
      replyToPostId: null,
      productId: null
    },
    {
      id: "post-review-1",
      type: "REVIEW",
      authorId: "demo-user-2",
      content: "モスピランは速効性が高く、葉裏まで効きました。",
      createdAt: new Date(now - 1000 * 60 * 60 * 3),
      likeCount: 8,
      replyCount: 0,
      replyToPostId: null,
      productId: "prod-mospilan",
      ratingOverall: 4,
      ratingEffect: 5,
      ratingCost: 3,
      ratingEase: 4,
      ratingSafety: 4
    },
    {
      id: "post-log-1",
      type: "LOG",
      authorId: "demo-user",
      content: "雨上がりに散布。希釈倍率は1000倍。",
      createdAt: new Date(now - 1000 * 60 * 60 * 5),
      likeCount: 2,
      replyCount: 0,
      replyToPostId: null,
      productId: "prod-mospilan",
      usedAt: new Date(now - 1000 * 60 * 60 * 24 * 2),
      cropText: "キャベツ",
      targetText: "アブラムシ",
      dilutionText: "1000倍",
      amountText: "100L",
      note: "夕方散布"
    },
    {
      id: "post-reply-1",
      type: "NOTE",
      authorId: "demo-user-2",
      content: "散布後の虫数の変化が気になります。",
      createdAt: new Date(now - 1000 * 60 * 10),
      likeCount: 1,
      replyCount: 0,
      replyToPostId: "post-note-1",
      productId: null
    },
    {
      id: "post-community-1",
      type: "NOTE",
      authorId: "demo-user",
      content: "有機栽培で使える資材の情報をまとめ中です。",
      createdAt: new Date(now - 1000 * 60 * 45),
      likeCount: 4,
      replyCount: 0,
      replyToPostId: null,
      productId: null,
      communityId: "com-organic"
    }
  ];

  const questions: DemoQuestion[] = [
    {
      id: "q-1",
      productId: "prod-mospilan",
      authorId: "demo-user",
      title: "希釈倍率のおすすめは？",
      content: "キャベツで使う場合、何倍が適正でしょうか。",
      createdAt: new Date(now - 1000 * 60 * 60 * 12)
    }
  ];

  return {
    users,
    categories,
    products,
    communities,
    questions,
    posts
  };
};

export const getDemoStore = () => {
  const globalStore = globalThis as DemoStoreGlobal;
  if (!globalStore.demoStore) {
    globalStore.demoStore = createInitialStore();
  }
  return globalStore.demoStore;
};

export const listDemoCategories = () => getDemoStore().categories;

export const findDemoCategoryBySlug = (slug: string) =>
  getDemoStore().categories.find((category) => category.slug === slug) ?? null;

export const findDemoCategoryById = (id: string) =>
  getDemoStore().categories.find((category) => category.id === id) ?? null;

export const listDemoProducts = () => getDemoStore().products;

export const findDemoProductBySlug = (slug: string) =>
  getDemoStore().products.find((product) => product.slug === slug) ?? null;

export const listDemoProductsByCategoryId = (categoryId: string) =>
  getDemoStore().products.filter((product) => product.categoryId === categoryId);

export const listDemoCommunities = () => getDemoStore().communities;

export const findDemoCommunityBySlug = (slug: string) =>
  getDemoStore().communities.find((community) => community.slug === slug) ?? null;

export const listDemoQuestionsByProductId = (productId: string) =>
  getDemoStore().questions.filter((question) => question.productId === productId);

export const findDemoUserByHandle = (handle: string) =>
  getDemoStore().users.find((user) => user.handle === handle) ?? null;

export const updateDemoUser = (userId: string, data: Partial<DemoUser>) => {
  const store = getDemoStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (user) {
    Object.assign(user, data);
  }
  return user ?? null;
};

const getDemoUserById = (userId: string) =>
  getDemoStore().users.find((user) => user.id === userId) ?? null;

const getDemoProductById = (productId: string) =>
  getDemoStore().products.find((product) => product.id === productId) ?? null;

export const listDemoPosts = () => getDemoStore().posts;

export const listDemoPostsWithRelations = (filter?: {
  replyToPostId?: string | null;
  productId?: string;
  communityId?: string;
  authorId?: string;
  type?: "REVIEW" | "LOG";
}) => {
  const posts = getDemoStore().posts.filter((post) => {
    const replyTarget = post.replyToPostId ?? null;
    if (filter?.replyToPostId !== undefined && replyTarget !== filter.replyToPostId) {
      return false;
    }
    if (filter?.productId && post.productId !== filter.productId) {
      return false;
    }
    if (filter?.communityId && post.communityId !== filter.communityId) {
      return false;
    }
    if (filter?.authorId && post.authorId !== filter.authorId) {
      return false;
    }
    if (filter?.type && post.type !== filter.type) {
      return false;
    }
    return true;
  });

  return posts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((post) => ({
      ...post,
      author: getDemoUserById(post.authorId),
      product: post.productId ? getDemoProductById(post.productId) : null
    }))
    .filter((post) => post.author);
};

export const findDemoPostWithRelations = (id: string) => {
  const post = getDemoStore().posts.find((entry) => entry.id === id);
  if (!post) return null;
  return {
    ...post,
    author: getDemoUserById(post.authorId),
    product: post.productId ? getDemoProductById(post.productId) : null
  };
};

export const listDemoRepliesWithRelations = (replyToPostId: string) =>
  listDemoPostsWithRelations({ replyToPostId });

export const createDemoPost = (
  payload: Omit<DemoPost, "id" | "createdAt" | "likeCount" | "replyCount">
) => {
  const store = getDemoStore();
  const post: DemoPost = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    likeCount: 0,
    replyCount: 0,
    ...payload,
    replyToPostId: payload.replyToPostId ?? null,
    productId: payload.productId ?? null,
    communityId: payload.communityId ?? null
  };
  store.posts.push(post);
  if (post.replyToPostId) {
    const parent = store.posts.find((entry) => entry.id === post.replyToPostId);
    if (parent) {
      parent.replyCount += 1;
    }
  }
  return post;
};

export const getDemoProductOptions = () =>
  listDemoProducts().map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug
  }));
