import { useState } from "react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import LogicFrameworkForm from "@/components/LogicFrameworkForm";
import LogicFrameworkResult from "@/components/LogicFrameworkResult";
import { ChevronLeft } from "lucide-react";
import { LogicFrameworkData, LogicFrameworkResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const LogicFrameworkPage = () => {
  const [, setLocation] = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [frameworkData, setFrameworkData] = useState<LogicFrameworkResponse | null>(null);

  const generateMutation = useMutation({
    mutationFn: async (data: LogicFrameworkData) => {
      const response = await apiRequest("POST", "/api/logic-framework", data);
      return response.json() as Promise<LogicFrameworkResponse>;
    },
    onSuccess: (data) => {
      setFrameworkData(data);
      setShowResults(true);
    },
  });

  const handleSubmit = (data: LogicFrameworkData) => {
    generateMutation.mutate(data);
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleBackToForm = () => {
    setShowResults(false);
  };

  return (
    <div>
      <SearchBar />

      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <button 
            className="mr-3 text-blue-500 hover:text-blue-700"
            onClick={showResults ? handleBackToForm : handleBackToHome}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {showResults ? "Your Logic Framework" : "Logic Framework Intake Form"}
          </h2>
        </div>

        {showResults ? (
          <LogicFrameworkResult 
            data={frameworkData} 
            isLoading={false} 
          />
        ) : (
          <LogicFrameworkForm 
            onSubmit={handleSubmit} 
            isSubmitting={generateMutation.isPending}
          />
        )}
      </div>
    </div>
  );
};

export default LogicFrameworkPage;
