import { test, expect } from './fixtures/userGaragePage';

test('user can see garage page after login', async ({ userGaragePage }) => {
  await userGaragePage.open();
  await expect(userGaragePage.addCarButton).toBeVisible();
});

