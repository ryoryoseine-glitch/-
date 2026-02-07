import 'package:flutter/material.dart';

import '../data/demo_data.dart';
import '../models.dart';

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
