document.addEventListener('deviceready', function() {
    let stub_prof = [];
    
    // cookieでuseridをやり取りするならこちら
    //var key = $.cookie("prof_id");
    // URLでuseridをやり取りするならこちら
    var key = getParam('id');

    //接続先:stub
    //var url = "https://crebo.co.jp/crebo-demo/www/stub/profilestub.json";
    //接続先:api
    var url = "https://crebo.co.jp/crebo-demo/api/prof/id?id=" + key;
    
    console.log(url);

    getjson(url).then((value) => {
        stub_prof = value;
    });
    setTimeout(function () {
        // apiからデータを取得する
        if(stub_prof.status == 0){
            if(stub_prof.value[0].userid == key){
                if(stub_prof.value[0].photo === "none"){
                    document.getElementById('disp_photo').src = "img/testphoto.png";
                }else{
                    document.getElementById('disp_photo').src = stub_prof.value[0].photo;
                }
                //document.getElementById('td_name').innerHTML = stub_prof.value[0].username;
                document.getElementById('td_name').innerHTML = "対応中";
                document.getElementById('td_fee').innerHTML = stub_prof.value[0].fee;
                document.getElementById('td_parts').innerHTML = stub_prof.value[0].parts;
                document.getElementById('td_performance').innerHTML = stub_prof.value[0].performance;
            }
        }
        
        /* stubからデータを持ってくる用
        for(var x = 0,len = stub_prof.length; x < len; x++){
            if(stub_prof.value[0].userid === key){
                document.getElementById('disp_photo').src = stub_prof[x].photo;
                document.getElementById('td_name').innerHTML = stub_prof[x].username;
                document.getElementById('td_fee').innerHTML = stub_prof[x].fee;
                document.getElementById('td_parts').innerHTML = stub_prof[x].parts;
                document.getElementById('td_performance').innerHTML = stub_prof[x].performance;
            }
        }
        document.getElementById('disp_photo').src = stub_prof[0].photo;
        document.getElementById('td_name').innerHTML = stub_prof[0].username;
        document.getElementById('td_fee').innerHTML = stub_prof[0].fee;
        document.getElementById('td_parts').innerHTML = stub_prof[0].parts;
        document.getElementById('td_performance').innerHTML = stub_prof[0].performance;
        */
    }, 1000);
}, false);

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}