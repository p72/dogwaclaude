# Fix Claude API communication failures and add deployment support

## 概要

Claude APIとの通信エラーを修正し、複数のデプロイオプションを追加しました。

## 問題点

初期実装では以下の問題がありました：

1. **APIキー未設定**: Claude APIへのリクエストに必須の`x-api-key`ヘッダーが含まれていなかった
2. **CORS制限**: ブラウザから直接Anthropic APIを呼び出すとCORSエラーが発生
3. **デプロイ方法が不明**: ローカル以外での動作方法が不明確

## 解決策

### 1. APIキー設定UI追加

- パスワード入力フィールドでAPIキーを安全に入力
- localStorage に保存して永続化
- APIキー形式の検証 (`sk-ant-` で始まることを確認)

**変更ファイル**: `index.html`

### 2. Node.jsプロキシサーバーの追加

CORS問題を解決するため、バックエンドプロキシを実装：

```
ブラウザ → Express Server → Anthropic API
         ↑ CORS OK       ↑ Server-to-Server OK
```

**追加ファイル**:
- `server.js` - Express.jsプロキシサーバー
- `package.json` - Node.js依存関係
- `.gitignore` - node_modules等を除外

### 3. 複数のデプロイオプション

様々な環境でのデプロイをサポート：

#### ① Vercel (推奨)
- ワンクリックデプロイ
- `vercel.json` で設定

#### ② Cloudflare Workers + GitHub Pages
- 無料枠が大きい
- `worker.js` - Workersスクリプト
- `wrangler.toml` - CLI設定

#### ③ ローカル実行
- `npm start` で起動

**追加ファイル**: `README.md` (詳細な手順を記載)

## 変更内容

### 追加ファイル (8ファイル、+410行)

| ファイル | 目的 |
|---------|------|
| `.gitignore` | node_modulesなどを除外 |
| `README.md` | セットアップ・デプロイ手順 |
| `package.json` | Node.js依存関係定義 |
| `server.js` | Express APIプロキシ |
| `vercel.json` | Vercelデプロイ設定 |
| `worker.js` | Cloudflare Workers用コード |
| `wrangler.toml` | Wrangler CLI設定 |

### 変更ファイル

| ファイル | 変更内容 |
|---------|---------|
| `index.html` | APIキーUI追加、fetch先を/api/claudeに変更、エラーハンドリング改善 |

## テスト手順

### ローカル環境
```bash
npm install
npm start
# http://localhost:3000 にアクセス
# APIキーを設定して監視開始
```

### Vercel
```bash
vercel deploy
# デプロイされたURLにアクセス
```

### Cloudflare Workers
```bash
npm install -g wrangler
wrangler publish
# Worker URLを取得してindex.htmlを更新
```

## セキュリティ

- APIキーはlocalStorageに保存（暗号化なし）
- サーバー経由でのみAPIキーを送信
- ブラウザから直接APIキーが送信されることはない
- 共有PCでの使用は推奨しない

## スクリーンショット

修正前:
- ❌ "Claudeとの通信でエラーが出たで😢"

修正後:
- ✅ APIキー設定UI
- ✅ 正常なAPI通信
- ✅ 犬の動き検知が動作

## 関連Issue

Fixes: 初期実装時のClaude API通信エラー

## チェックリスト

- [x] コードが正常に動作することを確認
- [x] README.mdに詳細な手順を記載
- [x] 複数のデプロイオプションを提供
- [x] エラーハンドリングを改善
- [x] セキュリティ上の注意点を文書化
