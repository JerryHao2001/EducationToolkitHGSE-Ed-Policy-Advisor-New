import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import { useLocation } from "wouter";

const HomePage = () => {
  const [, setLocation] = useLocation();

  const handleToolClick = (tool: string) => {
    setLocation(`/${tool}`);
  };

  return (
    <div>
      <SearchBar />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800">Recommended for You:</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <ToolCard 
            icon="clipboard"
            title="Logic Framework Generator"
            description="Create a structured logic framework for your educational program or initiative."
            isNew={true}
            color="blue"
            onClick={() => handleToolClick("logic-framework")}
          />
          
          <ToolCard 
            icon="bar-chart"
            title="SWOT Analysis"
            description="Perform SWOT analysis for your educational program or initiative."
            isNew={true}
            color="green"
            onClick={() => handleToolClick("swot-analysis")}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-8">All Tools</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <ToolCard 
            title="TBA"
            description="TBA"
            isDisabled={true}
            onClick={() => {}}
          />
          
          <ToolCard 
            title="TBA"
            description="TBA"
            isDisabled={true}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
