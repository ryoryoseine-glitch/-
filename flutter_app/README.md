# Flutter Demo Client

このディレクトリは、農業資材レビューSNSの「触感」を確認するためのFlutterデモアプリです。

## 起動方法

```bash
cd flutter_app
flutter pub get
flutter run
```

## 画面

- `/` ホーム（タイムライン + コンポーザー）
- `/compose` 投稿作成
- `/p/mospilan` 商品詳細（概要/レビュー/ログ/Q&A）
- `/communities` コミュニティ一覧

データは `lib/main.dart` 内の固定データです（1ファイル完結）。
