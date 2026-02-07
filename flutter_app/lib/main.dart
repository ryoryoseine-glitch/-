import 'package:flutter/material.dart';

import 'data/demo_data.dart';
import 'screens/communities_screen.dart';
import 'screens/compose_screen.dart';
import 'screens/home_screen.dart';
import 'screens/product_screen.dart';

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
