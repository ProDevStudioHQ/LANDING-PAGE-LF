import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cookie Policy - Digital Studio LF",
  description: "Cookie policy for Digital Studio LF",
};

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="section-padding relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-white/60 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-white/80">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">What Are Cookies?</h2>
                <p>
                  Cookies are small files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferences and login details. Cookies are widely used by website owners to make their websites work more efficiently, as well as to provide reporting information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">How We Use Cookies</h2>
                <p className="mb-3">
                  Digital Studio LF uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as security and authentication.</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website so we can improve it.</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</li>
                  <li><strong>Marketing Cookies:</strong> Track your activity to show you relevant advertising content (with your consent).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Third-Party Cookies</h2>
                <p>
                  Our website may use cookies from third-party service providers to analyze website traffic, measure advertising effectiveness, and provide other services. These third parties may also collect information about your online activities across different websites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Cookie Consent</h2>
                <p>
                  When you first visit our website, you will be informed about the use of cookies and asked for your consent. You can choose to accept all cookies or manage your preferences. You can withdraw your consent at any time by adjusting your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Managing Your Cookies</h2>
                <p className="mb-3">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Most browsers allow you to refuse cookies or alert you when a cookie is being sent.</li>
                  <li>You can delete cookies that have already been set on your device.</li>
                  <li>You can adjust your privacy settings to control which cookies are used.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Cookie Duration</h2>
                <p>
                  Some cookies are &ldquo;session cookies&rdquo; that are deleted when you close your browser. Others are &ldquo;persistent cookies&rdquo; that remain on your device for a specified period or until you delete them manually.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Do Not Track</h2>
                <p>
                  Some browsers include a &ldquo;Do Not Track&rdquo; feature. Our website currently does not respond to Do Not Track signals. Please refer to your browser documentation for more information on how to enable this feature.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
                <p>
                  If you have questions about our cookie policy or practices, please contact us at{" "}
                  <a href="mailto:digitalstudiolf@gmail.com" className="text-primary hover:text-primary-dark">
                    digitalstudiolf@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
