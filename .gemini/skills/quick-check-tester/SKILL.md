---
name: quick-check-tester
description: Test the DORA Quick Check application by navigating through the kiosk-mode questionnaire with random answers and verifying the results page. Use this when you need to quickly verify the end-to-end flow of the application.
---

# Quick Check Tester

This skill automates the testing of the DORA Quick Check application. It starts the development server, navigates through the 4 questions in kiosk mode using random selections, and confirms that the results page is displayed.

## 🚫 Constraints
**NEVER** change the application mode. Leave it in Kiosk mode.

## Prerequisites

- Node.js and npm installed.
- Playwright MCP server available.

## Workflow

1. **Start the Application**: Ensure the development server is running. If not, start it:
   ```bash
   npm run dev
   ```
   (Wait for it to be ready on `http://localhost:5173`)

2. **Execute the Test**: Use the `mcp_playwright_browser_run_code` tool with the following script content. The script will:
   - Navigate to the application.
   - For each of the 4 questions:
     - Take a screenshot.
     - Select a random answer.
     - Wait for the transition.
   - Confirm the results page and take a final screenshot.

3. **Verify Screenshots**: Check the `.playwright-mcp` directory for screenshots:
   - `question-1.png`
   - `question-2.png`
   - `question-3.png`
   - `question-4.png`
   - `results.png`

## Implementation Details

The test logic is contained in `scripts/test_app.js`. You can read this file and pass its content to `mcp_playwright_browser_run_code`.

```javascript
// Example usage:
// 1. Read .gemini/skills/quick-check-tester/scripts/test_app.js
// 2. Pass the content to mcp_playwright_browser_run_code
```
