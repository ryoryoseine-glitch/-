import 'package:flutter/material.dart';

import '../components/composer.dart';
import '../components/post_card.dart';
import '../data/demo_data.dart';
import '../models.dart';

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
  final List posts;

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
