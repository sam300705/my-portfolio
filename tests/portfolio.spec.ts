import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { certificates, projects, workbench } from "../lib/content";
const widths = [320, 375, 390, 768, 1024, 1440];
for (const width of widths) {
  test(`homepage remains usable at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const broken: string[] = [];
    page.on("response", (r) => {
      if (r.status() >= 400 && r.url().startsWith("http://127.0.0.1"))
        broken.push(`${r.status()} ${r.url()}`);
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Make it work.Make it better.",
    );
    await expect(page.locator(".brand").first()).toContainText("Kumar Sambhav");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.locator("section#certifications article")).toHaveCount(7);
    const titles = await page
      .locator("section#certifications article h3")
      .allTextContents();
    expect(titles.slice(-2)).toEqual([
      "AI Career Readiness Training",
      "Data Science Job Simulation",
    ]);
    await page.locator(".archive summary").click();
    await expect(page.locator(".archive-list a")).toHaveCount(8);
    for (const item of workbench)
      await expect(
        page.getByRole("heading", { name: item.name, exact: true }),
      ).toBeVisible();
    await page.locator(".archive summary").click();
    if (width <= 800) {
      const menu = page.locator(".menu-button");
      await expect(menu).toHaveAccessibleName("Open navigation");
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await expect(menu).toHaveAccessibleName("Close navigation");
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await menu.click();
    }
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/#about$/);
    await expect(
      page.getByText("I’m Sambhav. I like the moment", { exact: false }),
    ).toBeVisible();
    if (width <= 800)
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toHaveAttribute("aria-expanded", "false");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
    expect(broken).toEqual([]);
  });
}
test("architecture explorer supports keyboard navigation and has honest boundaries", async ({
  page,
}) => {
  await page.goto("/");
  const policy = page.getByRole("tab", { name: /Policy/ });
  await policy.click();
  await expect(policy).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("REQUIRE_APPROVAL");
  await policy.press("End");
  await expect(page.getByRole("tab", { name: /Review/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("future scope");
  await page.getByRole("tab", { name: /Review/ }).press("Home");
  await expect(page.getByRole("tabpanel")).toContainText("No live repository");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tab", { name: /Repository/ })).toBeFocused();
});
test("image comparison reveals actual local image files", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const slider = page.getByRole("slider", { name: "Reveal original image" });
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("51");
  await expect(page.getByText("51% original")).toBeVisible();
  const input = await request.get("/assets/projects/imgflow-input.png");
  const output = await request.get("/assets/projects/imgflow-output.png");
  expect(input.ok()).toBeTruthy();
  expect(output.ok()).toBeTruthy();
  expect((await input.body()).equals(await output.body())).toBeFalsy();
});
test("all certificate and resume downloads serve original PDF files", async ({
  request,
}) => {
  for (const file of [
    "/assets/Kumar-Sambhav-Resume.pdf",
    ...certificates.map((c) => `/assets/certificates/${c.file}`),
  ]) {
    const response = await request.get(file);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
});
for (const project of projects) {
  test(`${project.name} case study has real evidence and valid navigation`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/work/${project.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      project.name,
    );
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://sambhavcodes.in/work/${project.slug}`,
    );
    await expect(page.locator("#sources a")).toHaveCount(
      project.sources.length,
    );
    await expect(page.locator("#verification")).toBeVisible();
    await expect(page.locator("#next")).toContainText(project.status);
    await page.getByRole("link", { name: "← All selected work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/work/${project.slug}$`));
    expect(errors).toEqual([]);
  });
}
test("motion reduction persists and follows the system setting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Reduce motion" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Motion reduced" }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("email clipboard success and rejection remain understandable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "krsambhav05@gmail.com",
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = () => Promise.reject(new Error("Denied"));
  });
  await page.getByRole("button", { name: "Email copied" }).click();
  await expect(
    page.getByRole("button", { name: "Select the email address to copy" }),
  ).toBeVisible();
  await context.close();
});
test("content, links, and navigation survive without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Work", exact: true }),
  ).toBeVisible();
  await page.locator(".archive summary").click();
  await expect(page.locator(".archive-list a")).toHaveCount(8);
  await expect(page.locator("#certifications article")).toHaveCount(7);
  await expect(
    page.getByRole("button", { name: "Reduce motion" }),
  ).not.toBeVisible();
  await page.goto("/work/imgflow");
  await expect(
    page.getByRole("link", { name: "Open CLI output" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await context.close();
});
test("metadata, structured data, sitemap, robots, and unknown routes are useful", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Kumar Sambhav — Software with intent");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /assets\/og-card.png/,
  );
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ||
      "{}",
  );
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe("Kumar Sambhav");
  expect(person).not.toHaveProperty("jobTitle");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  for (const p of projects)
    expect(await sitemap.text()).toContain(`/work/${p.slug}`);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/work/not-a-project")).status()).toBe(404);
  expect((await request.get("/index.html", { maxRedirects: 0 })).status()).toBe(
    308,
  );
});
for (const width of [390, 1440]) {
  test(`WCAG A/AA checks at ${width}px, including expanded content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator(".archive summary").click();
    if (width === 390)
      await page.getByRole("button", { name: "Open navigation" }).click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    await page.goto("/work/agentshield");
    const caseResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      caseResults.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}

test("build process opens a readable panel with keyboard support", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const testing = page.locator('details[name="build-process"]').filter({
    has: page.getByRole("heading", { name: "Testing", exact: true }),
  });
  await testing.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(testing).toHaveAttribute("open", "");
  await expect(testing.locator("p")).toBeVisible();
  expect(
    await testing
      .locator("p")
      .evaluate((el) => el.getBoundingClientRect().width),
  ).toBeGreaterThan(400);
  await expect(page.locator('details[name="build-process"][open]')).toHaveCount(
    1,
  );
});
