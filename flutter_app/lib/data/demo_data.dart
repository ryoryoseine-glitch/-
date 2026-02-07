import '../models.dart';

const demoUser = DemoUser(
  id: 'demo-user',
  handle: 'demo',
  name: 'Demo User',
);

const demoReviewer = DemoUser(
  id: 'demo-user-2',
  handle: 'agrinote',
  name: 'Agri Note',
);

const demoProducts = [
  DemoProduct(
    id: 'prod-mospilan',
    slug: 'mospilan',
    name: 'モスピラン',
    description: 'アブラムシ対策に使いやすい浸透移行性の農薬。',
    categoryName: '農薬',
    avgRating: 4.2,
    reviewCount: 18,
  ),
  DemoProduct(
    id: 'prod-greenplus',
    slug: 'greenplus',
    name: 'グリーンプラス',
    description: '初期育成を支える微量要素入り肥料。',
    categoryName: '肥料',
    avgRating: 3.9,
    reviewCount: 7,
  ),
];

final demoPosts = [
  DemoPost(
    id: 'post-note-1',
    type: 'NOTE',
    author: demoUser,
    content: 'デモ投稿です。新しい散布スケジュールを検討中。',
    createdAt: DateTime.now().subtract(const Duration(minutes: 20)),
    likeCount: 3,
    replyCount: 1,
  ),
  DemoPost(
    id: 'post-review-1',
    type: 'REVIEW',
    author: demoReviewer,
    content: 'モスピランは速効性が高く、葉裏まで効きました。',
    createdAt: DateTime.now().subtract(const Duration(hours: 3)),
    likeCount: 8,
    replyCount: 0,
    product: demoProducts.first,
  ),
  DemoPost(
    id: 'post-log-1',
    type: 'LOG',
    author: demoUser,
    content: '雨上がりに散布。希釈倍率は1000倍。',
    createdAt: DateTime.now().subtract(const Duration(hours: 5)),
    likeCount: 2,
    replyCount: 0,
    product: demoProducts.first,
  ),
];

const demoCommunities = [
  DemoCommunity(
    id: 'com-organic',
    slug: 'organic-growers',
    name: '有機栽培コミュニティ',
    description: '有機・減農薬での知見を共有しましょう。',
  ),
];
