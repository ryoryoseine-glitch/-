export type CultivationType = 'ハウス' | '露地';

export type Review = {
  id: string;
  productName: string;
  crop: string;
  region: string;
  cultivation: CultivationType;
  dateISO: string;
  ratings: {
    effect: number;
    cost: number;
    ease: number;
  };
  body: string;
  photos: string[];
  likes: number;
  commentsCount: number;
  author: {
    name: string;
    isInfluencer: boolean;
  };
};

export type User = {
  id: string;
  farmName: string;
  region: string;
  level: number;
  postsCount: number;
  helpfulCount: number;
};

export const mockUser: User = {
  id: 'u1',
  farmName: 'みどり農園',
  region: '愛知東部',
  level: 1,
  postsCount: 0,
  helpfulCount: 28
};

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productName: 'グリーンガードA',
    crop: 'トマト',
    region: '愛知東部',
    cultivation: 'ハウス',
    dateISO: '2026-01-20',
    ratings: { effect: 5, cost: 4, ease: 4 },
    body: 'うどんこ病対策で使用。散布から2日で広がりが止まり、収穫量への影響も少なかったです。混用時も詰まりにくく、現場で扱いやすい印象でした。',
    photos: ['/placeholders/review1.svg', '/placeholders/review2.svg'],
    likes: 14,
    commentsCount: 3,
    author: { name: '田中ファーム', isInfluencer: true }
  },
  {
    id: 'r2',
    productName: 'ネオプロテクト',
    crop: 'きゅうり',
    region: '静岡西部',
    cultivation: '露地',
    dateISO: '2026-01-18',
    ratings: { effect: 4, cost: 3, ease: 5 },
    body: '害虫の初期抑制には十分。価格はやや高めですが、希釈が分かりやすく初心者スタッフにも説明しやすかったです。',
    photos: ['/placeholders/review3.svg'],
    likes: 8,
    commentsCount: 1,
    author: { name: '浜松ベジ', isInfluencer: false }
  },
  {
    id: 'r3',
    productName: 'グリーンガードA',
    crop: 'ピーマン',
    region: '愛知東部',
    cultivation: 'ハウス',
    dateISO: '2026-01-15',
    ratings: { effect: 4, cost: 4, ease: 3 },
    body: '効き目は安定。散布時のにおいが少し強めなので、換気を意識したほうが安心です。',
    photos: ['/placeholders/review4.svg'],
    likes: 11,
    commentsCount: 2,
    author: { name: '豊橋アグリ', isInfluencer: false }
  },
  {
    id: 'r4',
    productName: 'グリーンガードA',
    crop: 'なす',
    region: '三河',
    cultivation: '露地',
    dateISO: '2026-01-12',
    ratings: { effect: 3, cost: 4, ease: 4 },
    body: '高温時は散布タイミングに注意。夕方散布に変えてから葉焼けリスクは減りました。',
    photos: ['/placeholders/review2.svg'],
    likes: 6,
    commentsCount: 0,
    author: { name: '三河なす農家', isInfluencer: false }
  },
  {
    id: 'r5',
    productName: 'グリーンガードA',
    crop: 'トマト',
    region: '岐阜南部',
    cultivation: 'ハウス',
    dateISO: '2026-01-10',
    ratings: { effect: 4, cost: 2, ease: 4 },
    body: '効き目は満足ですがコスト感は高い。病害が広がる前の予防利用向きだと思います。',
    photos: ['/placeholders/review1.svg'],
    likes: 4,
    commentsCount: 1,
    author: { name: 'ぎふトマト', isInfluencer: false }
  }
];
