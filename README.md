<img src="https://motionpicture.jp/images/common/logo_01.svg" alt="motionpicture" title="motionpicture" align="right" height="56" width="98"/>

# ttts webhook ウェブアプリケーション

## Getting Started

### インフラ
基本的にnode.jsのウェブアプリケーション。
ウェブサーバーとしては、AzureのWebApps or GCPのAppEngine or AWSのelastic beanstalkを想定。
全てで動くように開発していくことが望ましい。

### 言語
実態としては、linuxあるいはwindows上でのnode.js。プログラミング言語としては、TypeScript。

* [TypeScript](https://www.typescriptlang.org/)

### 開発方法
npmでパッケージをインストール。

```shell
npm install
```
* [npm](https://www.npmjs.com/)

typescriptをjavascriptにコンパイル。

```shell
npm run build -- -w
```

npmでローカルサーバーを起動。

```shell
npm start
```


### Environment variables

| Name              | Required | Purpose                        | Value          |
| ----------------- | -------- | ------------------------------ | -------------- |
| `DEBUG`           | false    | Debug                          | ttts-webhook:* |
| `NPM_TOKEN`       | true     | NPM auth token                 |                |
| `NODE_ENV`        | true     | environment name               |                |
| `MONGOLAB_URI`    | true     | MongoDB connection URI         |                |
| `BASIC_AUTH_NAME` | false    | Basic authentication user name |                |
| `BASIC_AUTH_PASS` | false    | Basic authentication user pass |                |


## tslint

コード品質チェックをtslintで行う。
* [tslint](https://github.com/palantir/tslint)
* [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib)

`npm run check`でチェック実行。


## パッケージ脆弱性のチェック

* [nsp](https://www.npmjs.com/package/nsp)


## clean
`npm run clean`で不要なソース削除。


## テスト
`npm test`でテスト実行。


## ドキュメント
`npm run doc`でjsdocが作成されます。


## 参考
* [GMO Payment Gateway 結果通知プログラム](https://faq.gmo-pg.com/service/detail.aspx?id=1050&a=102&isCrawler=1)
* [SendGrid Event Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/event.html)
