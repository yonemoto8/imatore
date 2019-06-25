var t = "";
var url = "https://crebo.co.jp/crebo-demo/www/stub/profilestub.json";
//var key = "123456";
getjson(url).then((value) => {
    t = value;
});
setTimeout(function () {
    // 確認用
    alert("確認用　getjson:"+t.parts);
}, 2000);