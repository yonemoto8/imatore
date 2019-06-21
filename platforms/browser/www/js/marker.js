var button = document.getElementById("a_marker");
button.addEventListener("click", function(bt) {

    var element = document.getElementById("mark_list");
    var date = element.value;

    var m_log = $.cookie("marker");
    if(m_log.match(date)){
        alert("選択した地点には、既にマーカーを追加しています。");
    }else{
        if(m_log === ""){
            m_log = date;
        }else{
            m_log = m_log + "_" + date;
        }
        setCookie("marker",m_log);

        // from_time整形
        var f_h_time = document.getElementById("f_time_h_list");
        var f_m_time = document.getElementById("f_time_m_list");
        var f_time = f_h_time.value + ":" + f_m_time.value;
        var from_time = shapingTime(f_time);
        // to_time整形
        var t_h_time = document.getElementById("t_time_h_list");
        var t_m_time = document.getElementById("t_time_m_list");
        var t_time = t_h_time.value + ":" + t_m_time.value;
        var to_time = shapingTime(t_time);
        // fee取得
        var fee_list = document.getElementById("f_list");
        var fee = fee_list.value;

        console.log(from_time);
        console.log(to_time);
        console.log(fee);

    }
    //document.location = "index.html";
});

var button = document.getElementById("d_marker");
button.addEventListener("click", function() {

    removeCookie("marker");
    alert("保存しているマーカーを全て削除しました。");
    
});

function shapingTime(time){
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "/" + m + "/" + d + " " + time + ":00";
    return result;
}