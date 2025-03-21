import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  User,
  MousePointer,
  Type,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// -----------------------------------------------------------------------------
// Mock implementations for shadcn/ui components
// -----------------------------------------------------------------------------
interface ButtonProps {
  variant?: "primary" | "secondary" | "success";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const MyButton: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  className,
  children,
}) => {
  const baseClasses =
    "px-4 py-2 rounded focus:outline-none transition duration-300 min-w-[44px] min-h-[44px]";
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-[#007BFF] text-white hover:bg-[#0069d9]";
  } else if (variant === "secondary") {
    variantClasses =
      "border border-[#6C757D] text-[#6C757D] hover:bg-[#6C757D] hover:text-white";
  } else if (variant === "success") {
    variantClasses =
      "bg-[#28A745] text-white hover:bg-[#218838]";
  }
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className || ""}`}>
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const MyCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow rounded p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
}
const MyCardHeader: React.FC<CardHeaderProps> = ({ title }) => (
  <div className="mb-2">
    <h3 className="text-lg font-medium text-[#212529]">{title}</h3>
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
}
const MyCardContent: React.FC<CardContentProps> = ({ children }) => (
  <div className="mb-2">{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
}
const MyCardFooter: React.FC<CardFooterProps> = ({ children }) => (
  <div className="mt-2">{children}</div>
);

// -----------------------------------------------------------------------------
// Data and Types
// -----------------------------------------------------------------------------
interface TestMetrics {
  total: number;
  passed: number;
  failed: number;
}

const testComponents = [
  { id: "click", label: "Click", icon: <MousePointer className="w-5 h-5" /> },
  { id: "input", label: "Input", icon: <Type className="w-5 h-5" /> },
  { id: "wait", label: "Wait", icon: <span className="w-5 h-5">⏳</span> },
  { id: "assert", label: "Assert", icon: <span className="w-5 h-5">✔️</span> },
];

const integrations = [
  {
    id: "jenkins",
    name: "Jenkins",
    description: "Integrate with Jenkins for CI/CD",
    logoUrl: "https://picsum.photos/50/50?random=1",
  },
  {
    id: "circleci",
    name: "CircleCI",
    description: "Seamless CircleCI integration",
    logoUrl: "https://picsum.photos/50/50?random=2",
  },
  {
    id: "github",
    name: "GitHub Actions",
    description: "Integrate with GitHub Actions",
    logoUrl: "https://picsum.photos/50/50?random=3",
  },
];

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md h-16 flex items-center justify-between px-4 z-50">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://picsum.photos/40/40"
              alt="Logo"
              className="w-10 h-10 rounded"
            />
          </Link>
          <span className="hidden md:block text-xl text-[#212529]">
            Automated Testing Framework
          </span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:underline text-[#212529]">
            Dashboard
          </Link>
          <Link to="/tests" className="hover:underline text-[#212529]">
            Test Scripts
          </Link>
          <Link to="/reports" className="hover:underline text-[#212529]">
            Reports
          </Link>
          <Link to="/integrations" className="hover:underline text-[#212529]">
            Integrations
          </Link>
          <Link to="/docs" className="hover:underline text-[#212529]">
            Documentation
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <User className="w-6 h-6 text-[#212529]" />
          </div>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-40">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline text-[#212529]"
            >
              Dashboard
            </Link>
            <Link
              to="/tests"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline text-[#212529]"
            >
              Test Scripts
            </Link>
            <Link
              to="/reports"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline text-[#212529]"
            >
              Reports
            </Link>
            <Link
              to="/integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline text-[#212529]"
            >
              Integrations
            </Link>
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline text-[#212529]"
            >
              Documentation
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

const SidebarLeft: React.FC = () => {
  return (
    <aside className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-medium mb-4">Components</h2>
      <ul className="space-y-2">
        {testComponents.map((item) => (
          <li
            key={item.id}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const Workspace: React.FC = () => {
  return (
    <section className="relative bg-white shadow rounded p-4 min-h-[300px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-2 border-dashed border-gray-300 rounded h-full flex items-center justify-center">
          <p className="text-[#6C757D]">
            Drag and drop your test elements here
          </p>
        </div>
      </motion.div>
      <div className="absolute bottom-4 right-4">
        <MyButton
          variant="primary"
          onClick={() => alert("Test script saved!")}
        >
          Save
        </MyButton>
      </div>
    </section>
  );
};

const SidebarRight: React.FC = () => {
  return (
    <aside className="bg-white shadow rounded p-4 min-h-[300px]">
      <h2 className="text-xl font-medium mb-2">Properties</h2>
      <p className="text-[#6C757D]">
        Select an element to view its properties.
      </p>
    </aside>
  );
};

const ControlPanel: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
      <MyButton variant="primary" onClick={() => alert("Running tests...")}>
        Run Tests
      </MyButton>
      <MyButton variant="secondary" onClick={() => alert("Debugging tests...")}>
        Debug
      </MyButton>
      <MyButton variant="success" onClick={() => alert("Test script saved!")}>
        Save
      </MyButton>
    </div>
  );
};

const ReportsSection: React.FC = () => {
  const [metrics, setMetrics] = useState<TestMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mock data
        const data: TestMetrics = { total: 150, passed: 130, failed: 20 };
        setMetrics(data);
      } catch (err) {
        setError("Failed to load test metrics.");
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-medium mb-4">Test Reports</h2>
      {loading ? (
        <p>Loading metrics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MyCard>
            <MyCardHeader title="Total Tests" />
            <MyCardContent>
              <p className="text-3xl font-bold">{metrics.total}</p>
            </MyCardContent>
          </MyCard>
          <MyCard>
            <MyCardHeader title="Passed Tests" />
            <MyCardContent>
              <p className="text-3xl font-bold">{metrics.passed}</p>
            </MyCardContent>
          </MyCard>
          <MyCard>
            <MyCardHeader title="Failed Tests" />
            <MyCardContent>
              <p className="text-3xl font-bold">{metrics.failed}</p>
            </MyCardContent>
          </MyCard>
        </div>
      ) : null}
      <div className="mt-4">
        <h3 className="text-xl font-medium mb-2">
          Test Execution Over Time
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={[
              { name: "Jan", tests: 30 },
              { name: "Feb", tests: 50 },
              { name: "Mar", tests: 45 },
              { name: "Apr", tests: 60 },
              { name: "May", tests: 70 },
              { name: "Jun", tests: 65 },
            ]}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" stroke="#212529" />
            <YAxis stroke="#212529" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tests"
              stroke="#007BFF"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

const IntegrationSection: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-4">CI/CD Integrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <MyCard key={integration.id}>
            <div className="flex items-center space-x-4">
              <img
                src={integration.logoUrl}
                alt={`${integration.name} logo`}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {integration.name}
                </h3>
                <p className="text-sm text-[#6C757D]">
                  {integration.description}
                </p>
              </div>
            </div>
            <MyCardFooter>
              <MyButton
                variant="primary"
                onClick={() => alert(`Setting up ${integration.name}`)}
              >
                Setup
              </MyButton>
            </MyCardFooter>
          </MyCard>
        ))}
        {/* "Add New Integration" card */}
        <MyCard className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <span className="text-4xl">+</span>
          </div>
          <p>Add New Integration</p>
        </MyCard>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-sm text-[#6C757D]">
          © 2023 Automated Testing Framework. All rights reserved.
        </div>
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="#" className="hover:underline text-[#212529]">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-[#212529]">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-[#212529]">
                Tutorials
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-[#6C757D]">
          Contact: support@atf.com
        </div>
      </div>
    </footer>
  );
};

// -----------------------------------------------------------------------------
// Main Home Page Component
// -----------------------------------------------------------------------------
const Home: React.FC = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] text-[#212529]"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <Header />
      <main className="pt-20 px-4 lg:px-8">
        {/* Grid Layout for Desktop: Left Sidebar, Center Workspace, Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <SidebarLeft />
          </div>
          <div className="lg:col-span-2">
            <Workspace />
          </div>
          <div className="lg:col-span-1">
            <SidebarRight />
          </div>
        </div>
        <div className="mt-8">
          <ControlPanel />
        </div>
        <div className="mt-8">
          <ReportsSection />
        </div>
        <div className="mt-8">
          <IntegrationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;