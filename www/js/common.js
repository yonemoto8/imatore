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

function setCookie(c_name, set_date){

    console.log("start setCookie");
    
    $.cookie(c_name, set_date);

}

function removeCookie(c_name){
    
    console.log("start removeCookie");

    $.cookie(c_name,"");
}