# Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)

### Installation

Follow the steps below to set up the project:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sunniekapar/unipie-oa.git
   cd unipie-oa
   ```

2. **Set up the backend:**

   ```sh
   cd backend
   bun i
   bun run dev
   ```

3. **Set up the frontend:**
   ```sh
   cd ../frontend
   bun i
   bun run dev
   ```

### Running the Application

After completing the setup, you should be able to access the frontend at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project is organized into two main directories:

- `backend`: Contains jwt protected api routes to the OpenWeatherMap API.
- `frontend`: Contains auth, and front end code.
