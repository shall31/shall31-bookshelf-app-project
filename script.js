document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("submit");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        addBook();
        deleteForm();
    });

    if (isStorageExist()) {
        loadData();
    }
});

document.addEventListener("onDataSaved", () => {
    console.log("Data berhasil disimpan");
    
});
document.addEventListener("ondataloaded", () => {
    console.log("Data berhasil dimuat");
    refreshList();
});
document.addEventListener("onDataWasHere", () => {
    console.log("Data berhasil sampai di sini");
});

const checkType = document.getElementById("inputBookIsDone");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("tipeBuku").innerHTML = "<strong>Selesai Dibaca</strong>";
        
    } else {
        document.getElementById("tipeBuku").innerHTML = "<strong>Belum Dibaca</strong>";
        
    }
});