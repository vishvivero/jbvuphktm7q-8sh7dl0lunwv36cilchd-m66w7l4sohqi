import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Coffee, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleBuyMeACoffee = () => {
    window.open('https://buymeacoffee.com/rajvishnu', '_blank');
  };

  const handleLinkedIn = () => {
    window.open('https://www.linkedin.com/in/rajvishnu/', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:hi@debtfreeo.com';
  };

  return (
    <div className="flex-1 w-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full container mx-auto px-4 py-16 space-y-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">
              Let's <span className="text-primary">Connect</span>
            </h1>
            <p className="text-xl text-gray-600">
              Building a debt-free future, one conversation at a time
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold text-gray-900">
                  Hi, I'm <span className="text-primary">Vishnu</span>
                </h2>
                <p className="text-gray-600">
                  As a solopreneur passionate about financial freedom, I built Debtfreeo to help 
                  others on their journey to becoming debt-free. Whether you have questions, 
                  suggestions, or just want to share your story, I'd love to hear from you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl space-y-4"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Quick Response
                  </h3>
                  <p className="text-gray-600">
                    I personally respond to all messages within 24-48 hours. Your journey matters to me.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl space-y-4"
                >
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Direct Support
                  </h3>
                  <p className="text-gray-600">
                    Get personalized guidance and support tailored to your unique situation.
                  </p>
                </motion.div>
              </div>

              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Let's Connect
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleEmail}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Me
                  </Button>
                  <Button
                    onClick={handleLinkedIn}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                  </Button>
                  <Button
                    onClick={handleBuyMeACoffee}
                    className="bg-[#FFDD00] text-gray-900 hover:bg-[#FFDD00]/90 transition-colors flex items-center gap-2"
                  >
                    <Coffee className="h-4 w-4" />
                    Buy me a coffee
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
                Debtfreeo
              </Link>
              <p className="text-gray-600">
                Your journey to financial freedom starts here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/tools" className="hover:text-primary transition-colors">
                    Free Tools
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <LegalFooter />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2025 Debtfreeo. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
};

export default Contact;