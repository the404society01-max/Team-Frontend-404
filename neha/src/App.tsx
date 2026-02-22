import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const RedirectOnLoad = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hasRedirected = useRef(false);

  if (!hasRedirected.current && location.pathname !== "/") {
    hasRedirected.current = true;
    return <Navigate to="/" replace />;
  }

  hasRedirected.current = true;

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectOnLoad>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<><Navbar /><BlogPage /></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            <Route path="/dashboard" element={<><Navbar /><DashboardPage /></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RedirectOnLoad>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
