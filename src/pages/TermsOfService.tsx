import React from 'react';
const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using AIorNOT, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">2. Service Description</h2>
                <p>AIorNOT provides AI-powered analysis of media files and URLs to determine whether content was generated by artificial intelligence or created by humans. The service is provided "as is" and we make no warranties about the accuracy of results.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must only upload content you have the right to analyze</li>
                  <li>You must not use the service for illegal purposes</li>
                  <li>You must not attempt to circumvent or disable the service</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">4. Intellectual Property</h2>
                <p>All content and functionality on AIorNOT, including but not limited to text, graphics, logos, and software, is the property of 12Stone Designs and is protected by intellectual property laws.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">5. Limitation of Liability</h2>
                <p>12Stone Designs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">6. Data Usage</h2>
                <p>By using AIorNOT, you grant us the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and analyze submitted content</li>
                  <li>Store analysis results</li>
                  <li>Use anonymized data to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">7. Modifications to Service</h2>
                <p>We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">8. Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">9. Contact Information</h2>
                <p>For any questions about these Terms of Service, please contact:</p>
                <p className="mt-2">
                  <a href="mailto:12stonedesigns@gmail.com" className="text-[#00F3FF] hover:text-[#39FF14]">
                    12stonedesigns@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">10. Changes to Terms</h2>
                <p>We reserve the right to update these terms at any time. We will notify users of any changes by posting the new Terms of Service on this page.</p>
                <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
