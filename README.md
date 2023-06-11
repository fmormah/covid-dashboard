# Test Questions:

## How did you approach solving the problem?

Approach to solving the problem: The problem was broken down into two main parts: sorting and filtering.

- Sorting: To handle sorting, the Redux library was chosen due to its robustness and popularity in managing the state of JavaScript applications. Redux allows me to store the sorting field and direction in a centralized store and update them based on user actions. I chose to handle the sorting operation within the Redux reducer, which is a common practice and ensures that the sorting logic is handled in a consistent and centralized manner​​.

- Filtering: For filtering, I used local component state with React's useState hook. This decision was made based on the assumption that filtering does not need to be shared across multiple components or persisted across different user sessions. The filtering logic itself is straightforward and involves applying the JavaScript filter method to the list of items based on the filter criteria​​.

## Verifying the solution

- I verified the solution by running the application and manually testing (smoke testing) the sorting and filtering functionality. Tried the different sorting options and verify that the list of items is sorted correctly. For filtering, I entered different filter criteria and verify that only the items that meet the criteria are displayed.

- Additionally, writing automated tests using tools like Jest and React Testing Library helps ensure the code works as expected.

- Choosing to write the app using TypeScript also helps with data/type checking and TypeScrept allows the developer experience to reduce potential bugs before they happen with it's code checking features.

## How long did you spend on the exercise?

- Approximatly 3 hours and 15-25mins

## What would you add if you had more time and how?

With more time, additional features could be added to improve the usability and functionality of the application. For example:

- Multi-field sorting: Allow users to sort by multiple fields at the same time.
  Persistent filter and sort options: Store the user's filter and sort choices in the browser's local storage, so they persist across sessions.

- Advanced filtering: Allow more complex filter criteria, such as ranges or multiple values.

- Automated tests: Write more comprehensive automated tests to ensure the sorting and filtering functionality works correctly. This could include tests for edge cases and tests that mock different Redux states.

Implementing these features would involve enhancing the current Redux actions and reducers to handle the additional complexity, as well as updating the UI to allow the user to specify the additional sort and filter options.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies needed for the app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
