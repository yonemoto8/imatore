var t = "";
var url = "https://crebo.co.jp/crebo-demo/www/stub/loginstub.json";

var button = document.getElementById("login_btn");
button.addEventListener("click", function() {

    var id = document.getElementById("login_id");
    var l_id = id.value;
    var pass = document.getElementById("login_pass");
    var l_pass = pass.value;

    getjson(url).then((value) => {
        t = value;
    });
    setTimeout(function () {
        if(l_id == t.email){
            if(l_pass == t.password){
                alert("ログインしました。");
                document.location = "index.html";
            }else{
                alert("ログイン出来ませんでした。");
            }
        }else{
            alert("ログイン出来ませんでした。");
        }
    }, 2000);
    alert("test");
});