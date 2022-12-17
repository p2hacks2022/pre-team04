
// headerの要素取得
const headerLogoContainer = document.getElementById('headerLogoButton');
const headerNaviRegisterBox = document.getElementById('headerNaviRegisterButton');
const headerNaviRecordBox = document.getElementById('headerNaviRecordButton');
const headerNaviManageBox = document.getElementById('headerNaviManageButton');

//bodyの要素取得

const registerAddTargetForm = document.getElementById('addTargetform');
const registerAddCategoryForm = document.getElementById('addCategoryForm');
const registerSelectCategoryBox = document.getElementById('selectCategoryBox');
const registerButton = document.getElementById('registerButton');
const registerBackHomeButton = document.getElementById('backHomeButton');
const registerSwitchManageMenuButton = document.getElementById('switchManageMenuButton');

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
form.action = `http://update.com/${userId}/register/add`;

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