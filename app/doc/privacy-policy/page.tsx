import React from "react";

const PrivacyContent: React.FC = () => {
  return (
    <section className="paddings mx-auto w-full max-w-screen-2xl flex-col">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        <strong>Last updated: December 28, 2023</strong>
      </p>

      <p>
        Welcome to my website (&quot;I&quot;, &quot;me&quot;, &quot;my&quot;). I
        respect your privacy and am committed to protecting it through my
        compliance with this policy. This policy describes:
      </p>

      <ul className="list-disc ml-4">
        <li>
          The types of information I may collect from you or that you may
          provide when you visit my website (&quot;Website&quot;).
        </li>
        <li>
          My practices for collecting, using, maintaining, protecting, and
          disclosing that information.
        </li>
      </ul>
      <br />
      <p>This policy applies to information I collect:</p>
      <div>
        <ul className="list-disc ml-4">
          <li>On this Website.</li>
          <li>
            In email, text, and other electronic messages between you and this
            Website.
          </li>
          <li>
            Through mobile and desktop applications you download from this
            Website, which provide dedicated non-browser-based interaction
            between you and this Website.
          </li>
          <li>
            When you interact with my advertising and applications on
            third-party websites and services if those applications or
            advertising include links to this policy.
          </li>
        </ul>
      </div>
      <br />
      <p>It does not apply to information collected by:</p>
      <div>
        <ul className="list-disc ml-4">
          <li>
            Me offline or through any other means, including on any other
            website operated by any third party; or
          </li>
          <li>
            Any third party, including through any application or content
            (including advertising) that may link to or be accessible from the
            Website.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PrivacyContent;
