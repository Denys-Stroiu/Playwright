import { test, chromium } from '@playwright/test';

test.describe('Login', async () => {
 
  test('login', async ({ page }) => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const request = context.request
    const authResp = await request.post(`${process.env.BASE_URL}${process.env.API_ENDPOINT}/auth/signin`, {
      data: {
        email: process.env.API_EMAIL,
        password: process.env.API_PASSWORD,
        remember: false,
      }
    })
    const sid = authResp.headers()['set-cookie'].split(';')[0]
    process.env.AUTH_SID = sid
  })
})