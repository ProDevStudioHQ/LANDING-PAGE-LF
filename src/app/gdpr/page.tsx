import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GDPR - Digital Studio LF",
  description: "GDPR information and data rights for Digital Studio LF",
};

export default function GDPR() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="section-padding relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              GDPR & Data Rights
            </h1>
            <p className="text-white/60 text-lg">
              Your privacy rights under the General Data Protection Regulation
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-white/80">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">What is GDPR?</h2>
                <p>
                  The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. Digital Studio LF complies with GDPR requirements when processing personal data of residents in these regions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Your Data Rights</h2>
                <p className="mb-3">Under GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> You can request correction of inaccurate personal data.</li>
                  <li><strong>Right to Erasure:</strong> You can request deletion of your personal data (right to be forgotten).</li>
                  <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we use your data.</li>
                  <li><strong>Right to Data Portability:</strong> You can request your data in a portable, machine-readable format.</li>
                  <li><strong>Right to Object:</strong> You can object to certain types of processing, including direct marketing.</li>
                  <li><strong>Rights Related to Automated Decision Making:</strong> You can request human review of automated decisions.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Legal Basis for Processing</h2>
                <p className="mb-3">
                  Digital Studio LF processes personal data only when we have a valid legal basis, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your explicit consent</li>
                  <li>Fulfillment of a contract with you</li>
                  <li>Compliance with legal obligations</li>
                  <li>Protection of vital interests</li>
                  <li>Performance of tasks in the public interest</li>
                  <li>Our legitimate business interests</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Protection Officer</h2>
                <p>
                  If you have any concerns about how we process your data or would like to exercise your GDPR rights, you can contact us at{" "}
                  <a href="mailto:digitalstudiolf@gmail.com" className="text-primary hover:text-primary-dark">
                    Email Us
</a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Transfers</h2>
                <p>
                  If we transfer your personal data outside the EU/EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or your explicit consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Once the retention period expires, we securely delete your data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Children&apos;s Data</h2>
                <p>
                  Our services are not intended for individuals under 16 years of age (or the age of digital consent in your country). We do not knowingly collect data from children. If we become aware that we have collected data from a child, we will delete it immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Exercising Your Rights</h2>
                <p className="mb-3">
                  To exercise any of your rights under GDPR, please submit a request to{" "}
                  <a href="mailto:digitalstudiolf@gmail.com" className="text-primary hover:text-primary-dark">
                    Email Us
</a>
                  . Please include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your full name and email address</li>
                  <li>The right you wish to exercise</li>
                  <li>Any relevant details or context</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Response Timeline</h2>
                <p>
                  We will respond to your request within 30 days of receipt. If we need more information, we will contact you. In some cases, we may extend the deadline by an additional 60 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Supervisory Authority</h2>
                <p>
                  If you are not satisfied with our response to your GDPR request, you have the right to lodge a complaint with your local data protection authority.
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
