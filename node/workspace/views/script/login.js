// bodyの要素取得\login
let forgotUserId = document.getElementById('forgotUserIdButton');
let getUserId = document.getElementById('userIdInputForm');
let login = document.getElementById('loginButton');
let addNewUser = document.getElementById('addNewUserButton');

forgotUserId.addEventListener('click', () => {
    alert("そんなやつに未来は変えられない");
});


getUserId.addEventListener('change', async () => {
    let userId = getUserId.value;
    //console.log(userId);
    let url = "http://update.com/login/auth"
    let data = { "userId": userId };
    await fetch(url, {
        method: "POST",
        headers: {
            Accept: { "Content-Type": "application/json;charset=utf-8" }
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            response.json()
                .then((data) => {
                    console.log(data.message);
                    alert(data.message);
                })
        })
});

login.addEventListener('click', async () => {
    window.location.href = 'http://update.com/'
    //await fetch("http://update.com/");
})

addNewUser.addEventListener('click', async () => {
    //fetch
    await fetch(`http://update.com/addNewUser`);
});