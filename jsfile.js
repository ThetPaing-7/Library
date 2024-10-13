// container of the page
const holder = document.querySelector(".container");

const myLibrary = [];

function Book(year, author, title){
    this.year = year;
    this.author = author;
    this.title = title;
}

function addBookToLibrary(year,author,title){
    myLibrary.push(new Book(year,author,title))
}

addBookToLibrary(2021,"James","Atomic habit");
addBookToLibrary(2021,"James","Atomic habit");
addBookToLibrary(2021,"James","Atomic habit");

display();

// TO add the new book
const addNewBook = document.querySelector(".newbook");
const booksDialog = document.querySelector("#bookdialog");
const addButton = booksDialog.querySelector("#confirmation");
const title = booksDialog.querySelector("#title");
const author = booksDialog.querySelector("#author");
const year = booksDialog.querySelector("#year");

//To show the dialog book
addNewBook.addEventListener("click",() =>{
    booksDialog.showModal();
})

//Add the books from user to the library
addButton.addEventListener("click",(event)=>{
    event.preventDefault();
    
    const newBook = new Book(year.value,author.value,title.value);
    const isDuplicate = myLibrary.some(book => 
        book.title === newBook.title &&
        book.author === newBook.author &&
        book.year === newBook.year
    );
    
    if(!isDuplicate){
        addBookToLibrary(year.value,author.value,title.value);
    }else{
        alert("The book is already exists in the library")
    }

    booksDialog.close();

})



// To handle cancel book
booksDialog.addEventListener("close",() =>{
    title.value = '';
    author.value = '';
    year.value = '';
})

//Add the new book button to holder
holder.append(addNewBook);



function display(){
    //take container
    const container = document.querySelector(".book-container");

    myLibrary.forEach((book) =>{
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // display each title 
        const title = document.createElement("h2");
        title.classList.add("title");
        title.textContent = book.title;
        bookCard.append(title);

        //display each author
        const author = document.createElement("h3");
        author.classList.add("author");
        author.textContent = `Author: ${book.author}`
        bookCard.append(author);

        //display each publication year
        const year = document.createElement("div");
        year.classList.add("year");
        year.textContent = `Year: ${book.year}`
        bookCard.append(year)

        container.append(bookCard);
    })

    holder.append(container);
}