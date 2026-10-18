import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell error-page">
      <span className="eyebrow">404 / WRONG TURN</span>
      <h1>
        This page hasn’t
        <br />
        been built.
      </h1>
      <p>The work you’re looking for might be on the homepage.</p>
      <Link className="button" href="/">
        Back to the portfolio
      </Link>
    </main>
  );
}
