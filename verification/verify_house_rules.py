from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to the homepage
    page.goto("http://localhost:3001/de")
    page.wait_for_timeout(2000)

    # Scroll to the bottom to see the footer
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)

    # Click on the new "Hausordnung" link
    page.get_by_role("link", name="Hausordnung").click()
    page.wait_for_timeout(2000)

    # Verify the page content
    page.screenshot(path="verification/screenshots/house_rules_de.png")
    page.wait_for_timeout(1000)

    # Navigate to English version
    page.goto("http://localhost:3001/en")
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    page.get_by_role("link", name="House Rules").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/house_rules_en.png")
    page.wait_for_timeout(1000)

    # Navigate to Romanian version
    page.goto("http://localhost:3001/ro")
    page.wait_for_timeout(2000)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    page.get_by_role("link", name="Regulament").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/screenshots/house_rules_ro.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
