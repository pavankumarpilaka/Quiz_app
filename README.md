# Quiz App

## Description
The Quiz App is an interactive web-based application built with React and Vite that allows users to test their knowledge by answering multiple-choice and numeric-based questions. The app includes a timer for each question, stores quiz results in IndexedDB for history tracking, and provides feedback on user responses.

## Features
- Multiple-choice and numeric-based questions
- Countdown timer (30 seconds per question)
- Automatic transition to the next question when time runs out
- Score tracking and results display
- IndexedDB integration to save and retrieve quiz history
- Toast notifications for correct/incorrect answers
- Responsive UI with dynamic feedback on selections

## Installation

### Prerequisites
Ensure you have Node.js and npm installed on your system.

1. Clone the repository:
   ```sh
   git clone https://github.com/pavankumarpilaka/Quiz_app.git
   cd Quiz-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server using Vite:
   ```sh
   npm run dev
   ```

## Usage
- Start the quiz and answer each question within the time limit.
- Select an answer (or input a numeric response) and receive instant feedback.
- Click "Next" to proceed or let the timer move to the next question automatically.
- View your final score after completing all questions.
- Check past quiz attempts via the "View Quiz History" button.

## Deployment
To deploy the app using Vercel, follow these steps:
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the app:
   ```sh
   vercel
   ```
3. Follow the on-screen instructions to complete deployment.

Alternatively, you can deploy the app using Netlify or GitHub Pages.

## Live Demo
https://quiz-app-phi-blond.vercel.app/

## Technologies Used
- React
- Vite
- IndexedDB
- React Toastify
- HTML/CSS
- JavaScript

## License
This project is licensed under the MIT License.

