import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, TrendingUp } from "lucide-react";

const Teams = () => {
  const teams = [
    {
      name: "Team Alpha",
      leader: "João Silva",
      members: 25,
      active: 23,
      messages: 1234,
      responseRate: "96%",
    },
    {
      name: "Team Beta",
      leader: "Maria Santos",
      members: 25,
      active: 22,
      messages: 1089,
      responseRate: "94%",
    },
    {
      name: "Team Gamma",
      leader: "Pedro Costa",
      members: 25,
      active: 24,
      messages: 1456,
      responseRate: "98%",
    },
    {
      name: "Team Delta",
      leader: "Ana Paula",
      members: 25,
      active: 21,
      messages: 987,
      responseRate: "92%",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Teams</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Manage and monitor your 20 teams
            </p>
          </div>
          <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Button>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          {teams.map((team, index) => (
            <Card
              key={index}
              className="p-4 md:p-6 hover-lift border-border shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {team.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Led by {team.leader}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-bold text-foreground">
                    {team.active}/{team.members}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Messages Today</p>
                  <p className="text-2xl font-bold text-foreground">
                    {team.messages}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-foreground">
                    Response Rate: {team.responseRate}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Teams;
