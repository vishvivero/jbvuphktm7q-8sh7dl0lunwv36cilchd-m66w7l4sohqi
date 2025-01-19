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

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const Profile = lazy(() => import("@/pages/Profile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const DPA = lazy(() => import("@/pages/legal/DPA"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const FreeTools = lazy(() => import("@/pages/FreeTools"));
const EmergencyFundCalculatorPage = lazy(() => import("@/pages/tools/EmergencyFundCalculator"));
const DebtToIncomeCalculatorPage = lazy(() => import("@/pages/tools/DebtToIncomeCalculator"));
const CreditCardPayoffCalculatorPage = lazy(() => import("@/pages/tools/CreditCardPayoffCalculator"));
const DebtConsolidationCalculatorPage = lazy(() => import("@/pages/tools/DebtConsolidationCalculator"));
const SavingsGoalCalculatorPage = lazy(() => import("@/pages/tools/SavingsGoalCalculator"));
const BudgetPlanningCalculatorPage = lazy(() => import("@/pages/tools/BudgetPlanningCalculator"));

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
                            <Route path="/tools" element={<FreeTools />} />
                            <Route path="/tools/emergency-fund-calculator" element={<EmergencyFundCalculatorPage />} />
                            <Route path="/tools/debt-to-income-calculator" element={<DebtToIncomeCalculatorPage />} />
                            <Route path="/tools/credit-card-calculator" element={<CreditCardPayoffCalculatorPage />} />
                            <Route path="/tools/debt-consolidation-calculator" element={<DebtConsolidationCalculatorPage />} />
                            <Route path="/tools/savings-goal-calculator" element={<SavingsGoalCalculatorPage />} />
                            <Route path="/tools/budget-calculator" element={<BudgetPlanningCalculatorPage />} />
                            <Route element={<PrivateRoute />}>
                              <Route path="/dashboard/*" element={<Dashboard />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<Settings />} />
                            </Route>
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