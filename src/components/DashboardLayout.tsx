import { ReactNode, useState } from "react";
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
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--sidebar-background))] border-b border-[hsl(var(--sidebar-border))] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[hsl(var(--sidebar-foreground))]">
            Team<span className="text-[hsl(var(--sidebar-primary))]">Chat</span>
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[hsl(var(--sidebar-foreground))]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 h-screen w-64 bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col z-40 transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-[hsl(var(--sidebar-border))]">
          <h1 className="text-2xl font-bold text-[hsl(var(--sidebar-foreground))]">
            Team<span className="text-[hsl(var(--sidebar-primary))]">Chat</span>
          </h1>
          <p className="text-sm text-[hsl(var(--sidebar-foreground))]/60 mt-1">
            WhatsApp Management
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
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
      <main className="flex-1 overflow-auto w-full lg:w-auto pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
