import { useLocation, Link } from "wouter";

const Sidebar = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-full shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-1">HGSE Ed</h1>
        <h2 className="text-lg">Policy Advisor</h2>
      </div>
      
      <div className="px-4 py-2">
        <h3 className="text-sm uppercase tracking-wider text-gray-300 font-medium mb-2">Magic Tools</h3>
        <ul>
          <li>
            <Link href="/logic-framework">
              <a className={`sidebar-tool ${isActive("/logic-framework") ? "active" : ""}`}>
                <span className="mr-2">•</span>
                <span>Logic Framework Generator</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/swot-analysis">
              <a className={`sidebar-tool ${isActive("/swot-analysis") ? "active" : ""}`}>
                <span className="mr-2">•</span>
                <span>SWOT Analysis</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mt-auto p-4 text-sm text-gray-300">
        <p>© 2023 Harvard Graduate School of Education</p>
      </div>
    </aside>
  );
};

export default Sidebar;
