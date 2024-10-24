# MovieDB Full-Stack Project

Welcome to our group project for the final two weeks of the Coding Dojo bootcamp! We are embarking on an exciting journey to build a professional-grade, full-stack MovieDB website using the MERN (MongoDB, Express.js, React, Node.js) stack and importing data from the OMDb API. This project is designed to showcase the skills we’ve honed over our intensive coding bootcamp and prepare us for the next step in our developer careers.

## Project Overview

Our MovieDB website will serve as a comprehensive platform where users can search for and view detailed information about movies. This will include movie summaries, ratings, posters, and more, all fetched from the OMDb API. This project will encapsulate our knowledge of front-end and back-end development, database management, API integration, and more.

## Project Goals
- **Full-Stack Development**: Develop a fully functional web application using the MERN stack.
- **API Integration**: Integrate with the OMDb API to fetch and display movie data.
- **Professional Design**: Implement a user-friendly and aesthetically pleasing UI/UX.
- **Collaboration**: Work collaboratively using Git/GitHub for version control and project management.
- **Deployment**: Deploy the application to a cloud service for public access.

## Features
- **Movie Search**: Users can search for movies by title, and the app will display relevant information fetched from the OMDb API.
- **Movie Details**: Detailed view for each movie, including ratings, release date, synopsis, cast, and more.
- **User Authentication**: Secure login and registration system to personalize user experience.
- **Favorites List**: Users can create and manage a list of their favorite movies.
- **Responsive Design**: Ensure the website is mobile-friendly and accessible on various devices.

## Tech Stack
- **Front-End**: React.js for building a dynamic and responsive user interface.
- **Back-End**: Node.js and Express.js for building a robust server-side application.
- **Database**: MongoDB for storing user data and movie details.
- **API**: OMDb API for fetching up-to-date movie information.
- **Deployment**: Utilize services like Heroku or Netlify for hosting our application.

## Project Structure
### Front-End
- `src/components`: React components for various parts of the UI.
- `src/pages`: Pages of the application.
- `src/services`: Services for making API calls and handling data.

### Back-End
- `routes`: Express routes for handling API requests.
- `models`: Mongoose models for interacting with the MongoDB database.
- `controllers`: Controller functions for business logic.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MongoDB installed or access to a MongoDB Atlas cluster.
- OMDb API key.

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/moviedb-project.git
    cd moviedb-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your OMDb API key and MongoDB connection string.
    ```env
    OMDB_API_KEY=your_api_key_here
    MONGO_URI=your_mongodb_uri_here
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.

## File Structure:
```
├── Project_Proposal
│   ├── MovieDB_Wireframe.pdf
│   └── gp_project_parameters.txt
├── backend
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   └── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── movieRoutes.js
│   │   └── userRoutes.js
│   └── server.js
└── frontend
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   └── Navbar.jsx
    │   ├── context
    │   │   └── AuthContext.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages
    │       ├── Favorites.jsx
    │       ├── Home.jsx
    │       ├── Login.jsx
    │       ├── MovieDetail.jsx
    │       ├── Profile.jsx
    │       └── Register.jsx
    └── vite.config.js
```

## Collaboration
- **Version Control**: Use Git and GitHub for version control. Create branches for new features and open pull requests for code reviews.
- **Project Management**: Utilize GitHub Projects for tracking tasks and milestones.
- **Communication**: Using Discord for real-time communication and collaboration.

## Contribution Guidelines
- Follow the coding standards and guidelines provided in the repository.
- Write clear and concise commit messages.
- Ensure all new features and changes are tested thoroughly.
- Participate actively in code reviews and provide constructive feedback.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

Let's leverage our skills, creativity, and teamwork to build something truly amazing. Together, we will create a professional-grade application that showcases our abilities and prepares us for the next steps in our development careers. Happy coding! 🚀
