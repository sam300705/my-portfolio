"""Browser integration checks. Run: python3 scripts/smoke_test.py"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from shutil import which
from threading import Thread
import json
from urllib.request import urlopen
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def check_assets(page, base):
    paths = page.locator('[src], link[href]').evaluate_all("""nodes => nodes.flatMap(n => {
      const value = n.getAttribute('src') || n.getAttribute('href');
      return value && !/^(https?:|data:)/.test(value) ? [value] : [];
    })""")
    paths += ['assets/Kumar-Sambhav-Resume.pdf', 'assets/og-card.png', 'robots.txt', 'sitemap.xml']
    paths += page.locator('a[href^="assets/certificates/"]').evaluate_all('links => links.map(a => a.getAttribute("href"))')
    manifest = json.loads(urlopen(base + 'site.webmanifest').read())
    paths += [icon['src'] for icon in manifest['icons']]
    for path in set(paths):
        with urlopen(base + path) as response:
            body = response.read()
            assert response.status == 200 and body, path
            if path.endswith('.pdf'): assert body.startswith(b'%PDF-'), path
    for href in page.locator('a[href^="#"]').evaluate_all('nodes => nodes.map(n => n.hash)'):
        assert page.locator(href).count() == 1, f'Missing anchor: {href}'
    print(f'PASS: {len(set(paths))} local resources and all internal anchors')


def run(base):
    with sync_playwright() as pw:
        executable = which('chromium') or which('chromium-browser') or which('google-chrome')
        browser = pw.chromium.launch(**({'executable_path': executable} if executable else {}))
        for width in (320, 360, 390, 600, 640, 760, 768, 1024, 1440):
            page = browser.new_page(viewport={'width': width, 'height': 900})
            errors, failed = [], []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('requestfailed', lambda request: failed.append(request.url))
            page.goto(base, wait_until='networkidle')
            assert page.get_by_role('heading', level=1).count() == 1
            assert page.locator('.project-card:visible').count() == 5
            assert page.locator('main > section').evaluate_all("sections => sections.map(s => s.id).join(',')") == ',work,about,certifications,contact'
            assert page.locator('#certifications h2').inner_text() == 'Always a student.'
            assert page.locator('#certifications .credential').count() == 7
            assert page.locator('#certifications .credential:visible').count() == 5
            assert page.get_by_role('heading', name='AI Career Readiness Training', exact=True).is_visible()
            assert page.get_by_role('heading', name='Data Science Job Simulation', exact=True).is_visible()
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), width
            assert page.locator('img').evaluate_all('images => images.every(i => i.complete && i.naturalWidth > 0)')
            assert page.evaluate('document.fonts.check("500 16px Manrope")')
            if width == 1440:
                check_assets(page, base)
            filters = [('Web & product', 2), ('AI & security', 2), ('Developer tools', 1), ('All work', 5)]
            for name, expected in filters:
                button = page.get_by_role('button', name=name)
                button.click()
                assert button.get_attribute('aria-pressed') == 'true'
                assert page.locator('.project-card:visible').count() == expected
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')
            details = page.locator('#agentshield details')
            details.locator('summary').click()
            assert details.locator('.detail-body').is_visible()
            assert 'Static scanners' in details.inner_text()
            details.locator('summary').click()
            details.locator('.detail-body').wait_for(state='hidden')
            archive = page.locator('.archive')
            archive.locator('summary').click()
            assert archive.locator('.archive-list a:visible').count() == 8
            archive.locator('summary').click()
            if width <= 760:
                toggle = page.get_by_role('button', name='Open navigation')
                toggle.click()
                assert page.get_by_role('navigation').get_by_role('link', name='Work', exact=True).is_visible()
                page.keyboard.press('Escape')
                assert toggle.get_attribute('aria-expanded') == 'false'
                assert toggle.evaluate('(el) => el === document.activeElement')
                toggle.click()
                page.get_by_role('navigation').get_by_role('link', name='About', exact=True).click()
                assert page.url.endswith('#about')
                assert toggle.get_attribute('aria-expanded') == 'false'
                toggle.click()
            page.get_by_role('navigation').get_by_role('link', name='Certifications', exact=True).click()
            assert page.url.endswith('#certifications')
            assert page.locator('#certifications .credentials-list').is_visible()
            if width in (390, 1440):
                more = page.locator('.credentials-more')
                more.locator('summary').focus()
                page.keyboard.press('Enter')
                more.locator('.credentials-more-list').wait_for(state='visible')
                assert page.locator('#certifications .credential:visible').count() == 7
                assert page.locator('#certifications a[href^="assets/certificates/"]').count() == 5
                assert page.locator('a[href="https://verify.skilljar.com/c/yy6sk6home9p"]').count() == 1
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')
                more.locator('summary').click()
                more.locator('.credentials-more-list').wait_for(state='hidden')
            if width <= 760: assert toggle.get_attribute('aria-expanded') == 'false'
            assert not errors, errors
            assert not failed, failed
            print(f'PASS: {width}px layout, filters, disclosures, navigation, assets, no page errors')
            page.close()
        # Interrupted transitions must settle correctly after rapid interaction.
        page = browser.new_page(viewport={'width':390,'height':844})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(base, wait_until='networkidle')
        summary = page.locator('#agentshield summary')
        summary.scroll_into_view_if_needed()
        page.evaluate("""() => {
          const summary = document.querySelector('#agentshield summary');
          summary.click(); summary.click(); summary.click();
        }""")
        page.wait_for_function("document.querySelector('#agentshield').querySelector('details').open && !document.querySelector('#agentshield .disclosure-panel').getAnimations().length")
        assert page.locator('#agentshield .detail-body').is_visible()
        page.evaluate("document.querySelector('#agentshield summary').click()")
        page.emulate_media(reduced_motion='reduce')
        page.locator('#agentshield .detail-body').wait_for(state='hidden')
        assert page.locator('#agentshield .disclosure-panel').evaluate('(el) => el.style.overflow') == ''
        # No custom motion should start after the preference changes mid-visit.
        page.get_by_role('button',name='Web & product').click()
        assert page.locator('.project-card:visible').count() == 2
        assert page.locator('.projects-grid').evaluate('(el) => el.getAnimations({subtree:true}).length') == 0
        toggle = page.get_by_role('button',name='Open navigation')
        toggle.click()
        assert page.locator('#nav-links').is_visible()
        page.keyboard.press('Escape')
        assert not page.locator('#nav-links').is_visible()
        page.emulate_media(reduced_motion='no-preference')
        page.evaluate("""() => {
          const menu = document.querySelector('.menu-toggle');
          menu.click(); menu.click(); menu.click();
        }""")
        page.wait_for_function("document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true' && !document.querySelector('#nav-links').getAnimations().length")
        assert page.locator('#nav-links').evaluate('(el) => !el.inert')
        page.set_viewport_size({'width':1024,'height':900})
        page.wait_for_function("!document.querySelector('#nav-links').classList.contains('is-open')")
        assert page.get_by_role('navigation').get_by_role('link',name='Work',exact=True).is_visible()
        assert not errors, errors
        print('PASS: interrupted disclosures, rapid menu clicks, resize, and live reduced-motion changes')
        page.close()
        # Exercise the browser timeline and the older-browser fallback separately.
        for force_fallback in (False, True):
            page = browser.new_page(viewport={'width':390,'height':844})
            if force_fallback:
                page.add_init_script("""
                  const originalSupports = CSS.supports.bind(CSS);
                  CSS.supports = (...args) => args[0] === 'animation-timeline' ? false : originalSupports(...args);
                """)
            page.goto(base, wait_until='networkidle')
            page.wait_for_function('document.fonts.status === "loaded"')
            if not force_fallback:
                assert page.locator('.reading-progress').evaluate('(el) => el.classList.contains("is-scroll-driven")')
                session = page.context.new_cdp_session(page)
                window_id = session.send('Runtime.evaluate', {'expression':'window'})['result']['objectId']
                listeners = session.send('DOMDebugger.getEventListeners', {'objectId':window_id})['listeners']
                assert not [listener for listener in listeners if listener['type'] == 'scroll']
                session.detach()
            # Mid-page and final progress must follow actual scroll position.
            page.evaluate('window.scrollTo({top: (document.documentElement.scrollHeight-innerHeight)/2, behavior:"instant"})')
            page.wait_for_function("Math.abs(parseFloat(getComputedStyle(document.querySelector('.reading-progress')).transform.split('(')[1]) - .5) < .03")
            page.evaluate('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})')
            page.wait_for_function('getComputedStyle(document.querySelector(".reading-progress")).transform === "matrix(1, 0, 0, 1, 0, 0)"')
            # Changing document height must not leave a stale progress range.
            page.locator('.archive').evaluate('(el) => el.open = true')
            page.evaluate('window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*.25,behavior:"instant"})')
            page.wait_for_function("Math.abs(parseFloat(getComputedStyle(document.querySelector('.reading-progress')).transform.split('(')[1]) - .25) < .03")
            page.evaluate('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})')
            page.wait_for_function('getComputedStyle(document.querySelector(".reading-progress")).transform === "matrix(1, 0, 0, 1, 0, 0)"')
            page.locator('.archive').evaluate('(el) => el.open = false')
            page.emulate_media(reduced_motion='reduce')
            page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
            page.wait_for_function('getComputedStyle(document.querySelector(".reading-progress")).transform === "matrix(0, 0, 0, 1, 0, 0)"')
            # Anchor targets remain below the sticky header, including keyboard focus.
            page.locator('a[href="#about"]').first.evaluate('(el) => el.click()')
            page.wait_for_function("Math.abs(document.querySelector('#about').getBoundingClientRect().top - document.querySelector('.site-header').getBoundingClientRect().bottom - 20) < 2")
            assert page.url.endswith('#about')
            print('PASS: scroll progress, height changes, reduced motion, and anchor offset (' + ('cached fallback' if force_fallback else 'native timeline; no JS scroll listener') + ')')
            page.close()
        # Clipboard success and permission-denied behavior.
        context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
        page = context.new_page()
        page.goto(base, wait_until='networkidle')
        page.get_by_role('button', name='Copy email address').click()
        page.get_by_text('Email copied', exact=True).wait_for()
        assert page.evaluate('navigator.clipboard.readText()') == 'krsambhav05@gmail.com'
        page.evaluate("() => { navigator.clipboard.writeText = () => Promise.reject(new Error('Denied')); }")
        page.get_by_role('button', name='Copy email address').click()
        page.get_by_text('Select the email above to copy', exact=True).wait_for()
        page.evaluate('window.scrollTo({top: document.documentElement.scrollHeight, behavior: "instant"})')
        page.wait_for_function('getComputedStyle(document.querySelector(".reading-progress")).transform === "matrix(1, 0, 0, 1, 0, 0)"')
        print('PASS: clipboard success/fallback and reading progress reaches page end')
        context.close()
        page = browser.new_page(reduced_motion='reduce')
        page.goto(base, wait_until='networkidle')
        assert page.locator('html').evaluate('(el) => getComputedStyle(el).scrollBehavior') == 'auto'
        assert page.locator('.hero-copy').evaluate('(el) => getComputedStyle(el).animationName') == 'none'
        assert page.locator('.hero-copy > h1').evaluate('(el) => getComputedStyle(el).animationName') == 'none'
        print('PASS: reduced-motion preference')
        page.close()
        page = browser.new_page(java_script_enabled=False, viewport={'width':390,'height':844})
        page.goto(base, wait_until='networkidle')
        assert page.get_by_role('navigation').get_by_role('link', name='Work', exact=True).is_visible()
        assert page.locator('.project-card:visible').count() == 5
        assert page.get_by_role('navigation').get_by_role('link', name='Certifications', exact=True).is_visible()
        assert page.locator('#certifications h2').inner_text() == 'Always a student.'
        assert page.locator('#certifications .credential').count() == 7
        page.locator('.credentials-more summary').click()
        assert page.locator('#certifications .credential:visible').count() == 7
        assert not page.locator('.filters').is_visible()
        page.locator('#agentshield summary').click()
        assert page.locator('#agentshield .detail-body').is_visible()
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')
        print('PASS: no-JavaScript mobile navigation and project notes')
        page.close()
        browser.close()


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        run(f'http://127.0.0.1:{server.server_port}/')
    finally:
        server.shutdown()
        server.server_close()
