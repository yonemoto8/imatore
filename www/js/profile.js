var t = "";
var url = "https://crebo.co.jp/crebo-demo/www/stub/profilestub.json";
getjson(url).then((value) => {
    t = value;
});
setTimeout(function () {
    // 確認用
    alert("確認用　getjson:"+t.parts);
}, 2000);