import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Digital Studio LF",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="section-padding relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/60 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert max-w-none">
            <div className="space-y-8 text-white/80">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Introduction</h2>
                <p>
                  Digital Studio LF (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
                <p className="mb-3">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, company name, and other contact information you provide when contacting us or requesting services.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, clicks, and referral source.</li>
                  <li><strong>Device Data:</strong> Information about your device, browser type, IP address, and operating system.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and fulfill your requests for services</li>
                  <li>Improve and optimize our website and services</li>
                  <li>Analyze usage patterns to better understand how visitors use our site</li>
                  <li>Send marketing communications (only if you have opted in)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Third-Party Links</h2>
                <p>
                  Our Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
                <p className="mb-3">Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct or delete your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at{" "}
                  <a href="mailto:digitalstudiolf@gmail.com" className="text-primary hover:text-primary-dark">
                    Email Us
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
