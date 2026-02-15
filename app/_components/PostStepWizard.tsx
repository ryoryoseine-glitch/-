'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RatingStars } from '@/app/_components/RatingStars';
import { useMockStore } from '@/app/_context/MockStore';

const productSuggestions = ['グリーンガードA', 'ネオプロテクト', 'バイオシールド', 'セーフミスト'];

export function PostStepWizard() {
  const { addReview } = useMockStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState('/placeholders/review1.svg');
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [crop, setCrop] = useState('トマト');
  const [cultivation, setCultivation] = useState<'ハウス' | '露地'>('ハウス');
  const [effect, setEffect] = useState(4);
  const [cost, setCost] = useState(3);
  const [ease, setEase] = useState(4);
  const [body, setBody] = useState('');
  const [showToast, setShowToast] = useState(false);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const nextObjectUrl = URL.createObjectURL(file);
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return nextObjectUrl;
      });
      setPhoto(nextObjectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const submit = () => {
    addReview({
      productName: productName || '未入力資材',
      crop,
      region: '愛知東部',
      cultivation,
      ratings: { effect, cost, ease },
      body,
      photos: [photo]
    });
    setShowToast(true);
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-subtext">Step {step}/3</div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-divider p-4">
            <p className="mb-2 text-sm text-subtext">写真を撮る / 選ぶ</p>
            <input type="file" accept="image/*" onChange={onSelectFile} className="min-h-11 w-full" />
            <div className="mt-3 overflow-hidden rounded-xl border border-divider">
              <div className="relative h-40 w-full">
                <Image src={photo} alt="投稿写真プレビュー" fill className="object-cover" unoptimized />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">資材名</label>
            <input
              list="products"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="h-12 w-full rounded-xl border border-divider px-3"
              placeholder="資材名を入力"
            />
            <datalist id="products">
              {productSuggestions.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">作物</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="h-12 w-full rounded-xl border border-divider px-3"
            >
              <option>トマト</option>
              <option>きゅうり</option>
              <option>なす</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">栽培形態</label>
            <select
              value={cultivation}
              onChange={(e) => setCultivation(e.target.value as 'ハウス' | '露地')}
              className="h-12 w-full rounded-xl border border-divider px-3"
            >
              <option value="ハウス">ハウス</option>
              <option value="露地">露地</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">効き目</label>
            <RatingStars value={effect} onChange={setEffect} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">コスパ</label>
            <RatingStars value={cost} onChange={setCost} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">扱いやすさ</label>
            <RatingStars value={ease} onChange={setEase} />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="mb-1 block text-sm font-semibold">レビュー本文</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-36 w-full rounded-xl border border-divider p-3"
            placeholder="例）どの病害虫に効いたか、散布タイミング、使いやすさを教えてください"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="min-h-11 flex-1 rounded-xl border border-divider"
          >
            戻る
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => prev + 1)}
            className="min-h-11 flex-1 rounded-xl bg-primary text-white"
          >
            次へ
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="h-14 flex-1 rounded-xl bg-primary font-semibold text-white"
          >
            送信する
          </button>
        )}
      </div>

      {showToast && (
        <div className="fixed left-1/2 top-24 w-[88%] max-w-sm -translate-x-1/2 rounded-xl bg-black/85 p-4 text-center text-sm text-white">
          投稿ありがとうございます！地域レビュアーLv1
        </div>
      )}
    </div>
  );
}
