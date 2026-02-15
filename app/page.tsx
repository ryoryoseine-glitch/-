'use client';

import Link from 'next/link';
import { FabPostButton } from '@/app/_components/FabPostButton';
import { RegionSelector } from '@/app/_components/RegionSelector';
import { ReviewCard } from '@/app/_components/ReviewCard';
import { SearchBar } from '@/app/_components/SearchBar';
import { useMockStore } from '@/app/_context/MockStore';

export default function Home() {
  const { reviews } = useMockStore();

  return (
    <main className="pb-24">
      <header className="sticky top-0 z-10 h-[72px] border-b border-divider bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <RegionSelector />
        </div>
      </header>

      <div className="space-y-4 p-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <FabPostButton />
      <nav className="fixed bottom-0 left-1/2 flex h-14 w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-divider bg-white">
        <Link className="text-sm font-semibold text-primary" href="/">
          ホーム
        </Link>
        <Link className="text-sm text-subtext" href="/profile">
          プロフィール
        </Link>
      </nav>
    </main>
  );
}
