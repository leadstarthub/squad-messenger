import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  Smartphone,
  Shield,
  ClipboardList,
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Conversations", href: "/conversations", icon: MessageSquare },
    { name: "Instances", href: "/instances", icon: Smartphone },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Management", href: "/management", icon: ClipboardList },
    { name: "Admin", href: "/admin", icon: Shield },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col">
        <div className="p-6 border-b border-[hsl(var(--sidebar-border))]">
          <h1 className="text-2xl font-bold text-[hsl(var(--sidebar-foreground))]">
            Team<span className="text-[hsl(var(--sidebar-primary))]">Chat</span>
          </h1>
          <p className="text-sm text-[hsl(var(--sidebar-foreground))]/60 mt-1">
            WhatsApp Management
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive(item.href)
                    ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))] font-medium"
                    : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))]/50 hover:text-[hsl(var(--sidebar-foreground))]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))]/50 hover:text-[hsl(var(--sidebar-foreground))] transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
