import { expect, test } from '@playwright/test'

test('opens a project from the home page and returns via the back link', async ({ page }) => {
  await page.goto('/#projects')

  const cards = page.getByTestId('card-link')
  await expect(cards).toHaveCount(8)

  const card = cards.first()
  const href = (await card.getAttribute('href')) ?? ''
  expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/)

  const title = (await page.getByTestId('card').first().locator('h3').textContent())?.trim() ?? ''
  expect(title).not.toBe('')

  await card.click()

  await expect(page).toHaveURL(href)
  await expect(page.getByTestId('detail-title')).toHaveText(title)
  await expect(page.getByTestId('detail-path')).toContainText(`~/projects/${href.replace('/projects/', '')}`)

  const backLink = page.getByTestId('back-link')
  await expect(backLink).toHaveAttribute('href', '/#projects')
  await backLink.click()

  await expect(page).toHaveURL('/#projects')
  await expect(cards).toHaveCount(8)
})

test('unknown project id shows the not-found state', async ({ page }) => {
  await page.goto('/projects/does-not-exist')

  await expect(page.getByTestId('project-not-found')).toBeVisible()
  await expect(page.getByTestId('detail-title')).toHaveCount(0)
})
