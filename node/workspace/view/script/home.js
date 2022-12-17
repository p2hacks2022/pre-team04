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
    (await fetch(`http://update.com/${userId}/home`)).json
});

// naviの登録を押下されたらregisterへ遷移
headerNaviRegisterBox.addEventListener('click', async () => {
    console.log("移動しますよ");
});

// naviの記録を押下されたらrecordへ遷移
headerNaviRecordBox.addEventListener('click', async () => {
    console.log("移動しますよ");
});

// naviの管理を押下されたらmanageへ遷移
headerNaviManageBox.addEventListener('click', async () => {
    console.log("移動しますよ");
});

// registerボタンを押下されたらregisterへ遷移
homeRegisterButton.addEventListener('click', async () => {
    console.log("移動しますよ");
});

// recordボタンを押下されたらrecordへ遷移
homeRecordButton.addEventListener('click', async () => {
    console.log("移動しますよ");
});

// manageボタンを押下されたらmanageへ遷移
homeManageButton.addEventListener('click', async () => {
    console.log("移動しますよ");
});