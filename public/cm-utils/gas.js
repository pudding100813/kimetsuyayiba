// 20250121 Maria 用於取得用於取得 試算表的資料
const GAS_URL = "https://script.google.com/macros/s/AKfycbx2zM_LAxXR_BnszAY6U-gwDyJfPu3fiFF7z5XQRdAo26wY9u_oezc85d9G4huDhV3x/exec";
async  function GetGasData (projectName=null,sheetName="",para = {}){
    if (!projectName) return [];
    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            // 關鍵 1：改用 text/plain，避免 GAS 因為 OPTIONS 預檢請求而失敗
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            // 關鍵 2：一樣轉成 JSON 字串傳過去
            body: JSON.stringify({
                method: "select",
                projectName: projectName,
                sheetName: sheetName,
                other_para: para,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const loadData = await response.json();
        return loadData;
    }
    catch (error) {
        // error_msg(error, error.message, error.message);
        return [];
    }
}

// function InsertGasData (sheetName,para = {}){
//     $.ajax({
//         type: "post",
//         data:  data = {
//             "method": "insert",
//             "sheetName": sheetName,
//             'other_para':JSON.stringify(para) ,
//         },
//         // 填入網路應用程式網址
//         url: GAS_URL,
//         success:function (result) {
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             error_msg(jqXHR, textStatus, errorThrown);					
//         },
//     });
// }

// function UpdateGasData (sheetName,para = {}){
//     $.ajax({
//         type: "post",
//         data:  data = {
//             "method": "update",
//             "sheetName": sheetName,
//             'other_para':JSON.stringify(para) ,
//         },
//         // 填入網路應用程式網址
//         url: GAS_URL,
//         success:function (result) {
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             error_msg(jqXHR, textStatus, errorThrown);					
//         },
//     });
// }

// function DeleteGasData (sheetName,para = {}){
//     $.ajax({
//         type: "post",
//         data:  data = {
//             "method": "delete",
//             "sheetName": sheetName,
//             'other_para':JSON.stringify(para) ,
//         },
//         // 填入網路應用程式網址
//         url: GAS_URL,
//         success:function (result) {
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             error_msg(jqXHR, textStatus, errorThrown);					
//         },
//     });
// }