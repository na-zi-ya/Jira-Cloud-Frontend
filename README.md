# React Jira Issues Component

This React component fetches issues from the Jira API and displays them with pagination and error handling.


## Features

Fetches Jira issues using Axios.
Displays issues in a paginated table format.
Handles loading state with a loader component.
Displays error message on API request failure.


## Prerequisites
Before running this component, ensure you have:

Node.js installed on your machine.
A .env file configured with REACT_APP_API_URL pointing to your Jira API endpoint.
Installation
Clone the repository:

git clone <https://github.com/naz-i-ya/Jira-Cloud-Frontend>
cd folder

Install dependencies:
npm install


Create a .env file in the root directory:
REACT_APP_API_URL=https://your-jira-api-url

Replace https://your-jira-api-url with your actual Jira API endpoint.

## Usage
To start the development server:

npm start
The component will be accessible at http://localhost:3000.

## Component Overview
The JiraIssues component fetches issues from the Jira API and displays them in a paginated table. It includes:

Pagination buttons (Prev and Next) to navigate through the list of issues.
Issue details such as key, summary, type, priority, status, and assignee.
Styling based on issue priority and status using predefined CSS classes.


## Customization
Adjust the priorityIcons and statusStyle objects in the component to match your Jira instance's specific priority and status styles.



