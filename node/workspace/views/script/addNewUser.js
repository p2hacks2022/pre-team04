// bodyの要素取得\login
let getUserId = document.getElementById('userIdInputForm');

getUserId.addEventListener('change', async () => {
    let userId = getUserId.value;
    console.log(userId);
    let url = "http://update.com/addNewUser/add"
    let data = { "userId": userId };
    await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            response.json()
                .then((data) => {
                    console.log(data.message);
                    alert(data.message);
                })
        })
    window.location.href = "http://update.com/";
});