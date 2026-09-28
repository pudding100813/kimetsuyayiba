// ----------------------------------------------------------------------------------
/* 
    20230516 Maria 顯示警示訊息之 有ok版本(共用)
    參數說明：
    title:		標題（字較大）,
    text:		文字內容（字較小）,
    type:		顯示圖標 https://sweetalert2.github.io/#icons
        warning:警示符號
        error:錯誤符號
        success:正確符號
*/
// ----------------------------------------------------------------------------------
function showMsg(title, text, type) {
  Swal.fire({
      title: title,
      html: text,
      icon: type,
      width: 800,
      allowOutsideClick: false,
  })
}
/*---------------------------------------------*/
// 日期顯示格式化
/*---------------------------------------------*/
function showDate(value){
    var dateValue = new Date(value);;
    var val_Y = dateValue.getFullYear();
    // 如果有人輸入的年大於4位數，就自動只取前四碼
    val_Y = val_Y+="";
    val_Y = val_Y.length > 4?val_Y.substring(0,4):val_Y;
    var val_M = (dateValue.getMonth() + 1 < 10 ? '0' + (dateValue.getMonth() + 1) : dateValue.getMonth() + 1);
    var val_D = (dateValue.getDate() < 10 ? '0' + dateValue.getDate() : dateValue.getDate());
    // yyyy-mm-dd
    var val_date = val_Y + '-' + val_M + '-' + val_D
    return val_date;
}
/*---------------------------------------------*/
// 日期時間顯示格式化
/*---------------------------------------------*/
function showDateTime(value){
    var timeValue = new Date(value);
    var val_Y = timeValue.getFullYear();
    // 如果有人輸入的年大於4位數，就自動只取前四碼
    val_Y = val_Y+="";
    val_Y = val_Y.length > 4?val_Y.substring(0,4):val_Y;
    var val_M = (timeValue.getMonth() + 1 < 10 ? '0' + (timeValue.getMonth() + 1) : timeValue.getMonth() + 1);
    var val_D = (timeValue.getDate() < 10 ? '0' + timeValue.getDate() : timeValue.getDate());
    var val_Time = timeValue.toTimeString().substr(0, 8);
    // yyyy-mm-dd hh:mm:ss
    var val_time = val_Y + '-' + val_M + '-' + val_D + ' ' + val_Time
    return val_time;
}
/*---------------------------------------------*/
// 清理貨幣格式字串，轉成純數字
// 例如: "NT$250" -> 250, "¥1,290" -> 1290, "" -> 0
/*---------------------------------------------*/
function parseCurrency(value) {
    if (!value) return 0;
    // 移除所有非數字、非小數點、非負號的字元（貨幣符號、千分位逗號、空白等）
    const cleaned = String(value).replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}