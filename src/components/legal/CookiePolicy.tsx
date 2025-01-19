import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <div className="flex-1 w-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full container mx-auto px-4 py-16 space-y-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">Cookie Policy</h1>
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
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "1. What Are Cookies",
    content: (
      <p className="text-gray-600">
        Cookies are small text files that are placed on your device when you visit our website. 
        They help us provide you with a better experience by remembering your preferences, 
        analyzing how you use our service, and helping with our marketing efforts.
      </p>
    ),
  },
  {
    title: "2. How We Use Cookies",
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li><span className="font-medium">Essential Cookies:</span> Required for basic website functionality.</li>
        <li><span className="font-medium">Analytics Cookies:</span> Help us understand how visitors interact with our website.</li>
        <li><span className="font-medium">Preference Cookies:</span> Remember your settings and preferences.</li>
        <li><span className="font-medium">Marketing Cookies:</span> Used to deliver relevant advertisements.</li>
      </ul>
    ),
  },
  {
    title: "3. Managing Cookies",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">You can control cookies through your browser settings:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Block all cookies</li>
          <li>Delete existing cookies</li>
          <li>Allow cookies from specific websites</li>
          <li>Browse in private/incognito mode</li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Types of Data Collected",
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>Login information</li>
        <li>User preferences</li>
        <li>Analytics data</li>
        <li>Device information</li>
      </ul>
    ),
  },
  {
    title: "5. Third-Party Cookies",
    content: (
      <p className="text-gray-600">
        We use services from third parties that may place cookies on your device. 
        These services include analytics providers and advertising networks. 
        Third-party cookies are governed by the respective privacy policies of these third parties.
      </p>
    ),
  }
];

export default CookiePolicy;