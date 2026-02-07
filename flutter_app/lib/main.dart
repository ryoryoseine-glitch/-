import 'package:flutter/material.dart';

void main() {
  runApp(const AgriDemoApp());
}

class AgriDemoApp extends StatelessWidget {
  const AgriDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Agri Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF2E7D32)),
        useMaterial3: true,
      ),
      routes: {
        '/': (_) => const HomeScreen(),
        '/compose': (_) => const ComposeScreen(),
        '/communities': (_) => const CommunitiesScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name?.startsWith('/p/') ?? false) {
          final slug = settings.name!.replaceFirst('/p/', '');
          final product = demoProducts.firstWhere(
            (item) => item.slug == slug,
            orElse: () => demoProducts.first,
          );
          return MaterialPageRoute(
            builder: (_) => ProductScreen(product: product),
          );
        }
        return null;
      },
    );
  }
}

class DemoUser {
  final String id;
  final String handle;
  final String name;
  final String? imageUrl;

  const DemoUser({
    required this.id,
    required this.handle,
    required this.name,
    this.imageUrl,
  });
}

class DemoProduct {
  final String id;
  final String slug;
  final String name;
  final String? description;
  final String categoryName;
  final double avgRating;
  final int reviewCount;

  const DemoProduct({
    required this.id,
    required this.slug,
    required this.name,
    this.description,
    required this.categoryName,
    required this.avgRating,
    required this.reviewCount,
  });
}

class DemoPost {
  final String id;
  final String type;
  final DemoUser author;
  final String content;
  final DateTime createdAt;
  final int likeCount;
  final int replyCount;
  final DemoProduct? product;

  const DemoPost({
    required this.id,
    required this.type,
    required this.author,
    required this.content,
    required this.createdAt,
    required this.likeCount,
    required this.replyCount,
    this.product,
  });
}

class DemoCommunity {
  final String id;
  final String slug;
  final String name;
  final String? description;

  const DemoCommunity({
    required this.id,
    required this.slug,
    required this.name,
    this.description,
  });
}

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

class PostCard extends StatelessWidget {
  final DemoPost post;

  const PostCard({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE4E7EC)),
        color: Colors.white,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: const Color(0xFFE4E7EC),
                child: Text(post.author.name.characters.first),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    post.author.name,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  Text(
                    '@${post.author.handle}',
                    style: const TextStyle(fontSize: 12, color: Color(0xFF667085)),
                  ),
                ],
              ),
              const Spacer(),
              Text(
                _formatTime(post.createdAt),
                style: const TextStyle(fontSize: 12, color: Color(0xFF98A2B3)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(post.content),
          if (post.product != null) ...[
            const SizedBox(height: 8),
            Text(
              '関連商品: ${post.product!.name}',
              style: const TextStyle(fontSize: 12, color: Color(0xFF475467)),
            ),
          ],
          const SizedBox(height: 12),
          Row(
            children: [
              _StatChip(label: 'いいね', value: post.likeCount),
              const SizedBox(width: 8),
              _StatChip(label: '返信', value: post.replyCount),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: const Color(0xFFEFF4FF),
                ),
                child: Text(
                  post.type,
                  style: const TextStyle(fontSize: 11, color: Color(0xFF3538CD)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _formatTime(DateTime time) {
    final duration = DateTime.now().difference(time);
    if (duration.inMinutes < 60) {
      return '${duration.inMinutes}分前';
    }
    if (duration.inHours < 24) {
      return '${duration.inHours}時間前';
    }
    return '${duration.inDays}日前';
  }
}

class _StatChip extends StatelessWidget {
  final String label;
  final int value;

  const _StatChip({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: const Color(0xFFF2F4F7),
      ),
      child: Text(
        '$label $value',
        style: const TextStyle(fontSize: 11, color: Color(0xFF475467)),
      ),
    );
  }
}

class Composer extends StatefulWidget {
  final DemoProduct? initialProduct;

  const Composer({super.key, this.initialProduct});

  @override
  State<Composer> createState() => _ComposerState();
}

class _ComposerState extends State<Composer> {
  String _type = 'NOTE';
  DemoProduct? _selectedProduct;
  final _contentController = TextEditingController();
  final _ratingController = TextEditingController();
  final _usedAtController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _selectedProduct = widget.initialProduct ?? demoProducts.first;
  }

  @override
  void dispose() {
    _contentController.dispose();
    _ratingController.dispose();
    _usedAtController.dispose();
    super.dispose();
  }

  void _submit() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$_type 投稿を送信しました（デモ）')),
    );
    _contentController.clear();
    _ratingController.clear();
    _usedAtController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE4E7EC)),
        color: Colors.white,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 8,
            children: ['NOTE', 'REVIEW', 'LOG']
                .map(
                  (value) => ChoiceChip(
                    label: Text(value),
                    selected: _type == value,
                    onSelected: (_) => setState(() => _type = value),
                  ),
                )
                .toList(),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _contentController,
            maxLines: 4,
            decoration: const InputDecoration(
              hintText: '農薬・資材の気づきを共有しましょう',
              border: OutlineInputBorder(),
            ),
          ),
          if (_type != 'NOTE') ...[
            const SizedBox(height: 12),
            DropdownButtonFormField<DemoProduct>(
              value: _selectedProduct,
              items: demoProducts
                  .map(
                    (product) => DropdownMenuItem(
                      value: product,
                      child: Text(product.name),
                    ),
                  )
                  .toList(),
              onChanged: (value) => setState(() => _selectedProduct = value),
              decoration: const InputDecoration(
                labelText: '関連商品',
                border: OutlineInputBorder(),
              ),
            ),
          ],
          if (_type == 'REVIEW') ...[
            const SizedBox(height: 12),
            TextField(
              controller: _ratingController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: '総合評価 (1-5)',
                border: OutlineInputBorder(),
              ),
            ),
          ],
          if (_type == 'LOG') ...[
            const SizedBox(height: 12),
            TextField(
              controller: _usedAtController,
              decoration: const InputDecoration(
                labelText: '使用日',
                hintText: '2024-05-10',
                border: OutlineInputBorder(),
              ),
            ),
          ],
          const SizedBox(height: 16),
          Align(
            alignment: Alignment.centerRight,
            child: ElevatedButton(
              onPressed: _submit,
              child: const Text('投稿'),
            ),
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ホーム / ForYou'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Composer(),
          const SizedBox(height: 16),
          ...demoPosts.map((post) => PostCard(post: post)),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.pushNamed(context, '/compose'),
        icon: const Icon(Icons.edit),
        label: const Text('投稿'),
      ),
    );
  }
}

