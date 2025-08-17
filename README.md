# File Bee

A Node.js web application that allows users to register, login, and upload files to cloud storage.

## Features

- **User Authentication**: Register and login system with JWT token-based authentication
- **File Upload**: Upload files to Supabase cloud storage
- **File Management**: Store file metadata in MongoDB
- **Responsive UI**: Modern interface built with Tailwind CSS and Flowbite components

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data persistence
- **Supabase** for cloud file storage
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for handling file uploads

### Frontend
- **EJS** templating engine
- **Tailwind CSS** for styling
- **Flowbite** for UI components
- **Remix Icons** for iconography

## Project Structure

```
├── config/
│   ├── db.js                 # MongoDB connection configuration
│   └── supabase.config.js    # Supabase client configuration
├── models/
│   ├── user.models.js        # User schema and model
│   └── file.models.js        # File schema and model
├── routes/
│   ├── index.routes.js       # Home and file upload routes
│   └── user.routes.js        # User authentication routes
├── views/
│   ├── home.ejs             # Main dashboard with file upload
│   ├── login.ejs            # User login page
│   ├── register.ejs         # User registration page
│   └── index.ejs            # Welcome page
├── .env                     # Environment variables
├── app.js                   # Main application file
└── package.json             # Dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Supabase account and project

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 01-google-drive
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://0.0.0.0/backend
JWT_SECRET=your-jwt-secret-here
```

4. Configure Supabase:
- Create a Supabase project
- Create a storage bucket named 'uploads'
- Update the Supabase URL and anon key in `config/supabase.config.js`

5. Start the application:
```bash
node app.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/user`)
- `GET /user/register` - Display registration form
- `POST /user/register` - Register a new user
- `GET /user/login` - Display login form
- `POST /user/login` - Authenticate user

### Main Routes (`/`)
- `GET /home` - Main dashboard page
- `POST /upload` - Upload file to cloud storage

## Usage

1. **Registration**: Navigate to `/user/register` to create a new account
2. **Login**: Use `/user/login` to authenticate
3. **File Upload**: Access `/home` to upload files using the drag-and-drop interface

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Input validation using express-validator
- Secure cookie handling

## File Upload Process

1. Files are uploaded via multipart form data
2. Multer processes the file in memory
3. File is uploaded to Supabase storage bucket
4. File metadata is saved to MongoDB
5. Public URL is generated for file access

## Database Schemas

### User Schema
```javascript
{
  username: String (required, unique, min: 3 chars)
  email: String (required, unique, min: 13 chars)
  password: String (required, hashed, min: 5 chars)
}
```

### File Schema
```javascript
{
  filename: String (required)
  originalName: String (required)
  mimetype: String (required)
  size: Number (required)
  supabaseUrl: String (required)
  uploadedBy: ObjectId (reference to User)
  timestamps: true
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Future Enhancements

- File sharing capabilities
- Folder organization
- File preview functionality
- User dashboard improvements
- File deletion and management
- Search functionality
