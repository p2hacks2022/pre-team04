// headerの要素取得
let headerLogoContainer = document.getElementById('headerLogoButton');
let headerNaviRegisterBox = document.getElementById('headerNaviRegisterButton');
let headerNaviRecordBox = document.getElementById('headerNaviRecordButton');
let headerNaviManageBox = document.getElementById('headerNaviManageButton');

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

