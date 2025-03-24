import { useState } from "react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import SwotAnalysisForm from "@/components/SwotAnalysisForm";
import SwotAnalysisResult from "@/components/SwotAnalysisResult";
import { ChevronLeft } from "lucide-react";
import { SwotAnalysisData, SwotAnalysisResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const SwotAnalysisPage = () => {
  const [, setLocation] = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [swotData, setSwotData] = useState<SwotAnalysisResponse | null>(null);

  const generateMutation = useMutation({
    mutationFn: async (data: SwotAnalysisData) => {
      const response = await apiRequest("POST", "/api/swot-analysis", data);
      return response.json() as Promise<SwotAnalysisResponse>;
    },
    onSuccess: (data) => {
      setSwotData(data);
      setShowResults(true);
    },
  });

  const handleSubmit = (data: SwotAnalysisData) => {
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
            {showResults ? "Your SWOT Analysis" : "SWOT Analysis"}
          </h2>
        </div>

        {showResults ? (
          <SwotAnalysisResult 
            data={swotData} 
            isLoading={false} 
          />
        ) : (
          <SwotAnalysisForm 
            onSubmit={handleSubmit} 
            isSubmitting={generateMutation.isPending}
          />
        )}
      </div>
    </div>
  );
};

export default SwotAnalysisPage;
