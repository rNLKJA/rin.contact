import React from "react";

interface TermsProps {}

const TermsComponent: React.FC<TermsProps> = () => {
  return (
    <section className="paddings mx-auto w-full max-w-screen-2xl flex-col">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p>
        <strong>Last updated: December 28, 2023</strong>
      </p>

      <p>
        Welcome to my website. These Terms of Service (&quot;Terms&quot;) govern
        your access to and use of my website and services (&quot;Service&quot;).
        By accessing or using the Service, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Service, you confirm that you agree to these
        Terms. If you do not agree to these Terms, do not use the Service.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Changes to Terms</h2>
      <p>
        I reserve the right to modify or replace these Terms at any time at my
        sole discretion. It is your responsibility to check the Terms
        periodically for changes.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        3. Access and Use of the Service
      </h2>
      <p>
        You are responsible for any actions that take place while using your
        account. Keep your username/password secure and do not allow anyone else
        to use your account.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Restrictions</h2>
      <p>
        You are prohibited from using the site or its content for any illegal
        activity, to solicit others to perform or participate in any unlawful
        acts, or violate any international, federal, provincial, or state
        regulations, rules, laws, or local ordinances.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        5. Disclaimer of Warranties
      </h2>
      <p>
        The service and all products and services delivered to you through the
        service are (except as expressly stated by us) provided &apos;as
        is&apos; and &apos;as available&apos; for your use, without any
        representation, warranties, or conditions of any kind, either express or
        implied.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
      <p>
        In no event will I be liable for any indirect, incidental, special,
        consequential or punitive damagaes, including without limitation, loss
        of profits, data, use, goodwill, or other intangible losses, resulting
        from your access to or use of or inability to access or use the service.
      </p>

      <h2 className="text-xl font-semibold mt-6">7. Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of your jurisdiction, without regard to its conflict of law provisions.
      </p>

      <h2 className="text-xl font-semibold mt-6">8. Contact Information</h2>
      <p>If you have any questions about these Terms, please contact me.</p>

      <br />
      <p>
        By continuing to access or use our Service after those revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, please stop using the Service.
      </p>
    </section>
  );
};

export default TermsComponent;
