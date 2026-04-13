async (page) => {
  await page.goto('http://localhost:5173');
  
  // Question 1
  await page.waitForSelector('h5', { state: 'visible', timeout: 10000 });
  
  // Verify NO legend link
  const legendLink = page.getByRole('link', { name: 'legend' });
  const legendLinkVisible = await legendLink.isVisible();
  if (legendLinkVisible) return "Failure: Legend link found on question page!";
  
  return "Success: No legend link on question page.";
}
