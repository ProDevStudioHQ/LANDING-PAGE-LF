import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - Digital Studio LF",
  description: "Terms of service for Digital Studio LF",
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="section-padding relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Terms of Service
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
                <h2 className="text-2xl font-bold text-white mb-3">1. Agreement to Terms</h2>
                <p>
                  By accessing and using this website and services provided by Digital Studio LF, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">2. License to Use Website</h2>
                <p>
                  Digital Studio LF grants you a limited, non-exclusive, non-transferable license to access and use the website and its content for lawful purposes only. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">3. Service Description</h2>
                <p className="mb-3">
                  Digital Studio LF provides web development, design, and digital solutions services. Services are provided on an &ldquo;as-is&rdquo; basis. We make no warranty or representation regarding the quality, accuracy, or completeness of the services rendered.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">4. Payment Terms</h2>
                <p className="mb-3">
                  All services are subject to payment terms agreed upon in the project proposal or contract. Payment must be made according to the specified schedule. Late payments may incur additional fees.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">5. Intellectual Property Rights</h2>
                <p>
                  All content, including text, graphics, logos, images, and software on this website is the property of Digital Studio LF or its content suppliers and is protected by international copyright laws. Upon payment in full, you receive ownership of custom deliverables as outlined in the project agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
                <p>
                  Digital Studio LF shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use the services or website, even if we have been advised of the possibility of such damages.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">7. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to our services at any time, with or without cause, and with or without notice. Refund policies are outlined in individual project agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">8. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-3">9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at{" "}
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
