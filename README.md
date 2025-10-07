# Playwright Automation Assignment

## Getting Started

Follow these steps to set up and run your Playwright tests.

---

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd PlayWrightAutomation_Assignment
```

---

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.  
Then, install the required npm packages:

```sh
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your base URL:

```env
BASE_URL=https://www.saucedemo.com/
npm install dotenv --save-dev
```

---

### 4. Run the Tests

To execute all test spec files, use:

```sh
npx playwright test
```

Or to run a specific test file in headless mode:

```sh
npx playwright test tests/Login.spec.ts 
```

---

Or to run a specific test file in headed mode:

```sh
npx playwright test tests/Login.spec.ts --headed
```

---

### 5. View Test Results

After running, Playwright will show a summary in the terminal.  
To view the HTML report:

```sh
npx playwright show-report
```

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)

# Playwright Automation Assignment

## Getting Started

Follow these steps to set up and run your Playwright tests.

---

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd PlayWrightAutomation_Assignment
```

---

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.  
Then, install the required npm packages:

```sh
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your base URL:

```env
BASE_URL=https://www.saucedemo.com/
npm install dotenv --save-dev
```

---

### 4. Run the Tests

To execute all test spec files, use:

```sh
npx playwright test
```

Or to run a specific test file in headless mode:

```sh
npx playwright test tests/Login.spec.ts 
```

---

Or to run a specific test file in headed mode:

```sh
npx playwright test tests/Login.spec.ts --headed
```

---

### 5. View Test Results

After running, Playwright will show a summary in the terminal.  
To view the HTML report:

```sh
npx playwright show-report
```

---

## Additional Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
