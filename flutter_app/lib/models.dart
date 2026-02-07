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
