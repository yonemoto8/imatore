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
    }
    setCookie("marker",m_log);

    document.location = "index.html";
});

var button = document.getElementById("d_marker");
button.addEventListener("click", function() {

    removeCookie("marker");
    alert("保存しているマーカーを全て削除しました。");
    
});

