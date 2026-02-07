import clsx from "clsx";
import Link from "next/link";

import { formatDistanceToNowStrict } from "./formatters";

export type PostCardProps = {
  id: string;
  type: "NOTE" | "REVIEW" | "LOG";
  author: { name: string | null; handle: string };
  content: string | null;
  createdAt: Date;
  likeCount: number;
  replyCount: number;
  product?: { name: string; slug: string } | null;
};

const badgeStyles = {
  NOTE: "bg-ink-100 text-ink-700",
  REVIEW: "bg-mint-500/10 text-mint-600",
  LOG: "bg-ink-900/10 text-ink-900"
};

const PostCard = ({
  id,
  type,
  author,
  content,
  createdAt,
  likeCount,
  replyCount,
  product
}: PostCardProps) => {
  return (
    <article className="border-b border-ink-200 px-4 py-4">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-9 w-9 rounded-full bg-ink-200" />
        <div className="flex flex-col">
          <span className="font-semibold text-ink-900">{author.name ?? "名無し"}</span>
          <span className="text-xs text-ink-500">@{author.handle}</span>
        </div>
        <span className="ml-auto text-xs text-ink-400">
          {formatDistanceToNowStrict(createdAt)}前
        </span>
      </div>
      <div className="mt-3 space-y-2 text-sm">
        <span className={clsx("inline-flex rounded-full px-2 py-0.5 text-xs", badgeStyles[type])}>
          {type}
        </span>
        <p className="text-ink-800">{content || "(本文なし)"}</p>
        {product ? (
          <Link className="text-xs text-ink-600" href={`/p/${product.slug}`}>
            {product.name}のページへ
          </Link>
        ) : null}
      </div>
      <div className="mt-4 flex gap-6 text-xs text-ink-500">
        <Link href={`/post/${id}`}>返信 {replyCount}</Link>
        <span>いいね {likeCount}</span>
        <span>共有</span>
      </div>
    </article>
  );
};

export default PostCard;
