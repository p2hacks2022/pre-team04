
// headerの要素取得
let headerLogoContainer = document.getElementById('headerLogoButton');
let headerNaviRegisterBox = document.getElementById('headerNaviRegisterButton');
let headerNaviRecordBox = document.getElementById('headerNaviRecordButton');
let headerNaviManageBox = document.getElementById('headerNaviManageButton');

//bodyの要素取得
let recordTargetBox = document.getElementById('recordTargetBox');
let recordDoneAnyForm = document.getElementById('doneAnyForm');
let recordAchievementDegreesBox = document.getElementById('achievementDegreesBox');
let recordButton = document.getElementById('recordButton');
let recordBackHomeButton = document.getElementById('backHomeButton');
let recordSwitchManageMenuButton = document.getElementById('switchManageMenuButton');

let recordContentDisplayText = document.getElementById('recordContentDisplay');

// logoを押下されたらhomeへ遷移
headerLogoContainer.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/home`
});

// naviの登録を押下されたらregisterへ遷移
headerNaviRegisterBox.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/register`
});

// naviの記録を押下されたらrecordへ遷移
headerNaviRecordBox.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/record`
});

// naviの管理を押下されたらmanageへ遷移
headerNaviManageBox.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/manage`
});

let path = location.pathname.split("/");
let userId = path[1];
let form = document.querySelector('form');
form.action = `http://update.com/${userId}/record/add`;


// ホームに戻るを押下されたらhomeへ遷移
backHomeButton.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/home`
});

// 管理画面を押下されたらmanageへ遷移
switchManageMenuButton.addEventListener('click', () => {
    let path = location.pathname.split("/");
    let userId = path[1];
    window.location.href = `http://update.com/${userId}/manage`
});