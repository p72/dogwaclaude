# 🐕 犬監視カメラ (Dog Monitoring Camera)

Claudeの画像認識を使って、犬が動いたときに通知してくれるWebアプリです!

## 特徴

- 📹 リアルタイムカメラ映像の監視
- 🤖 Claude AIによる犬の動き検知
- 🔔 動きを検知したらアラート音で通知
- 📱 スマホ・タブレット対応

## セットアップ

### 1. 必要なもの

- Node.js (v14以上)
- Anthropic APIキー ([こちら](https://console.anthropic.com/)から取得)

### 2. インストール

```bash
# 依存パッケージをインストール
npm install
```

### 3. サーバーの起動

```bash
# サーバーを起動
npm start

# または開発モード (自動再起動)
npm run dev
```

サーバーが起動したら、ブラウザで `http://localhost:3000` にアクセスしてください。

## 使い方

1. **APIキーを設定**
   - ページ上部の「Claude APIキー設定」にAPIキーを入力
   - 「保存」ボタンをクリック

2. **カメラの許可**
   - ブラウザがカメラのアクセス許可を求めたら「許可」をクリック

3. **監視を開始**
   - 「📹 監視を開始」ボタンをクリック
   - 5秒ごとにClaudeが犬の様子をチェックします

4. **アラートを受け取る**
   - 犬が動いたら、アラート音が鳴ります 🔔

## 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript (Vanilla)
- **バックエンド**: Node.js, Express
- **AI**: Claude API (Anthropic)

## セキュリティについて

このアプリはAPIキーをlocalStorageに保存します。APIキーはサーバー経由でのみClaude APIに送信され、ブラウザから直接送信されることはありません。

⚠️ **注意**: localStorageは暗号化されていないため、共有PCでは使用を避けてください。

## トラブルシューティング

### カメラにアクセスできない

- ブラウザの設定でカメラの許可を確認してください
- HTTPSまたはlocalhostでのみカメラアクセスが可能です

### Claude APIエラー

- APIキーが正しいか確認してください
- APIキーの使用量制限を超えていないか確認してください
- [Anthropic Console](https://console.anthropic.com/)で確認できます

## ライセンス

MIT
