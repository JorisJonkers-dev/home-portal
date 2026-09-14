import { expect, test } from '@playwright/test'

test('opens a project from the index and returns to it via the back link', async ({ page }) => {
  await page.goto('/projects')

  const projectRows = page.getByTestId('project-row-link')
  await expect(projectRows).toHaveCount(8)

  const project = projectRows.first()
  const title = (await project.getByTestId('project-row-title').textContent())?.trim() ?? ''
  const href = (await project.getAttribute('href')) ?? ''
  expect(title).not.toBe('')
  expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/)

  await project.click()

  await expect(page).toHaveURL(href)
  await expect(page.getByTestId('detail-title')).toHaveText(title)
  await expect(page.getByTestId('detail-path')).toContainText(`~/projects/${href.replace('/projects/', '')}`)

  const backLink = page.getByTestId('back-link')
  await expect(backLink).toHaveAttribute('href', '/projects')
  await backLink.click()

  await expect(page).toHaveURL('/projects')
  await expect(page.getByTestId('projects-index-title')).toBeVisible()
  await expect(projectRows).toHaveCount(8)
})

test('unknown project id shows the not-found state', async ({ page }) => {
  await page.goto('/projects/does-not-exist')

  await expect(page.getByTestId('project-not-found')).toBeVisible()
  await expect(page.getByTestId('detail-title')).toHaveCount(0)
})
