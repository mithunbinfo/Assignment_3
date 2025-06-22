# Library Management System API

A RESTful API built with Express, TypeScript, and MongoDB (Mongoose).  
Manages CRUD operations for books and CR operations for borrows, with business logic, validation, and aggregation.



## Project Setup

### Requirements
- Node.js (v16 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project-folder

# Install dependencies
npm install
# or
yarn install

```



1. Create a Book
POST /api/books

Request Body: {
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

Successful Response: {
  "success": true,
  "message": "Book created successfully",
  "data": { /* book info with _id and timestamps */ }
}




2. Get All Books
GET /api/books

Optional Query Parameters:

filter: filter by genre, e.g. ?filter=FANTASY

sortBy: field to sort by, e.g. createdAt

sort: asc or desc

limit: number of results (default 10)

Successful Response: {
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ /* array of books */ ]
}




3. Get Book by ID
GET /api/books/:bookId

Successful Response: {
  "success": true,
  "message": "Book retrieved successfully",
  "data": { /* book details */ }
}




4. Update Book
PUT /api/books/:bookId

Request Body Example: {
  "copies": 50
}

Successful Response: {
  "success": true,
  "message": "Book updated successfully",
  "data": { /* updated book info */ }
}




5. Delete Book
DELETE /api/books/:bookId

Successful Response: {
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}




6. Borrow a Book
POST /api/borrow

Request Body: {
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

Successful Response: {
  "success": true,
  "message": "Book borrowed successfully",
  "data": { /* borrow record */ }
}




7. Borrowed Books Summary
GET /api/borrow

Successful Response: {
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}

Error Handling
For all validation errors or bad requests, responses will follow this format: {
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}



