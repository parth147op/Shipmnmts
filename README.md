# StackFlow Clone
A web application inspired by StackOverflow, built using Node.js, Express, and MongoDB. Users can register, log in, ask questions, upvote/downvote questions, and comment on them.

## Features
- User Registration and Authentication
- CRUD operations for Questions
- Upvoting and Downvoting Questions
- Commenting on Questions

## Getting Started
### Prerequisites
- Node.js
- MongoDB

## Installation

### Clone the repository:
`git clone https://github.com/yourusername/stackflow-clone.git`

Navigate to the project directory:
`cd stackflow-clone`

### Install the required dependencies:
`npm install`

### Start the server:
`npm start`

Open your browser and navigate to http://localhost:4500.

## Usage

Register as a new user or log in.
Once authenticated, you can ask new questions, edit or delete your questions, upvote/downvote questions, and comment on them.

## API Endpoints
-User Registration: POST /register
-User Login: POST /login
-Create Question: POST /questions/create
-Update Question: PUT /questions/:questionId
-Delete Question: DELETE /questions/:questionId
-Upvote Question: POST /questions/:questionId/upvote
-Downvote Question: POST /questions/:questionId/downvote

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
