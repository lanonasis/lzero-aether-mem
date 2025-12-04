import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";

// Import from the new package structure
import { Dashboard } from "@/packages/web-extension/Dashboard";
import { IDEPanel } from "@/packages/vscode-extension/IDEPanel";
import { LanonasisProvider } from "@lanonasis/shared/sdk/react-hooks";

function VscodePanelRoute() {
  return (
    <LanonasisProvider
      config={{
        baseUrl:
          import.meta.env.VITE_API_URL ||
          "https://api.lanonasis.com/api/v1",
        apiKey: import.meta.env.VITE_API_KEY,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        enableOffline: true,
        enableLocalAI: true,
      }}
    >
      <IDEPanel />
    </LanonasisProvider>
  );
}

function DashboardRoute() {
  return (
    <LanonasisProvider
      config={{
        baseUrl:
          import.meta.env.VITE_API_URL ||
          "https://api.lanonasis.com/api/v1",
        apiKey: import.meta.env.VITE_API_KEY,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        enableOffline: true,
        enableLocalAI: false,
      }}
    >
      <Dashboard />
    </LanonasisProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={DashboardRoute} />
      <Route path="/vscode" component={VscodePanelRoute} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
