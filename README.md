# md2pdf 說明文件

一個 Markdown to PDF 工具說明，可將單一或多個 md 檔組合後轉檔為 PDF，並支援在轉檔過程中進行客製化動作

## 需要

* Node.js
* npm
* yarn (option)

## 安裝

```bash
> yarn
```

## 使用

將 md 檔編輯存放在 *./doc/* 

並執行

```bash
> yarn start
```

PDF 會產生在 *./doc/{project}_{version}.pdf*

## 設定

* [config.js](./config.js)
  * 設定 project: 專案名稱(影響產出 PDF 檔名稱)
  * 設定 version: 版本號(影響產出 PDF 檔名稱)
  * 設定 sequence: 待轉檔清單及順序

* [pdf.css](./pdf.css)
  * 客製化 PDF 輸出外觀
  * 請根據輸出的 HTML 內容瞭解如何客製化外觀
