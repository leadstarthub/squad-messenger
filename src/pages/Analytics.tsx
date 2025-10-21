import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, CheckCircle } from "lucide-react";

const Analytics = () => {
  const stats = [
    { label: "Total Messages", value: "45,231", change: "+12.5%", icon: MessageSquare, trend: "up" },
    { label: "Active Users", value: "487", change: "+8.2%", icon: Users, trend: "up" },
    { label: "Avg Response Time", value: "2.4m", change: "-15.3%", icon: Clock, trend: "down" },
    { label: "Resolution Rate", value: "94.2%", change: "+3.1%", icon: CheckCircle, trend: "up" },
  ];

  const teamPerformance = [
    { team: "Team Alpha", messages: 5420, responseTime: "1.8m", satisfaction: "96%" },
    { team: "Team Beta", messages: 4890, responseTime: "2.1m", satisfaction: "95%" },
    { team: "Team Gamma", messages: 4650, responseTime: "2.3m", satisfaction: "93%" },
    { team: "Team Delta", messages: 4320, responseTime: "2.6m", satisfaction: "92%" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Track performance and insights across all teams</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Team Performance
            </CardTitle>
            <CardDescription>Compare metrics across all teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {teamPerformance.map((team) => (
                <div key={team.team} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm md:text-base text-foreground">{team.team}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {team.messages.toLocaleString()} messages
                    </p>
                  </div>
                  <div className="flex gap-4 sm:gap-6 md:gap-8 text-xs md:text-sm">
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium text-foreground">{team.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Satisfaction</p>
                      <p className="font-medium text-green-600">{team.satisfaction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default Analytics;
