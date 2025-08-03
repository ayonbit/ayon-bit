const terms = () => {
  return (
    <div className="p-10 text-white bg-primary min-h-screen">
      <div class="p-6 max-w-3xl mx-auto text-white">
        <h1 class="text-3xl font-bold mb-6">Sign-In Terms and Conditions</h1>

        <p class="mb-4">
          By using Google Sign-In to access our website/app
          &quot;Service&quot;, you agree to the following terms and
          conditions:
        </p>

        <h2 class="text-xl font-semibold mb-2">1. Use of Google Sign-In</h2>
        <p class="mb-4">
          When you choose to sign in using your Google account, you authorize us
          to access certain information from your Google profile as permitted by
          Google’s OAuth policy. This may include your name, email address, and
          profile picture.
        </p>

        <h2 class="text-xl font-semibold mb-2">2. Data Collection and Usage</h2>
        <p class="mb-2">
          We only collect the data necessary to provide you with a seamless
          experience on our platform. This data is used to:
        </p>
        <ul class="list-disc list-inside mb-4">
          <li>Identify and authenticate you as a user</li>
          <li>Personalize your experience</li>
          <li>Maintain the security of your account</li>
        </ul>
        <p class="mb-4">
          We do not access your contacts, calendar, drive contents, or any other
          sensitive data unless explicitly stated and permitted.
        </p>

        <h2 class="text-xl font-semibold mb-2">
          3. Data Storage and Protection
        </h2>
        <p class="mb-4">
          Your data is stored securely and is not shared with any third-party
          service or organization without your explicit consent, except where
          required by law. We implement industry-standard security measures to
          protect your information.
        </p>

        <h2 class="text-xl font-semibold mb-2">4. Revoking Access</h2>
        <p class="mb-4">
          You may revoke our access to your Google account at any time from your
          Google Account Settings. However, this may limit or prevent your
          ability to use certain features of the Service.
        </p>

        <h2 class="text-xl font-semibold mb-2">5. Changes to Terms</h2>
        <p class="mb-4">
          We reserve the right to update these terms from time to time. We will
          notify you of any significant changes. Continued use of the Service
          after changes implies your acceptance of the revised terms.
        </p>

        <h2 class="text-xl font-semibold mb-2">6. Contact</h2>
        <p class="mb-4">
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <a
            href="mailto:ayonbit@gmail.com"
            class="underline text-accent hover:text-white"
          >
            ayonbit@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default terms;
