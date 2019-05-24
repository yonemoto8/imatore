var personal = {
    /** コンストラクタ  */
    initialize: function () {
        // TODO 必要に応じてイベント定義
    },
  
    /** s0003遷移前イベント  */
    beforeTranS0003: function (event) {
        if (confirm("次の画面に遷移します。")){
            return true;
        }
        return false;
    }
  };
  personal.initialize();