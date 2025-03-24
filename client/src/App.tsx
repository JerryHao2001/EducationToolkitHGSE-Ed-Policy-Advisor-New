import { Switch, Route } from "wouter";
import HomePage from "@/pages/HomePage";
import LogicFrameworkPage from "@/pages/LogicFrameworkPage";
import SwotAnalysisPage from "@/pages/SwotAnalysisPage";
import Sidebar from "@/components/Sidebar";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/logic-framework" component={LogicFrameworkPage} />
          <Route path="/swot-analysis" component={SwotAnalysisPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
