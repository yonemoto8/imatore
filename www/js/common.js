$.cookie.json = true;
var personal = {};
/*var common = {
    // コンストラクタ
    initialize: function () {
        // イベント定義
        $('button[data-tran-target]').on('click', this, this.onClickTran);
    },
 
    // 画面遷移ボタン押下
    onClickTran: function (event) {
        let $this = $(this);
        if ($this.attr('data-before-tran')){
            if (!personal[($this.attr('data-before-tran'))]()){
                return;
            }
        }
         
        let target = $this.attr('data-tran-target');
        if (!target){
            history.back();
            return;
        }
        location = target +'.html';
    }
};
common.initialize();
*/

// c_nameという名前のcookieにset_dateをセット
function setCookie(c_name, set_date){

    $.cookie(c_name, set_date);

}

// c_nameという名前のcookieをクリア
function removeCookie(c_name){

    $.cookie(c_name,"");

}

// 緯度経度を取得
function getPostionInfo() {
  return new Promise((resolve, reject) => {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      (position) => {
        const result = {g_lat: position.coords.latitude, g_lng: position.coords.longitude};
        resolve(result);
      },
      // 取得失敗した場合
      (error) => {
        switch (error.code) {
          case 1: //PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:" + error.code + ")");
            break;
        }
        reject(error.code);
      }
    );
  });
}

function getjson(url) {
  return new Promise((resolve) => {
    httpObj = new XMLHttpRequest();
    httpObj.open("get", url, true);
    httpObj.onload = function(){       
      var myData = JSON.parse(this.responseText);
      resolve(myData);
    }
    httpObj.send(null);
  });
}

function addjson(url) {
  return new Promise((resolve) => {
    httpObj = new XMLHttpRequest();
    httpObj.open("get", url, true);
    httpObj.onload = function(){       
      var myData = JSON.parse(this.responseText);
      console.log(myData);
      resolve(myData);
    }
    httpObj.send(null);
  });
}