class ComposeScreen extends StatelessWidget {
  const ComposeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('投稿作成')),
      body: const Padding(
        padding: EdgeInsets.all(16),
        child: Composer(),
      ),
    );
  }
}

class ProductScreen extends StatelessWidget {
  final DemoProduct product;

  const ProductScreen({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final reviews = demoPosts.where((post) => post.type == 'REVIEW').toList();
    final logs = demoPosts.where((post) => post.type == 'LOG').toList();

    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: Text(product.name),
          bottom: const TabBar(
            tabs: [
              Tab(text: '概要'),
              Tab(text: 'レビュー'),
              Tab(text: 'ログ'),
              Tab(text: 'Q&A'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _OverviewTab(product: product),
            _PostListTab(posts: reviews),
            _PostListTab(posts: logs),
            _QATab(product: product),
          ],
        ),
      ),
    );
  }
}

class _OverviewTab extends StatelessWidget {
  final DemoProduct product;

  const _OverviewTab({required this.product});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(product.description ?? '説明は準備中です。'),
        const SizedBox(height: 12),
        Text('カテゴリ: ${product.categoryName}'),
        const SizedBox(height: 12),
        Text('平均評価: ${product.avgRating} (${product.reviewCount}件)'),
        const SizedBox(height: 20),
        Composer(initialProduct: product),
      ],
    );
  }
}

class _PostListTab extends StatelessWidget {
  final List<DemoPost> posts;

  const _PostListTab({required this.posts});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: posts.map((post) => PostCard(post: post)).toList(),
    );
  }
}

class _QATab extends StatelessWidget {
  final DemoProduct product;

  const _QATab({required this.product});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        ListTile(
          title: Text('希釈倍率のおすすめは？'),
          subtitle: Text('キャベツで使う場合、何倍が適正でしょうか。'),
        ),
      ],
    );
  }
}

class CommunitiesScreen extends StatelessWidget {
  const CommunitiesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('コミュニティ')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: demoCommunities.length,
        itemBuilder: (context, index) {
          final community = demoCommunities[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              title: Text(community.name),
              subtitle: Text(community.description ?? '説明は準備中'),
            ),
          );
        },
      ),
    );
  }
}
