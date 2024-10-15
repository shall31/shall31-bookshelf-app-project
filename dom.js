const ID_LIST_ISNOTDONE = "listIsNotDone";
const ID_LIST_ISDONE = "listIsDone";
const ID_BOOK = "idBook";

//buat list buku
function createListBook(titleBook, authorBook, yearBook, isComplete) {
    const titleBooks = document.createElement("h3");
    const title = document.createElement("span");
    title.classList.add("title_book");
    title.innerText = titleBook;
    titleBooks.append(title);

    const authorBooks = document.createElement("p");
    authorBooks.innerText = "Penulis : ";
    const author = document.createElement("span");
    author.classList.add("author_book");
    author.innerText = authorBook;
    authorBooks.append(author);

    const yearBooks = document.createElement("p");
    yearBooks.innerText = "Tahun : ";
    const year = document.createElement("span");
    year.classList.add("year_book");
    year.innerText = yearBook;
    yearBooks.append(year);

    const infoBooks = document.createElement("div");
    infoBooks.classList.add("info");
    infoBooks.append(titleBooks, authorBooks, yearBooks);

    const actBooks = document.createElement("div");
    actBooks.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(infoBooks, actBooks);

    if (isComplete) {
        actBooks.append(
            createUndoButton(),
            createDeleteButton(),
            createEditButton()
        );
    } else {
        actBooks.append(createCheckButton(), createDeleteButton(), createEditButton());
    }

    return container;
}

function addBook() {
    const listIsNotDone = document.getElementById(ID_LIST_ISNOTDONE);
    const listIsDone = document.getElementById(ID_LIST_ISDONE);
    const checkType = document.getElementById("inputBookIsDone");

    const title = document.getElementById("inputTitle").value;
    const author = document.getElementById("inputAuthor").value;
    const year = parseInt(document.getElementById("inputYear").value);

    if (!checkType.checked) {

        const listIsNotRead = createListBook(title, author, year, false);
        const objectBook = createBookObject(title, author, year, false);
        listIsNotRead[ID_BOOK] = objectBook.id;
        list.push(objectBook);
        listIsNotDone.append(listIsNotRead);

    } else {

        const listIsRead = createListBook(title, author, year, true);
        const objectBook = createBookObject(title, author, year, true);
        listIsRead[ID_BOOK] = objectBook.id;
        list.push(objectBook);
        listIsDone.append(listIsRead);
    }
    updateData();
}

function createButton(buttonTypeClass, eventListener, word) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.textContent = word;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("Checklist", function(event, ) {
        const parent = event.target.parentElement;
        createBookIsDone(parent.parentElement);
    }, "Selesai Dibaca");
}

function createDeleteButton() {
    return createButton("Hapus", function(event, ) {
        const parent = event.target.parentElement;
        deleteBookIsDone(parent.parentElement);
    } ,"Hapus Buku");
    
}

function createEditButton() {
    return createButton("Done", function(event) {
        const parent = event.target.parentElement;
    }, "Edit Buku");
}

function createUndoButton() {
    return createButton("Uncheck", function(event) {
        const parent = event.target.parentElement;
        undoBookIsDone(parent.parentElement);
    }, "Belum Selesai Dibaca");
}

function undoBookIsDone(undoBook) {
    const bookTitle = undoBook.querySelector(".title_book").innerText;
    const bookAuthor = undoBook.querySelector(".author_book").innerText;
    const bookYear = undoBook.querySelector(".year_book").innerText;
    
    const newBook = createListBook(bookTitle, bookAuthor, bookYear, false);
    const listBookIsNotDone = document.getElementById(ID_LIST_ISNOTDONE);

    const book = findBook(undoBook[ID_BOOK]);
    book.isComplete = false;
    newBook[ID_BOOK] = book.id;
    listBookIsNotDone.append(newBook);
    undoBook.remove();

    updateData();
}

function deleteBookIsDone(bookElement) {
    const bookPosition = findBookIndex(bookElement[ID_BOOK]);
    list.splice(bookPosition, 1);
    bookElement.remove();
    updateData();
}

function createBookIsDone(bookElement) {
    const bookTitle = bookElement.querySelector(".title_book").innerText;
    const bookAuthor = bookElement.querySelector(".author_book").innerText;
    const bookYear = bookElement.querySelector(".year_book").innerText;

    const newBook = createListBook(bookTitle, bookAuthor, bookYear, true);
    const listIsDone = document.getElementById(ID_LIST_ISDONE);
    const book = findBook(bookElement[ID_BOOK]);

    book.isComplete = true;
    newBook[ID_BOOK] = book.id;
    listIsDone.append(newBook);
    bookElement.remove();

    updateData();
}

function deleteForm() {
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputAuthor").value = "";
    document.getElementById("inputYear").value = "";
    document.getElementById("inputBookIsDone").checked = false;
}