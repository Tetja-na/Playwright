import { test, expect } from './fixtures/userGaragePage';

test('user can see garage page after login', async ({ userGaragePage }) => {
  await expect(userGaragePage.locator('text=Add car')).toBeVisible();
});
