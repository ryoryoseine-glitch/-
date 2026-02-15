import Link from 'next/link';
import { Review } from '@/app/_data/mock';
import { ReviewCard } from '@/app/_components/ReviewCard';

type Props = {
  reviews: Review[];
  hasPosted: boolean;
};

export function PostwallSection({ reviews, hasPosted }: Props) {
  return (
    <section className="space-y-3 border-t border-divider pt-4">
      <h2 className="text-base font-semibold text-text">他のレビュー</h2>
      <div className="space-y-3">
        {reviews.map((review, index) => {
          const isLocked = !hasPosted && index >= 3;
          if (!isLocked) {
            return <ReviewCard key={review.id} review={review} />;
          }

          return (
            <div
              key={review.id}
              className="rounded-xl border border-divider bg-gray-100 p-4 text-center text-sm text-subtext"
            >
              🔒 続きを見るには1件投稿が必要です
              <div className="mt-3">
                <Link
                  href="/post"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-white"
                >
                  レビューを書く
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
