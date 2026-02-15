import Image from 'next/image';
import Link from 'next/link';
import { Review } from '@/app/_data/mock';
import { RatingStars } from '@/app/_components/RatingStars';

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <Link href={`/review/${review.id}`} className="block overflow-hidden rounded-xl bg-white shadow-card">
      <div className="relative h-60 w-full">
        <Image src={review.photos[0]} alt={review.productName} fill className="object-cover" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-semibold text-text">{review.productName}</p>
          <RatingStars value={Math.round((review.ratings.effect + review.ratings.cost + review.ratings.ease) / 3)} size="sm" />
        </div>
        <p className="text-xs text-subtext">
          {review.crop} / {review.region}
        </p>
        <p className="line-clamp-2 text-sm text-text">{review.body}</p>
        <div className="flex gap-4 text-xs text-subtext">
          <span>👍 {review.likes}</span>
          <span>💬 {review.commentsCount}</span>
        </div>
      </div>
    </Link>
  );
}
