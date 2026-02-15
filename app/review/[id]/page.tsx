'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { PostwallSection } from '@/app/_components/PostwallSection';
import { RatingStars } from '@/app/_components/RatingStars';
import { useMockStore } from '@/app/_context/MockStore';

export default function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { reviews, user } = useMockStore();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const review = reviews.find((item) => item.id === id);
  if (!review) return notFound();

  const avgRating = Math.round((review.ratings.effect + review.ratings.cost + review.ratings.ease) / 3);
  const otherReviews = reviews.filter((item) => item.productName === review.productName && item.id !== review.id);

  return (
    <main className="space-y-4 px-4 py-4 pb-24">
      <Link href="/" className="text-sm text-primary">
        ← 戻る
      </Link>
      <div className="relative h-60 w-full overflow-hidden rounded-xl">
        <Image src={review.photos[photoIndex]} alt={review.productName} fill className="object-cover" />
      </div>
      {review.photos.length > 1 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="min-h-11 rounded-xl border border-divider px-4"
            onClick={() => setPhotoIndex((prev) => (prev === 0 ? review.photos.length - 1 : prev - 1))}
          >
            ←
          </button>
          <button
            type="button"
            className="min-h-11 rounded-xl border border-divider px-4"
            onClick={() => setPhotoIndex((prev) => (prev === review.photos.length - 1 ? 0 : prev + 1))}
          >
            →
          </button>
        </div>
      )}

      <section className="space-y-2 border-b border-divider pb-4">
        <h1>{review.productName}</h1>
        <RatingStars value={avgRating} />
        <p className="text-sm text-subtext">
          {review.crop} / {review.cultivation} / {review.region} / {review.dateISO}
        </p>
      </section>

      <section className="space-y-2 border-b border-divider pb-4">
        <p className="text-sm">効き目</p>
        <RatingStars value={review.ratings.effect} />
        <p className="text-sm">コスパ</p>
        <RatingStars value={review.ratings.cost} />
        <p className="text-sm">扱いやすさ</p>
        <RatingStars value={review.ratings.ease} />
      </section>

      <section className="space-y-2 border-b border-divider pb-4">
        <p className={`text-sm leading-6 ${expanded ? '' : 'line-clamp-6'}`}>{review.body}</p>
        {!expanded && (
          <button type="button" className="text-sm text-primary" onClick={() => setExpanded(true)}>
            続きを読む
          </button>
        )}
      </section>

      <section className="flex gap-3 border-b border-divider pb-4 text-sm text-subtext">
        <button className="min-h-11 rounded-xl border border-divider px-4">👍 参考になった {review.likes}</button>
        <button className="min-h-11 rounded-xl border border-divider px-4">💬 コメント {review.commentsCount}</button>
      </section>

      <Link
        href="/post"
        className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white"
      >
        あなたも使いましたか？→ レビューを書く
      </Link>

      <PostwallSection reviews={otherReviews} hasPosted={user.postsCount > 0} />
    </main>
  );
}
