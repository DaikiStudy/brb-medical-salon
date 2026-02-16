# BRBメディカルサロン - Netlify デプロイ手順書

## 📋 目次
1. [事前準備](#事前準備)
2. [Netlifyデプロイ手順](#netlifyデプロイ手順)
3. [公開後の確認](#公開後の確認)
4. [Google検索登録](#google検索登録)
5. [独自ドメイン設定（オプション）](#独自ドメイン設定オプション)
6. [更新方法](#更新方法)

---

## 事前準備

### 必要なもの
- ✅ GitHubアカウント（無料）
- ✅ Netlifyアカウント（無料）
- ✅ このプロジェクトのソースコード

### 1. GitHubアカウント作成
1. https://github.com にアクセス
2. 「Sign up」をクリックして無料アカウント作成
3. メールアドレスを認証

### 2. Netlifyアカウント作成
1. https://www.netlify.com にアクセス
2. 「Sign up」をクリック
3. **「Sign up with GitHub」を選択**（GitHubアカウントで連携）
4. GitHubとの連携を許可

---

## Netlifyデプロイ手順

### 方法1: GitHubリポジトリ経由（推奨）

#### Step 1: GitHubにコードをアップロード

1. **GitHubで新規リポジトリ作成**
   - GitHub にログイン → 右上の「+」→「New repository」
   - Repository name: `brb-medical-salon`
   - Public または Private を選択（どちらでもOK）
   - 「Create repository」クリック

2. **ローカルのコードをGitHubにプッシュ**
   ```bash
   cd brb-medical-salon
   git init
   git add .
   git commit -m "Initial commit: BRB Medical Salon website"
   git branch -M main
   git remote add origin https://github.com/あなたのユーザー名/brb-medical-salon.git
   git push -u origin main
   ```

#### Step 2: NetlifyでGitHubリポジトリをデプロイ

1. **Netlifyにログイン**
   - https://app.netlify.com にアクセス

2. **新規サイト作成**
   - 「Add new site」→「Import an existing project」をクリック

3. **GitHubと連携**
   - 「Deploy with GitHub」を選択
   - GitHubへのアクセスを許可
   - リポジトリ一覧から `brb-medical-salon` を選択

4. **ビルド設定**
   以下が自動で入力されているか確認（`netlify.toml`により自動設定）:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
   - そのまま「Deploy site」をクリック

5. **デプロイ完了を待つ**
   - 1〜3分でデプロイ完了
   - 緑色の「Published」と表示されたら成功

6. **公開URLを確認**
   - 自動生成されたURL: `https://ランダムな名前.netlify.app`
   - 画面上部に表示されます

#### Step 3: サイト名を変更（オプションだが推奨）

1. 「Site settings」をクリック
2. 「Change site name」をクリック
3. 新しい名前を入力: `brb-medical-salon`
4. 「Save」をクリック
5. 新しいURL: `https://brb-medical-salon.netlify.app`

---

### 方法2: ドラッグ&ドロップ（簡単だが推奨しない）

1. ローカルでビルド:
   ```bash
   cd brb-medical-salon
   npm run build
   ```

2. Netlifyにログイン → 「Sites」タブ

3. ビルドされた `dist` フォルダをブラウザにドラッグ&ドロップ

**注意**: この方法は更新が手動になるため、GitHub連携を推奨

---

## 公開後の確認

### ✅ サイトが正常に表示されるか確認

1. **公開URLにアクセス**
   - `https://brb-medical-salon.netlify.app`

2. **各ページの動作確認**
   - ホーム → サービス → 顧問Dr. → 提携施設 → プラン → 会社概要 → お問い合わせ
   - 全ページが正常に表示されるか確認
   - ナビゲーションリンクが動作するか確認
   - 医療機関の外部リンクが開くか確認

3. **レスポンシブ確認**
   - PC、タブレット、スマホで表示確認
   - ブラウザのDevToolsでモバイル表示をテスト

4. **SEO確認**
   - ブラウザのタブにタイトルが表示されるか
   - ページのソースコード表示で meta tags が含まれているか確認

---

## Google検索登録

### Google Search Console 設定

1. **Google Search Console にアクセス**
   - https://search.google.com/search-console
   - Googleアカウントでログイン

2. **プロパティを追加**
   - 「プロパティを追加」をクリック
   - 「URLプレフィックス」を選択
   - URL入力: `https://brb-medical-salon.netlify.app`
   - 「続行」をクリック

3. **所有権の確認**
   - 「HTMLタグ」方法を選択
   - 表示されたメタタグをコピー
   - `index.html` の `<head>` 内に追加
   - GitHubにプッシュ（自動で再デプロイ）
   - Search Console で「確認」をクリック

4. **サイトマップ送信**
   - 左メニュー「サイトマップ」をクリック
   - サイトマップURL入力: `sitemap.xml`
   - 「送信」をクリック

5. **インデックス登録をリクエスト**
   - 左メニュー「URL検査」をクリック
   - サイトのURLを入力: `https://brb-medical-salon.netlify.app`
   - 「インデックス登録をリクエスト」をクリック

### Google検索に表示されるまで
- **通常**: 数日〜2週間
- **早める方法**: Search Console でURL検査 → インデックス登録リクエスト

---

## 独自ドメイン設定（オプション）

将来的に `brb-medical-salon.com` などの独自ドメインを使いたい場合:

### 1. ドメインを取得
推奨レジストラ:
- **お名前.com**: https://www.onamae.com/ （日本語、年1,500円〜）
- **Google Domains**: https://domains.google/ （年1,200円〜）
- **Cloudflare**: https://www.cloudflare.com/products/registrar/ （最安値）

### 2. Netlifyでドメイン設定

1. Netlify の「Site settings」→「Domain management」
2. 「Add custom domain」をクリック
3. 購入したドメインを入力（例: `brb-medical-salon.com`）
4. DNS設定方法が表示される

### 3. DNS設定（ドメインレジストラ側）

**Netlify DNSを使う場合（推奨）:**
1. ドメインレジストラでネームサーバーを以下に変更:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

**外部DNSを使う場合:**
1. Aレコード追加:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```
2. CNAMEレコード追加:
   ```
   Type: CNAME
   Name: www
   Value: brb-medical-salon.netlify.app
   ```

### 4. SSL証明書（自動）
- Netlify が Let's Encrypt で自動発行
- 設定後1時間以内に https:// が有効化

---

## 更新方法

### コードを更新したい場合

1. **ローカルでコード修正**
   ```bash
   # ファイルを編集
   # 例: src/components/Hero.tsx など
   ```

2. **ローカルで動作確認**
   ```bash
   npm run dev
   # http://localhost:5173 で確認
   ```

3. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "更新内容の説明"
   git push
   ```

4. **Netlifyが自動デプロイ**
   - GitHubへのプッシュを検知
   - 自動でビルド＆デプロイ
   - 1〜3分で本番環境に反映

### 緊急で即座に更新したい場合

Netlify管理画面から:
1. 「Deploys」タブ
2. 「Trigger deploy」→「Deploy site」
3. 強制的に再デプロイ

---

## トラブルシューティング

### ビルドが失敗する場合

1. **Netlifyのデプロイログを確認**
   - 「Deploys」タブ → 失敗したデプロイをクリック
   - エラーメッセージを確認

2. **ローカルでビルドテスト**
   ```bash
   npm run build
   # エラーが出ないか確認
   ```

3. **node_modules を削除して再インストール**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### サイトが表示されない場合

1. **デプロイが完了しているか確認**
   - Netlify管理画面で「Published」と表示されているか

2. **ブラウザのキャッシュをクリア**
   - Ctrl + Shift + R（Windows）
   - Cmd + Shift + R（Mac）

3. **_redirects ファイルが正しいか確認**
   - `public/_redirects` が存在するか
   - 内容: `/*    /index.html   200`

### Google検索に出てこない場合

1. **Search Console で確認**
   - インデックス登録されているか確認
   - エラーがないか確認

2. **robots.txt を確認**
   - `https://brb-medical-salon.netlify.app/robots.txt` にアクセス
   - `Disallow` が設定されていないか確認

3. **時間を待つ**
   - 新しいサイトは1〜2週間かかることがある

---

## サポート・連絡先

### Netlify公式ドキュメント
- https://docs.netlify.com/

### Netlifyサポート
- https://www.netlify.com/support/

### このプロジェクトについて
- 作成日: 2026-02-16
- フレームワーク: React 19 + TypeScript + Vite
- デプロイ先: Netlify

---

## チェックリスト

デプロイ前の最終確認:

- [ ] ローカルで `npm run build` が成功する
- [ ] GitHubリポジトリにコードがプッシュされている
- [ ] Netlifyアカウントが作成されている
- [ ] Netlifyでサイトが作成されている
- [ ] サイト名が `brb-medical-salon` に変更されている
- [ ] デプロイが「Published」になっている
- [ ] 公開URLで全ページが表示される
- [ ] レスポンシブ表示が正常
- [ ] 外部リンク（医療機関サイト）が動作する
- [ ] Google Search Console に登録している
- [ ] サイトマップを送信している

全て完了したら、公式サイトとして運用開始です！🎉
