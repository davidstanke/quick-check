async (page) => {
  const screenshotDir = '.playwright-mcp';
  
  await page.goto('http://localhost:5173');
  
  // Navigate through 4 questions
  for (let i = 1; i <= 4; i++) {
    await page.waitForSelector('h5', { state: 'visible', timeout: 30000 });
    const labels = page.locator('.inputs label');
    const count = await labels.count();
    if (count > 0) {
      await labels.nth(0).click();
    } else {
       const radios = page.locator('.inputs input[type="radio"]');
       await radios.nth(0).click({ force: true });
    }
    await page.waitForTimeout(1000); 
  }
  
  await page.waitForSelector('.yourPerformance', { timeout: 10000 });
  
  // 1. Verify legend link exists
  const legendLink = page.getByRole('link', { name: 'legend' });
  const legendLinkVisible = await legendLink.isVisible();
  if (!legendLinkVisible) return "Failure: Legend link not found or not visible.";
  
  // 2. Take screenshot of results page without legend
  await page.screenshot({ path: `${screenshotDir}/results-no-legend.png` });

  // 3. Click legend link
  await legendLink.click();
  
  // 4. Verify modal appears
  const modal = page.locator('.modal-container');
  await modal.waitFor({ state: 'visible', timeout: 5000 });
  const modalVisible = await modal.isVisible();
  if (!modalVisible) return "Failure: Legend modal did not appear.";

  // 5. Verify legend content in modal
  const legendContent = modal.locator('.legend');
  const legendContentVisible = await legendContent.isVisible();
  if (!legendContentVisible) return "Failure: Legend content not found in modal.";
  
  await page.screenshot({ path: `${screenshotDir}/legend-modal.png` });

  // 6. Click close button
  const closeBtn = modal.locator('.modal-close-x');
  await closeBtn.click();
  
  // 7. Verify modal is closed
  await modal.waitFor({ state: 'hidden', timeout: 5000 });
  const modalHidden = await modal.isHidden();
  if (!modalHidden) return "Failure: Legend modal did not close.";

  return "Success: Legend link and modal verified.";
}
