import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { CandidatesPage } from "./components/CandidatesPage";
import { LoginPage } from "./components/LoginPage";
import { VerificationPage } from "./components/VerificationPage";
import { VotingPage } from "./components/VotingPage";
import { CompletionPage } from "./components/CompletionPage";
import { ResultsPage } from "./components/ResultsPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { ContactWidget } from "./components/ContactWidget";
import { ServerStatusAlert } from "./components/ServerStatusAlert";

type Page =
  | "home"
  | "candidates"
  | "login"
  | "verification"
  | "voting"
  | "completion"
  | "results"
  | "404";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "candidates":
        return <CandidatesPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "verification":
        return <VerificationPage onNavigate={handleNavigate} />;
      case "voting":
        return <VotingPage onNavigate={handleNavigate} />;
      case "completion":
        return <CompletionPage onNavigate={handleNavigate} />;
      case "results":
        return <ResultsPage onNavigate={handleNavigate} />;
      case "404":
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ServerStatusAlert />

      {/* Animated Header */}
      <AnimatePresence>
        {currentPage !== "login" &&
          currentPage !== "verification" &&
          currentPage !== "voting" &&
          currentPage !== "completion" && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Header currentPage={currentPage} onNavigate={handleNavigate} />
            </motion.div>
          )}
      </AnimatePresence>

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Animated Contact Widget */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <ContactWidget />
      </motion.div>
    </div>
  );
}
