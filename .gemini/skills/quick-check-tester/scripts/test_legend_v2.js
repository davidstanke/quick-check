async (page) => {
  const screenshotDir = '.playwright-mcp';
  
  // Set all metrics in URL to go straight to results
  await page.goto('http://localhost:5173/?leadtime=5&deployfreq=5&changefailure=10&failurerecovery=5&industry=all');
  
  // Wait for results
  await page.waitForSelector('.yourPerformance', { timeout: 10000 });
  
  // 1. Verify legend link exists
  const legendLink = page.getByRole('link', { name: 'legend' });
  const legendLinkVisible = await legendLink.isVisible();
  if (!legendLinkVisible) return "Failure: Legend link not found or not visible.";
  
  // 2. Take screenshot of results page
  await page.screenshot({ path: `${screenshotDir}/results-with-legend-link.png` });

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
  
  // 6. Check if baselineText is present in modal
  const legendHeader = modal.locator('.legend-header');
  const legendHeaderText = await legendHeader.innerText();
  console.log("Legend Header:", legendHeaderText);
  if (!legendHeaderText || legendHeaderText.trim().length === 0) {
     return "Failure: Legend header (baseline text) is empty.";
  }

  await page.screenshot({ path: `${screenshotDir}/legend-modal-visible.png` });

  // 7. Click close button
  const closeBtn = modal.locator('.modal-close-x');
  await closeBtn.click();
  
  // 8. Verify modal is closed
  await modal.waitFor({ state: 'hidden', timeout: 5000 });
  const modalHidden = await modal.isHidden();
  if (!modalHidden) return "Failure: Legend modal did not close.";

  return "Success: Legend link and modal verified.";
}
