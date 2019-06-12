$.cookie.json = true;
let chatlog = [];

// チャット画面遷移時、チャットのログを表示させる
$(document).ready(function(){

    dispLogMesseage();

    if($.cookie("chatlog").length > 0){
        chatlog = $.cookie("chatlog");
    }

});

var button = document.getElementById("send_button");
button.addEventListener("click", function() {

    sendMesseage();

});

// モック用cookieのクリアボタン
var c_button = document.getElementById("log_clean");
c_button.addEventListener("click", function() {

    $.cookie("chatlog",[]);

});

function sendMesseage(){

    /*var options = {
        exclusive: false,
        create: true
      };
    
      var path = '../testData/sample.txt'

    // 生成したい (or 取得したい) ファイル名
    var fileName = 'chatlog.txt';
    var fileFullPath = cordova.file.dataDirectory + 'chatlog.txt';
    console.log(fileFullPath);
    // tmp/ ディレクトリ配下を操作する
    window.resolveLocalFileSystemURL(path, function(fileSystem) {
        console.log('tmp ディレクトリ配下を操作します');
        var filecheck = 0;
        // ファイルを生成 (or 取得) する
        fileSystem.getFile(fileName, options, function(fileEntry) {
            // 生成 or 取得したファイル情報が FileEntry オブジェクトで返される
            console.log('ファイル生成 成功', fileEntry);
            if(document.forms.sendchat.send_text.value === ""){
            }else{
                fileEntry.createWriter(function(writer) {
                    // ファイルの末尾まで移動する
                    writer.seek(writer.length);
                    
                    // 書き込み終了時の処理を定義する
                    writer.onwriteend = function(event) {
                        if(this.error) {
                            console.log('ファイル追記 追記処理中にエラー発生', this.error, event);
                        }else {
                            console.log('ファイル追記 成功', event);
                        }
                    };
        
                    // 書き込みたいテキストの用意 : ココでは現在日時 + 改行コードを書き込む
                    var text = document.forms.sendchat.send_text.value + '¥n';
        
                    // テキスト書き込み
                    writer.write(text);
                });
            }
        }, function(getFileError) {
          console.log('ファイル生成 失敗', getFileError.code);
        });
    }, function(error) {
        console.log('tmp ディレクトリ操作 エラー', error.code);
    });
    */
    if(document.forms.sendchat.send_text.value === ""){
    }else{
        // 現在の時間を整形して取得
        var nt = getTime();
        let send_message = {text: document.forms.sendchat.send_text.value, stetas: 'send', time: nt};
        $.cookie("chat",send_message);
        dispMesseage();

        if(chatlog.length > 0){
            chatlog.push(send_message);
        }else{
            chatlog[0] = send_message;
        }
        $.cookie("chatlog",chatlog);
        getMesseage();
    }
    document.forms.sendchat.send_text.value = "";
}

function getMesseage(){

    // モック用、送信されたメッセージをそのまま受信した設定で表示
    // 現在の時間を整形して取得
    var nt = getTime();
    let get_message = {text: document.forms.sendchat.send_text.value, stetas: 'get', time: nt};
    $.cookie("chat" , get_message);

    dispMesseage();

    if(chatlog.length > 0){
        chatlog.push(get_message);
    }else{
        chatlog[0] = get_message;
    }
    $.cookie("chatlog",chatlog);

}

function dispMesseage(){

    var rc_chatarea_text = document.getElementById('rc_chatarea');
    let c_message = $.cookie("chat");
    var s_text = "";

    if(c_message.stetas == "send"){
        s_text = `<div class="rc_message rc_right">`;
    }else{
        s_text = `<div class="rc_message rc_left">`;
    }

    s_text = s_text + `<div class="rc_message_box">` +
                 `<div class="rc_message_content">` +
                 `<div class="rc_message_text">` + c_message.text + `</div>` +
                 `</div>` +
                 `<div class="rc_message_stetas">` +
                 `<div class="rc_message_stetastext rc_right">`+ c_message.time + `</div>` +
                 `</div>` +
                 `</div>` +
                 `</div>` +
                 `<div class="rc_clear"></div>`;

    rc_chatarea_text.insertAdjacentHTML('beforeend',s_text);
    $("#receive").scrollTop($("#receive")[0].scrollHeight);
    document.getElementById('send_button').style.backgroundColor = '#bcbcbc';
}

function dispLogMesseage(){

    var rc_chatarea_text = document.getElementById('rc_chatarea');
    let log_message = $.cookie("chatlog");

    for(let l_message of log_message){
        var s_text = "";

        if(l_message.stetas == "send"){
            s_text = `<div class="rc_message rc_right">`;
        }else{
            s_text = `<div class="rc_message rc_left">`;
        }

        s_text = s_text + `<div class="rc_message_box">` +
                     `<div class="rc_message_content">` +
                     `<div class="rc_message_text">` + l_message.text + `</div>` +
                     `</div>` +
                     `<div class="rc_message_stetas">` +
                     `<div class="rc_message_stetastext rc_right">`+ l_message.time + `</div>` +
                     `</div>` +
                     `</div>` +
                     `</div>` +
                     `<div class="rc_clear"></div>`;

        rc_chatarea_text.insertAdjacentHTML('beforeend',s_text);
    }
    $("#receive").scrollTop($("#receive")[0].scrollHeight);
    document.getElementById('send_button').style.backgroundColor = '#bcbcbc';
}

function getTime(){
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var h = ("00" + dt.getHours()).slice(-2);
    var mi = ("00" + dt.getMinutes()).slice(-2);
    var s = ("00" + dt.getSeconds()).slice(-2);
    var result = y + "/" + m + "/" + d + " " + h + ":" + mi + ":" + s;
    return result;
}

function b_hover(text){
    if(text.length < 1){
        document.getElementById('send_button').style.backgroundColor = '#bcbcbc';
    }else{
        document.getElementById('send_button').style.backgroundColor = '#13178E';
    }
}