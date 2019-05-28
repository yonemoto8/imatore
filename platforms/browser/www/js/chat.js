var button = document.getElementById("send-button");
button.addEventListener("click", function() {
    var options = {
        exclusive: false,
        create: true
      };
      
    // 生成したい (or 取得したい) ファイル名
    var fileName = 'chatlog.txt';
    var fileFullPath = cordova.file.dataDirectory + 'chatlog.txt';
    console.log(fileFullPath);
    // tmp/ ディレクトリ配下を操作する
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem) {
        console.log('tmp ディレクトリ配下を操作します');
        
        // ファイルを生成 (or 取得) する
        fileSystem.getFile(fileName, options, function(fileEntry) {
          // 生成 or 取得したファイル情報が FileEntry オブジェクトで返される
          console.log('ファイル生成 成功', fileEntry);
        }, function(getFileError) {
          console.log('ファイル生成 失敗', getFileError.code);
        });
    }, function(error) {
        console.log('tmp ディレクトリ操作 エラー', error.code);
    });
    
});



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