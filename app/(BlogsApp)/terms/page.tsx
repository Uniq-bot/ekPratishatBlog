import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ek Pratishat",
  description:
    "Terms and conditions for using the Ek Pratishat blog, including content use, comments, newsletter, and disclaimers.",
};

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: (
      <p>
        By accessing or using the Ek Pratishat website (the &ldquo;Site&rdquo;),
        operated by Ek Pratishat Real Estate Pvt. Ltd. (&ldquo;Ek Pratishat&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be
        bound by these Terms &amp; Conditions (&ldquo;Terms&rdquo;). If you do not
        agree with any part of these Terms, please do not use the Site.
      </p>
    ),
  },
  {
    id: "who-we-are",
    title: "2. About Ek Pratishat",
    body: (
      <p>
        Ek Pratishat is a blog that publishes articles, market insights, and
        educational content related to real estate. Content on the Site is
        shared for general informational purposes and to help readers better
        understand real estate trends, topics, and ideas.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "3. Eligibility & Accounts",
    body: (
      <p>
        Some features of the Site, such as commenting on blog posts or
        managing content through our admin dashboard, may require an account.
        You agree to provide accurate information when creating an account
        and to keep your login credentials confidential. You are responsible
        for all activity that occurs under your account.
      </p>
    ),
  },
  {
    id: "content-use",
    title: "4. Use of Content",
    body: (
      <p>
        All articles, images, logos, and other materials published on the
        Site are owned by Ek Pratishat or used with permission, unless
        otherwise credited. You may read, share, and link to our content for
        personal, non-commercial use. You may not reproduce, republish, or
        distribute our content for commercial purposes without our prior
        written consent.
      </p>
    ),
  },
  {
    id: "comments",
    title: "5. Comments & User Submissions",
    body: (
      <>
        <p>
          If the Site allows you to post comments or other content, you agree
          not to submit anything that is unlawful, defamatory, abusive,
          misleading, infringes on another party&rsquo;s rights, or is
          otherwise inappropriate.
        </p>
        <p>
          We reserve the right, but are not obligated, to review, edit, or
          remove any user-submitted content at our discretion, and to
          suspend or restrict access for users who violate these Terms.
        </p>
      </>
    ),
  },
  {
    id: "newsletter",
    title: "6. Newsletter & Communications",
    body: (
      <p>
        If you subscribe to our newsletter, you agree to receive periodic
        emails from us about new articles, updates, or related content. You
        may unsubscribe at any time using the link provided in our emails or
        by contacting us directly.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "7. Real Estate Disclaimer",
    body: (
      <p>
        Content published on Ek Pratishat, including articles about market
        trends, pricing, buying, or investing, is provided for informational
        purposes only and does not constitute legal, financial, or
        professional real estate advice. You should consult a qualified
        professional before making any real estate or investment decisions.
        We make reasonable efforts to keep information accurate and current
        but do not guarantee its completeness, accuracy, or timeliness.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "8. Third-Party Links & Advertisements",
    body: (
      <p>
        The Site may contain links to third-party websites or display
        advertisements from third parties. We do not control and are not
        responsible for the content, accuracy, or practices of any
        third-party sites or advertisers. Visiting linked sites is at your
        own risk and subject to that site&rsquo;s own terms and privacy
        practices.
      </p>
    ),
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, Ek Pratishat shall not be
        liable for any direct, indirect, incidental, or consequential damages
        arising from your use of, or inability to use, the Site or its
        content, including reliance on any information published on the
        Site.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time to reflect changes to the
        Site or our practices. Updates will be posted on this page with a
        revised effective date. Continued use of the Site after changes are
        posted constitutes acceptance of the updated Terms.
      </p>
    ),
  },
  {
    id: "law",
    title: "11. Governing Law",
    body: (
      <p>
        These Terms shall be governed by and interpreted in accordance with
        the laws of Nepal, without regard to its conflict of law principles.
      </p>
    ),
  },
  {
    id: "contact",
    title: "12. Contact Us",
    body: (
      <p>
        If you have any questions about these Terms, please reach out to us
        at{" "}
        <a
          href="mailto:hello@ekpratishat.com"
          className="font-semibold text-[#C9981A] hover:text-[#EBC044] transition-colors"
        >
          hello@ekpratishat.com
        </a>{" "}
        or call us at 9712068341 / 9712068342.
      </p>
    ),
  },
];

export default function TermsPage() {
  const lastUpdated = "July 13, 2026";

  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#fffaf0_0%,#f7f0df_58%,#eadcc4_100%)]">
      {/* Hero */}
      <section className="border-b border-[#eadcb4]">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9981A]">
            Legal
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-[#241D12]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-6 text-[#6B5C3D] max-w-2xl">
            Please read these Terms &amp; Conditions carefully before using
            the Ek Pratishat blog. They explain how you may use our content
            and services.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[#6B5C3D]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-[#241D12] mb-3">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3 text-sm sm:text-base leading-6 text-[#6B5C3D]">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-[#eadcb4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-[#6B5C3D]">
            Looking for our privacy practices instead?
          </p>
          <Link
            href="/"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-[#1D1D1D] px-6 py-3 text-sm font-bold text-[#EBC044] transition-colors hover:bg-[#302B24]"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}