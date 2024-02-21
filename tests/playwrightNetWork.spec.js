import { expect } from '@playwright/test';
import Profile from '../src/pages/Profile';
import { test } from '../src/fixture/pageFixture'

test('Mock data', async ({ welcomePageFixture, page }) => {
    await page.route('https://qauto.forstudy.space/api/users/profile', route => {
        route.fulfill({ body: '{"status":"ok","data":{"userId":91513,"photoFilename":"default-user.png","name":"Tom","lastName":"Test"}}' });
    })
    const profile = new Profile(page)
    await profile.profileMenu.click()
    await expect(profile.profileName).toHaveText("Tom Test")
})