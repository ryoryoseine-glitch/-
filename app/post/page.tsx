import Link from 'next/link';
import { PostStepWizard } from '@/app/_components/PostStepWizard';

export default function PostPage() {
  return (
    <main className="space-y-4 px-4 py-4">
      <Link href="/" className="text-sm text-primary">
        ← ホームへ戻る
      </Link>
      <h1>30秒レビュー投稿</h1>
      <PostStepWizard />
    </main>
  );
}
