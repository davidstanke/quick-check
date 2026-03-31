async (page) => {
  const screenshotDir = '.playwright-mcp';
  
  await page.goto('http://localhost:5173');
  
  for (let i = 1; i <= 4; i++) {
    // Wait for the question to be visible
    await page.waitForSelector('h5', { state: 'visible' });
    await page.screenshot({ path: `${screenshotDir}/question-${i}.png` });
    
    // Find labels for the current question
    const labels = page.locator('.inputs label');
    const count = await labels.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      await labels.nth(randomIndex).click();
    } else {
       // If no labels, check for input[type=radio] and click with force:true
       const radios = page.locator('.inputs input[type="radio"]');
       const rCount = await radios.count();
       if (rCount > 0) {
          const randomIndex = Math.floor(Math.random() * rCount);
          await radios.nth(randomIndex).click({ force: true });
       }
    }
    // Wait for transition
    await page.waitForTimeout(1000); 
  }
  
  await page.waitForSelector('.yourPerformance', { timeout: 10000 });
  await page.screenshot({ path: `${screenshotDir}/results.png` });
  
  const isResultsVisible = await page.locator('.yourPerformance').isVisible();
  return isResultsVisible ? "Success: Results page displayed" : "Failure: Results page not found";
}
