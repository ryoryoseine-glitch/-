import 'package:flutter/material.dart';

import '../models.dart';

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
