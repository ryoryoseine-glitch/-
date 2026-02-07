import Link from "next/link";

import ProductHeader from "@/components/products/ProductHeader";
import ProductTabs from "@/components/products/ProductTabs";
import RatingSummary from "@/components/products/RatingSummary";
import PostThread from "@/components/posts/PostThread";
import QuestionList from "@/components/community/QuestionList";
import {
  DEMO_MODE,
  findDemoCategoryById,
  findDemoProductBySlug,
  listDemoQuestionsByProductId
} from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { getProductPosts } from "@/lib/posts";

const ProductDetailPage = async ({ params }: { params: { productSlug: string } }) => {
  const product = DEMO_MODE
    ? (() => {
        const demoProduct = findDemoProductBySlug(params.productSlug);
        if (!demoProduct) return null;
        const category = findDemoCategoryById(demoProduct.categoryId);
        return {
          ...demoProduct,
          category
        };
      })()
    : await prisma.product.findUnique({
        where: { slug: params.productSlug },
        include: { category: true }
      });

  if (!product) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-600">商品が見つかりません。</p>
      </div>
    );
  }

  const [reviews, logs, questions] = await Promise.all([
    getProductPosts({ productId: product.id, type: "REVIEW" }),
    getProductPosts({ productId: product.id, type: "LOG" }),
    DEMO_MODE
      ? Promise.resolve(listDemoQuestionsByProductId(product.id))
      : prisma.question.findMany({
          where: { productId: product.id },
          orderBy: { createdAt: "desc" }
        })
  ]);

  const reviewPosts = reviews.items.map((post) => ({
    id: post.id,
    type: post.type,
    author: { name: post.author.name, handle: post.author.handle },
    content: post.content,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    replyCount: post.replyCount,
    product: { name: product.name, slug: product.slug }
  }));

  const logPosts = logs.items.map((post) => ({
    id: post.id,
    type: post.type,
    author: { name: post.author.name, handle: post.author.handle },
    content: post.content,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    replyCount: post.replyCount,
    product: { name: product.name, slug: product.slug }
  }));

  return (
    <div className="rounded-3xl border border-ink-200 bg-white shadow-sm">
      <ProductHeader
        name={product.name}
        description={product.description}
        actions={
          <Link
            className="rounded-full border border-ink-200 px-3 py-1 text-xs"
            href={`/p/${product.slug}/review/new`}
          >
            レビューを書く
          </Link>
        }
      />
      <ProductTabs />
      <div className="grid gap-4 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section id="overview">
            <h3 className="text-sm font-semibold">概要</h3>
            <p className="mt-2 text-sm text-ink-600">
              カテゴリ: {product.category?.name ?? "未分類"}
            </p>
          </section>
          <section id="reviews">
            <h3 className="text-sm font-semibold">レビュー</h3>
            <PostThread posts={reviewPosts} />
          </section>
          <section id="logs">
            <h3 className="text-sm font-semibold">使用ログ</h3>
            <PostThread posts={logPosts} />
          </section>
          <section id="qa">
            <h3 className="text-sm font-semibold">Q&A</h3>
            <QuestionList questions={questions} />
          </section>
        </div>
        <div className="space-y-4">
          <RatingSummary avgRating={product.avgRating} reviewCount={product.reviewCount} />
          <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">関連情報</p>
            <p className="mt-2 text-xs text-ink-500">メーカーや成分情報を準備中です。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
