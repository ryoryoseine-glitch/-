import 'package:flutter/material.dart';

import '../components/composer.dart';
import '../components/post_card.dart';
import '../data/demo_data.dart';

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
