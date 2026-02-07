import 'package:flutter/material.dart';

import '../components/composer.dart';

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
