import Link from 'next/link';

export function FabPostButton() {
  return (
    <Link
      href="/post"
      className="fixed bottom-6 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-3xl text-white shadow-lg"
      aria-label="レビュー投稿"
    >
      +
    </Link>
  );
}
