import { Button } from "@/components/ui/button";
import { SwotAnalysisResponse } from "@/lib/types";
import { Download } from "lucide-react";

interface SwotAnalysisResultProps {
  data: SwotAnalysisResponse | null;
  isLoading: boolean;
}

const SwotAnalysisResult = ({ data, isLoading }: SwotAnalysisResultProps) => {
  const handleDownload = () => {
    // In a real application, this would download the SWOT analysis
    alert("This would download the SWOT analysis as a PDF or Word document in a production environment.");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : data ? (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.html }}></div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No SWOT analysis data available.</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          onClick={handleDownload}
          disabled={!data || isLoading}
        >
          <Download className="w-4 h-4" />
          Download SWOT Analysis
        </Button>
      </div>
    </div>
  );
};

export default SwotAnalysisResult;
