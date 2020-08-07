# HTML-Notepad
Create and store notes in Markdown format

## Instalation
Make sure you have node.js and npm already installed and clone this repository.
Enter the below command to install dependencies
```bash
npm install
```

## Usage
- create a new .env file in the root of the project directory
- Enter all your credentials as shown below
```bash
DB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
```
To run the application, enter the below command in your terminal
```bash
npm run dev
```
Once the server starts visit [http://localhost:3000](http://localhost:3000) to start using the application
