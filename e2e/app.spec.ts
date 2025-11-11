import { test, expect } from '@playwright/test';

test.describe('Hello World App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Hello World - Zoneless Angular App');
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.locator('.subtitle')).toContainText('zoneless Angular 20 application');
  });

  test('should display all users by default', async ({ page }) => {
    const rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(5);
  });

  test('should have a search input', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search by name, email, or department...');
  });

  test('should have a search button', async ({ page }) => {
    const searchButton = page.locator('[data-testid="search-button"]');
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toContainText('Search');
  });

  test('should filter users when searching by name', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');
    
    // Type in search input - search for "Doe" which only matches one user
    await searchInput.fill('Doe');
    await searchButton.click();
    
    // Wait for filtering to happen
    await page.waitForTimeout(100);
    
    // Should show only one user
    const rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(1);
    
    // Verify it's the correct user
    await expect(rows.first()).toContainText('John Doe');
  });

  test('should filter users when searching by email', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');
    
    await searchInput.fill('jane.smith@example.com');
    await searchButton.click();
    
    await page.waitForTimeout(100);
    
    const rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Jane Smith');
  });

  test('should filter users when searching by department', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');
    
    await searchInput.fill('Engineering');
    await searchButton.click();
    
    await page.waitForTimeout(100);
    
    const rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(2); // John Doe and Alice Williams
  });

  test('should show "No users found" when no results match', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');
    
    await searchInput.fill('NonexistentUser');
    await searchButton.click();
    
    await page.waitForTimeout(100);
    
    const noResults = page.locator('.no-results');
    await expect(noResults).toBeVisible();
    await expect(noResults).toContainText('No users found');
  });

  test('should show all users when search is cleared', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');
    
    // First search for something specific
    await searchInput.fill('Doe');
    await searchButton.click();
    await page.waitForTimeout(100);
    
    // Verify filtered
    let rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(1);
    
    // Clear search
    await searchInput.fill('');
    await searchButton.click();
    await page.waitForTimeout(100);
    
    // Should show all users again
    rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(5);
  });

  test('should display the correct table headers', async ({ page }) => {
    await expect(page.locator('.users-table th').nth(0)).toContainText('ID');
    await expect(page.locator('.users-table th').nth(1)).toContainText('Name');
    await expect(page.locator('.users-table th').nth(2)).toContainText('Email');
    await expect(page.locator('.users-table th').nth(3)).toContainText('Department');
  });

  test('should display user data in table', async ({ page }) => {
    // Check first user row
    const firstRow = page.locator('[data-testid="user-row"]').first();
    await expect(firstRow.locator('td').nth(0)).toContainText('1');
    await expect(firstRow.locator('td').nth(1)).toContainText('John Doe');
    await expect(firstRow.locator('td').nth(2)).toContainText('john.doe@example.com');
    await expect(firstRow.locator('td').nth(3)).toContainText('Engineering');
  });
});
