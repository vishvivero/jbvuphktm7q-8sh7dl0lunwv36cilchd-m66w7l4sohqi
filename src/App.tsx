import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";
import { LoadingPage } from "@/components/loading/LoadingPage";
import { AuthProvider } from "@/providers/AuthProvider";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { StripeProvider } from "@/providers/StripeProvider";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import { SubscriptionProvider } from "@/providers/SubscriptionProvider";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import DPA from "@/pages/DPA";
import FAQ from "@/pages/FAQ";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FreeTools from "@/pages/FreeTools";
import EmergencyFundCalculatorPage from "@/pages/tools/EmergencyFundCalculator";
import DebtToIncomeCalculatorPage from "@/pages/tools/DebtToIncomeCalculator";
import CreditCardPayoffCalculatorPage from "@/pages/tools/CreditCardPayoffCalculator";
import DebtConsolidationCalculatorPage from "@/pages/tools/DebtConsolidationCalculator";
import SavingsGoalCalculatorPage from "@/pages/tools/SavingsGoalCalculator";
import BudgetPlanningCalculatorPage from "@/pages/tools/BudgetPlanningCalculator";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AnalyticsProvider>
            <SupabaseProvider>
              <AuthProvider>
                <StripeProvider>
                  <SubscriptionProvider>
                    <SettingsProvider>
                      <Router>
                        <Suspense fallback={<LoadingPage />}>
                          <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/verify-email" element={<VerifyEmail />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/dpa" element={<DPA />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            
                            {/* Tools routes */}
                            <Route path="/tools" element={<FreeTools />} />
                            <Route path="/tools/emergency-fund-calculator" element={<EmergencyFundCalculatorPage />} />
                            <Route path="/tools/debt-to-income-calculator" element={<DebtToIncomeCalculatorPage />} />
                            <Route path="/tools/credit-card-calculator" element={<CreditCardPayoffCalculatorPage />} />
                            <Route path="/tools/debt-consolidation-calculator" element={<DebtConsolidationCalculatorPage />} />
                            <Route path="/tools/savings-goal-calculator" element={<SavingsGoalCalculatorPage />} />
                            <Route path="/tools/budget-calculator" element={<BudgetPlanningCalculatorPage />} />

                            {/* Protected routes */}
                            <Route element={<PrivateRoute />}>
                              <Route path="/dashboard/*" element={<Dashboard />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<Settings />} />
                            </Route>

                            {/* 404 route */}
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </Router>
                    </SettingsProvider>
                  </SubscriptionProvider>
                </StripeProvider>
              </AuthProvider>
            </SupabaseProvider>
          </AnalyticsProvider>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
