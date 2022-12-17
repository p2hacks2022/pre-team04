// const = document.getElementById();

// headerの要素取得
const headerLogoContainer = document.getElementById(headerLogoButton);
const headerNaviRegisterBox = document.getElementById(headerNaviRegisterButton);
const headerNaviRecordBox = document.getElementById(headerNaviRecordButton);
const headerNaviManageBox = document.getElementById(headerNaviManageButton);

// bodyの要素の取得
const homeRegisterButton = document.getElementById(registerButton);
const homeRecordButton = document.getElementById(recordButton);
const homeManageButton = document.getElementById(manageButton);

let path = location.pathname.split("/");
let userId = path[0];

// logoを押下されたらhomeへ遷移
headerLogoContainer.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/home`
});

// naviの登録を押下されたらregisterへ遷移
headerNaviRegisterBox.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/register`
});

// naviの記録を押下されたらrecordへ遷移
headerNaviRecordBox.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/record`
});

// naviの管理を押下されたらmanageへ遷移
headerNaviManageBox.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/manage`
});

// registerボタンを押下されたらregisterへ遷移
homeRegisterButton.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/register`
});

// recordボタンを押下されたらrecordへ遷移
homeRecordButton.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/record`
});

// manageボタンを押下されたらmanageへ遷移
homeManageButton.addEventListener('click', async () => {
    window.location.href = `http://update.com/${userId}/manage`
});