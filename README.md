# Event Booking Test Automation

A comprehensive end-to-end test automation framework built with Playwright for the Event Booking application.

## 🚀 Project Overview

- **Framework**: Playwright Test
- **Design Pattern**: Page Object Model (POM)
- **Language**: JavaScript
- **Testing Approach**: Data-driven testing
- **Cross-browser Support**: Chromium, Firefox, WebKit, Mobile Chrome

## 📁 Project Structure

```
Event-Booking/
├── pages/              # Page Object Models
│   ├── loginPage.js    # Login page actions and elements
│   └── signup.js       # Signup page actions and elements
├── tests/              # Test Specifications
│   ├── login.spec.js   # Login flow tests
│   └── signup.spec.js  # Signup flow tests
├── utils/              # Utilities and Helpers
│   ├── helpers.js      # Common helper functions
│   └── loginData.json  # Test data
├── .env                # Environment variables
└── playwright.config.js
```

## 🛠️ Setup Instructions

1. **Clone the Repository**
```bash
git clone <repository-url>
cd Event-Booking
```

2. **Install Dependencies**
```bash
npm install
```

3. **Install Playwright Browsers**
```bash
npx playwright install
```

## ⚙️ Configuration

Create a `.env` file in the project root with these variables:

```properties
BASE_EMAIL=your_test_email@yopmail.com
PASSWORD=your_password
PASSWORD_WEAK=123
BASE_URL=https://www.eventbookings.com
AUTH_URL=https://identity.eventbookings.com
```

## Running Tests

### Run All Tests
```bash
# Headless mode (default)
npm run test

# Headed mode (with browser visible)
npm run test -- --headed
```

### Run Specific Test Files
```bash
# Run specific test file in headless mode
npx playwright test tests/login.spec.js

# Run specific test file in headed mode
npx playwright test tests/login.spec.js --headed
```

### Run Specific Test Suites
```bash
# Login Tests (headless)
npm run test:login

# Login Tests (headed)
npm run test:login -- --headed

# Signup Tests (headless)
npm run test:signup

# Signup Tests (headed)
npm run test:signup -- --headed

# Smoke Tests
npm run test:smoke

# Regression Tests
npm run test:regression
```

### Debug Mode
```bash
# Run tests in debug mode
npx playwright test --debug

# Run specific test file in debug mode
npx playwright test tests/login.spec.js --debug
```

### View Test Reports
```bash
npm run test:report
```

> **Note**: 
> - Headed mode shows the browser UI during test execution
> - Headless mode (default) runs tests in the background
> - Debug mode opens Playwright Inspector for step-by-step debugging



##  Test Coverage

### Login Flow (@login)
| Test Case | Description | Tag |
|-----------|-------------|-----|
| Valid Login | Successful login with valid credentials | @smoke |
| Invalid Password | Error validation for wrong password | @regression |
| Invalid Email | Error validation for invalid email format | @regression |
| Empty Fields | Validation for empty form submission | @regression |

### Signup Flow (@signup)
| Test Case | Description | Tag |
|-----------|-------------|-----|
| New User Registration | Complete signup flow | @smoke |
| Duplicate Email | Validation for existing email | @regression |
| Password Strength | Weak password validation | @regression |
| Location Selection | Country/Geo selection flow | @smoke |

##  Test Tags

- `@smoke`: Critical path tests
- `@regression`: Error scenarios and validations
- `@login`: Login flow tests
- `@signup`: Signup flow tests

##  Known Limitations

1. **Test Execution**
   - Sequential test execution only
   - 2 retry attempts on failure
   - Base timeout: 30 seconds

2. **Browser Compatibility**
   - Primary testing on Chromium
   - Mobile viewport testing may have limitations

3. **Network Dependencies**
   - Stable internet connection required
   - API response time variations may affect tests


##  Reports

Access HTML reports after test execution:
- Test results summary
- Execution timeline
- Error screenshots
- Trace viewer for failed tests
- Step-by-step execution details


## Troubleshooting
- If tests fail, check the HTML report for screenshots and traces
- Verify your credentials in `.env` are correct
- Ensure the test URLs are accessible from your network
- For timeout issues, increase timeouts in `playwright.config.js`
