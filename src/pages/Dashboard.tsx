import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      name: "Active Conversations",
      value: "1,234",
      change: "+12.5%",
      icon: MessageSquare,
      color: "text-[hsl(var(--primary))]",
      bgColor: "bg-[hsl(var(--primary))]/10",
    },
    {
      name: "Team Members",
      value: "500",
      change: "+2",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Response Rate",
      value: "94.2%",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Avg Response Time",
      value: "2.3 min",
      change: "-0.5 min",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentActivity = [
    { team: "Team Alpha", operator: "João Silva", messages: 45, time: "5 min ago" },
    { team: "Team Beta", operator: "Maria Santos", messages: 38, time: "12 min ago" },
    { team: "Team Gamma", operator: "Pedro Costa", messages: 52, time: "18 min ago" },
    { team: "Team Delta", operator: "Ana Paula", messages: 29, time: "25 min ago" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your teams today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-4 md:p-6 hover-lift border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">
                      {stat.name}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-green-600 mt-1 font-medium">
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="p-4 md:p-6 border-border shadow-[var(--shadow-card)]">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3 md:space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base text-foreground">
                      {activity.operator}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {activity.team}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right pl-11 sm:pl-0">
                  <p className="font-medium text-sm md:text-base text-foreground">
                    {activity.messages} messages
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
