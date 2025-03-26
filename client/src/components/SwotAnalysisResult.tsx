
import { Button } from "@/components/ui/button";
import { SwotAnalysisResponse } from "@/lib/types";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface SwotAnalysisResultProps {
  data: SwotAnalysisResponse | undefined;
  isLoading: boolean;
}

const SwotAnalysisResult = ({ data, isLoading }: SwotAnalysisResultProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    
    const canvas = await html2canvas(contentRef.current);
    const link = document.createElement('a');
    link.download = 'swot-analysis.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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
        </div>
      ) : data ? (
        <div ref={contentRef} className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.html }}></div>
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
