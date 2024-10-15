const STORAGE_KEY = "READING_LIST";

let list = [];

function isStorageExist() /* boolean */ {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    console.log("Data sebelum disimpan:", list); // Cek isi list
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    console.log("Data :", parsed); // Cek isi list
    console.log("Data setelah disimpan:", localStorage.setItem(STORAGE_KEY, parsed)); // Cek isi list
    document.dispatchEvent(new Event("onDataSaved"));
};

function loadData() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("ondataloaded"));
};

function updateData() {
    if (isStorageExist())
    saveData();
};

function createBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    }
};

function refreshList() {
    const listIsNotDone = document.getElementById(ID_LIST_ISNOTDONE);
    let listIsDone = document.getElementById(ID_LIST_ISDONE);

    for(book of list) {
        const newBook = createListBook(book.title, book.author, book.year, book.isComplete);
        newBook[ID_BOOK] = book.id;
        
        if (book.isComplete){
            listIsDone.append(newBook);
        }else{
            listIsNotDone.append(newBook)
        }
    }
}

function findBook(idBook) {
    for (book of list) {
        if (book.id === idBook)
            return book;
    }
    return null;
}

function findBookIndex(idBook) {
    let index = 0
    for (book of list) {
        if (book.id === idBook)
            return index;

        index++;
    }

    return -1;
}