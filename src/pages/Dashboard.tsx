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
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your teams today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6 hover-lift border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1 font-medium">
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-border shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {activity.operator}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.team}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {activity.messages} messages
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
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
