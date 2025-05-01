# AI Resume Builder

![React](https://img.shields.io/badge/React-^18.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-^4.0-brightgreen.svg)
![Node.js](https://img.shields.io/badge/Node.js-^18.0-orange.svg)
![Gemini API](https://img.shields.io/badge/Gemini_API-Enabled-lightgrey.svg)

## Overview

This project is an AI-powered resume builder using a React frontend (built with Vite) and a Node.js backend. It leverages the Gemini API to help users generate resume content based on their input.

**Key Features:**

* Generates resume content suggestions using AI.
* Offers customizable resume templates.
* Provides a user-friendly interface.
* Allows users to download their resumes.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Your Username]/[Your Repository Name].git
    cd [Your Repository Name]
    ```

2.  **Backend setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your Gemini API key:
    # GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    npm run dev
    ```

3.  **Frontend setup:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

4.  Access the application in your browser (usually at `http://localhost:5173`).

## Usage

Follow the on-screen instructions to input your information and generate your resume. You can then review and download the result.