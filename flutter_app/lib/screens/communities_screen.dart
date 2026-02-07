import 'package:flutter/material.dart';

import '../data/demo_data.dart';

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
