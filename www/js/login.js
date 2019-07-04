var t = "";
var url = "https://crebo.co.jp/crebo-demo/www/stub/loginstub.json";

var button = document.getElementById("login_btn");
button.addEventListener("click", function() {

    // id用入力制限
    var id_regex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
    // pass用入力制限
    var pass_regex = new RegExp(/^[0-9a-zA-Z]*$/);

    var id = document.getElementById("login_id");
    var l_id = id.value;

    var pass = document.getElementById("login_pass");
    var l_pass = pass.value;

    if(id_regex.test(l_id)){
        if(pass_regex.test(l_pass)){
            getjson(url).then((value) => {
                t = value;
            });
            // api用
            /*
            setTimeout(function () {
                if(t.status == 0){
                    alert("ログインしました。");
                    document.location = "index.html";
                }else{
                    var e_mes = "ログイン出来ませんでした。"
                    if(t.message){
                        e_mes = t.message;
                    }
                    alert(e_mes);
                }
            }, 80);
            */
            
            // stub用
            setTimeout(function () {
                if(l_id == t.email){
                    if(l_pass == t.password){
                        alert("ログインしました。");
                        document.location = "index.html";
                    }else{
                        alert("ログイン出来ませんでした。");
                        document.location = "login.html";
                    }
                }else{
                    alert("ログイン出来ませんでした。");
                    document.location = "login.html";
                }
            }, 80);
        }else{
            alert("ログイン出来ませんでした。");
            document.location = "login.html";
        }
    }else{
        alert("ログイン出来ませんでした。");
        document.location = "login.html";
    }
    //alert("test");
});