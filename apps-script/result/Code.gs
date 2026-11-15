// 測驗結果專用頁：學員掃 QR Code 只會看到自己的測驗結果圖片
// 網址參數：t=disc|interest，r=分數（DISC：D-I-S-C；興趣：R-I-A-S-E-C）
function doGet(e) {
  var t = HtmlService.createTemplateFromFile('index')
  t.params = JSON.stringify({ t: String(e.parameter.t || ''), r: String(e.parameter.r || '') })
  return t.evaluate()
    .setTitle('聯成電腦・測驗結果')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
}
