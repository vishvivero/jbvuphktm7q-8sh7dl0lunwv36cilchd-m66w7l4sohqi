import { motion } from "framer-motion";

const GDPRCompliance = () => {
  return (
    <div className="flex-1 w-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full container mx-auto px-4 py-16 space-y-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">GDPR Compliance</h1>
            <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
            >
              {sections.map((section, index) => (
                <section key={index} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                  {section.content}
                </section>
              ))}

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Our DPO</h2>
                <p className="text-gray-600">For GDPR-related inquiries, contact our Data Protection Officer at:</p>
                <p className="text-primary font-medium">dpo@debtfreeo.com</p>
              </section>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "1. Your Rights Under GDPR",
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li><span className="font-medium">Right to Access:</span> Request a copy of your personal data.</li>
        <li><span className="font-medium">Right to Rectification:</span> Correct inaccurate personal data.</li>
        <li><span className="font-medium">Right to Erasure:</span> Request deletion of your personal data.</li>
        <li><span className="font-medium">Right to Data Portability:</span> Receive and transfer your data.</li>
        <li><span className="font-medium">Right to Object:</span> Object to processing of your data.</li>
      </ul>
    ),
  },
  {
    title: "2. Data Processing Principles",
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li><span className="font-medium">Lawfulness:</span> Processing based on legal grounds.</li>
        <li><span className="font-medium">Purpose Limitation:</span> Data collected for specified purposes.</li>
        <li><span className="font-medium">Data Minimization:</span> Only necessary data is collected.</li>
        <li><span className="font-medium">Accuracy:</span> Data kept accurate and up to date.</li>
        <li><span className="font-medium">Storage Limitation:</span> Data kept only as long as necessary.</li>
      </ul>
    ),
  },
  {
    title: "3. Data Protection Measures",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">We implement:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Encryption of personal data</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication</li>
          <li>Staff training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. International Data Transfers",
    content: (
      <p className="text-gray-600">
        When transferring data outside the EEA, we ensure appropriate safeguards are in place through:
        Standard Contractual Clauses (SCCs), adequacy decisions, or other legally recognized mechanisms.
      </p>
    ),
  },
  {
    title: "5. Data Breach Procedures",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">In case of a data breach, we will:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Notify supervisory authorities within 72 hours</li>
          <li>Inform affected individuals without undue delay</li>
          <li>Document all breaches and remedial actions</li>
          <li>Review and update security measures</li>
        </ul>
      </div>
    ),
  }
];

export default GDPRCompliance;