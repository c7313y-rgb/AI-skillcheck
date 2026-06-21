# AIスキル診断アプリ

添付UIをベースに、DXリテラシー標準・DX推進スキル標準を参照して再構成した、GitHub Pages公開向けの静的Webアプリです。24問の診断からAIスキルの現在地、関心テーマとのギャップ、推奨講座、学習プランまでを1画面体験としてまとめています。

## 特徴

- 添付PNGに寄せたダッシュボードUI
- 社会人 / 生徒・学生の2系統診断
- 24問のAIスキル診断と6領域スコア可視化
- レーダーチャート、強み、学習ロードマップ、講座提案
- 一時保存、結果コピー、JSON保存、印刷 / PDF
- Googleフォーム連携
- GitHub Actions経由のGitHub Pagesデプロイ
- 生成画像を使ったヒーロー / サイドビジュアル

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://127.0.0.1:4173` を開いて確認できます。

デモ結果をすぐ確認したい場合は `?demo=1#result` を付けて開くと、サンプル回答で結果セクションまで表示できます。

## 公開手順

1. 新しいGitHubリポジトリを作成する
2. このディレクトリの内容をリポジトリ直下へ配置する
3. `main` ブランチへpushする
4. GitHubの `Settings` → `Pages` で `GitHub Actions` を選ぶ
5. 同梱の `.github/workflows/deploy-pages.yml` が自動でデプロイする

## 構成

```text
ai-skill-diagnosis-app/
├── index.html
├── styles.css
├── script.js
├── README.md
├── DEPLOY_CHECKLIST.md
├── GOOGLE_FORMS_SETUP.md
├── .nojekyll
├── .github/workflows/deploy-pages.yml
└── assets/
    ├── hero-ai-generated.png
    ├── sidebar-career-generated.png
    ├── favicon.svg
    └── 各講座・参考画像
```

## Googleフォーム連携

`script.js` 冒頭の `GOOGLE_FORMS_CONFIG` を有効化し、`formResponse` URL と `entry.xxxxx` を設定してください。詳細は `GOOGLE_FORMS_SETUP.md` を参照してください。

## 参照データ

- ZIP内の講座情報、価格情報、設問・提案資料
- 経済産業省 デジタルスキル標準
- IPA DXリテラシー標準 / DX推進スキル標準

## 注意

- 報酬額・市場価値の表示は参考情報であり、昇給や転職成果を保証するものではありません。
- 画像には提案素材と生成素材が含まれます。商用公開前は権利条件をご確認ください。
