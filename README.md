# Kafka Lessons
Kafka の基本構成の理解から、Kafka.js と Debezium を用いてPostgreSQL のChange　Data Capture(CDC) で別DBに書き込むまでを試した実験リポジトリです。

# How to Start
操作の詳細については、下記のブログにまとめています。

- [Kafka.js + Debezium を使って、Change Data Capture(CDC)でDBの変更検知を行い、別DBに書き込む(前編)](https://daitasu.hatenablog.jp/entry/2024/08/19/095120)
- [Kafka.js + Debezium を使って、Change Data Capture(CDC)でDBの変更検知を行い、別DBに書き込む(後編)](https://daitasu.hatenablog.jp/entry/2024/08/19/095136)


全体を通して、pnpm workspace の monorepo 構成でLesson を分けているため、pnpm の取得が必要です。

- Node.js をローカルにインストールし、pnpm を有効にしてください

```sh
$corepack enable
$corepack prepare pnpm@9.1.1 --activate
```

- `pnpm install` を root ディレクトリで実行すれば、依存パッケージをそれぞれ取得可能です
- 01, 02, 03, 04, 05 章については、下記の対応のみで実行可能です

```sh
docker compose up // コンテナの立ち上げ
pnpm run start:producer // Producer の起動
pnpm run start:consumer // Consumer の起動
```

- 06章 では、CDCのコネクタの作成やDBデータのInsert等、いくつかの作業があるため、ブログをご参照ください
