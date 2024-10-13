// container of the page
const holder = document.querySelector(".container");

const myLibrary = [];

function Book(year, author, title,read = false){
    this.year = year;
    this.author = author;
    this.title = title;
    this.read = read;
}

function addBookToLibrary(year,author,title){
    myLibrary.push(new Book(year,author,title))
}

addBookToLibrary(2021,"James","Atomic habit");
addBookToLibrary(2021,"James","Atomic habit");
addBookToLibrary(2021,"James","Atomic habit");
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
        display();
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

    // Clear previous books
    container.innerHTML = '';

    myLibrary.forEach((book,index) =>{

        
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

        // Adding delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Remove";

        // Take the index of the book
        deleteButton.setAttribute('data-index',index);

        // Add event listen to delete
        deleteButton.addEventListener("click",handleDelete);
        bookCard.append(deleteButton);

        // Add read button on each book
        const readButton = document.createElement("button")
        readButton.classList.add("read-button")
        readButton.textContent = book.read ? "Read" : "Not Read";

        readButton.style.background = book.read ? "green" : "red";

        readButton.addEventListener("click",()=>{
            book.read = !book.read;
            readButton.textContent = book.read ? "Read" : "Not Read";
            readButton.style.background = book.read ? "green" : "red";
        })
        bookCard.append(readButton);

        container.append(bookCard);
    })

    holder.append(container);
}

// To handle delete action
function handleDelete(event){
    const index = event.target.getAttribute('data-index');
    myLibrary.splice(index,1);
    display();
}