import { Heart, Clipboard, BarChart3 } from "lucide-react";

type IconType = "clipboard" | "bar-chart" | undefined;

interface ToolCardProps {
  title: string;
  description: string;
  icon?: IconType;
  color?: "blue" | "green" | "gray";
  isNew?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const ToolCard = ({
  title,
  description,
  icon,
  color = "gray",
  isNew = false,
  isDisabled = false,
  onClick,
}: ToolCardProps) => {
  const getIcon = () => {
    if (icon === "clipboard") {
      return <Clipboard className="w-6 h-6 text-blue-600" />;
    } else if (icon === "bar-chart") {
      return <BarChart3 className="w-6 h-6 text-green-600" />;
    } else if (isDisabled) {
      return <span className="text-gray-400">TBA</span>;
    }
    return null;
  };

  const getBgColor = () => {
    if (isDisabled) return "bg-gray-100";
    if (color === "blue") return "bg-blue-100";
    if (color === "green") return "bg-green-100";
    return "bg-gray-100";
  };

  return (
    <div 
      className={`tool-card ${isDisabled ? "opacity-60" : ""}`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className={`${getBgColor()} p-2 rounded-lg mr-3`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {isNew && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">New</span>}
          </div>
        </div>
        <button className="text-gray-400 hover:text-primary">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ToolCard;
