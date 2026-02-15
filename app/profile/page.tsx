'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReviewCard } from '@/app/_components/ReviewCard';
import { useMockStore } from '@/app/_context/MockStore';

export default function ProfilePage() {
  const { user, reviews } = useMockStore();
  const myReviews = reviews.filter((review) => review.author.name === user.farmName);

  return (
    <main className="space-y-4 px-4 py-4 pb-20">
      <Link href="/" className="text-sm text-primary">
        ← 戻る
      </Link>
      <section className="rounded-xl border border-divider p-4 text-center">
        <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full bg-green-100">
          <Image src="/placeholders/review1.svg" alt="icon" width={80} height={80} className="h-full w-full object-cover" />
        </div>
        <h1>{user.farmName}</h1>
        <p className="text-sm text-subtext">{user.region}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <p>Lv {user.level}</p>
          <p>投稿 {user.postsCount}</p>
          <p>参考 {user.helpfulCount}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">自分の投稿</h2>
        {myReviews.length === 0 ? (
          <p className="text-sm text-subtext">まだ投稿がありません。最初のレビューを書いてみましょう。</p>
        ) : (
          myReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </section>
    </main>
  );
}
