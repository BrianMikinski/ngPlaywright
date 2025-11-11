# ngPlaywright
Hello world app demonstrating Angular 20 and Playwright

## Overview

This is a **zoneless** Angular 20 application that demonstrates:
- Zoneless change detection using `provideZonelessChangeDetection()`
- A simple UI with search functionality
- A data table with demo user data
- Playwright end-to-end testing with best practices

## Features

- **Search Box**: Filter users by name, email, or department
- **Search Button**: Trigger the search
- **Data Table**: Display user information with 5 demo records
- **Zoneless Architecture**: Uses Angular's experimental zoneless change detection for better performance

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Playwright Testing

This project uses Playwright for end-to-end testing, following best practices for Angular applications.

### Install Playwright Browsers

If you haven't already installed Playwright browsers:

```bash
npx playwright install
```

### Run E2E Tests

Run tests in headless mode (default):

```bash
npm run e2e
```

Run tests in headed mode (see the browser):

```bash
npm run e2e:headed
```

Run tests with Playwright UI mode (interactive):

```bash
npm run e2e:ui
```

View the last test report:

```bash
npm run e2e:report
```

### Test Structure

- Tests are located in the `e2e/` directory
- Configuration is in `playwright.config.ts`
- Tests automatically start the dev server before running

### Available Playwright Scripts

- `npm run e2e` - Run all tests in headless mode
- `npm run e2e:headed` - Run tests with visible browser
- `npm run e2e:ui` - Run tests in interactive UI mode
- `npm run e2e:report` - Open the HTML test report

## Project Structure

```
ngPlaywright/
├── e2e/                    # Playwright E2E tests
│   └── app.spec.ts         # Main app test suite
├── src/
│   ├── app/
│   │   ├── app.ts          # Main app component (zoneless)
│   │   ├── app.html        # App template
│   │   ├── app.css         # App styles
│   │   └── app.config.ts   # App configuration (zoneless)
│   ├── index.html          # Main HTML file
│   ├── main.ts             # Bootstrap file
│   └── styles.css          # Global styles
├── playwright.config.ts    # Playwright configuration
├── angular.json            # Angular CLI configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Zoneless Configuration

This application uses Angular's zoneless change detection, configured in `src/app/app.config.ts`:

```typescript
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // ... other providers
  ]
};
```

Benefits of zoneless:
- Better performance (no Zone.js overhead)
- More explicit change detection
- Smaller bundle size
- Modern Angular architecture

## Technologies Used

- **Angular 20.3** - Modern web framework
- **TypeScript 5.9** - Type-safe JavaScript
- **Playwright 1.56** - End-to-end testing framework
- **CSS3** - Styling

## License

This project is open source and available under the MIT License.
