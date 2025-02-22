import React from 'react';
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Information We Collect</h2>
                <p className="mb-4">When using AIorNOT, we collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Images and URLs you submit for analysis</li>
                  <li>Analysis results and confidence scores</li>
                  <li>Technical information necessary for service operation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide AI detection analysis services</li>
                  <li>To improve our detection algorithms</li>
                  <li>To maintain and enhance the service</li>
                  <li>To ensure service security and prevent abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Data Storage and Security</h2>
                <p>We implement industry-standard security measures to protect your data. All processing is done client-side where possible, and we do not store uploaded media files permanently.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Your Rights</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your data</li>
                  <li>Request data deletion</li>
                  <li>Opt-out of data collection</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Contact Us</h2>
                <p>For privacy-related inquiries, please contact us at:</p>
                <p className="mt-2">
                  <a href="mailto:12stonedesigns@gmail.com" className="text-[#00F3FF] hover:text-[#39FF14]">
                    12stonedesigns@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Updates to This Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
                <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
