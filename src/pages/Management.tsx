import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  team: string;
  role: string;
  instanceId: string | null;
  connectionStatus: "connected" | "disconnected" | "pending" | "not-assigned";
  messagesToday: number;
  lastActive: string;
}

const Management = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      team: "Sales Team",
      role: "operator",
      instanceId: "Instance 1",
      connectionStatus: "connected",
      messagesToday: 45,
      lastActive: "2 mins ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      team: "Sales Team",
      role: "operator",
      instanceId: "Instance 2",
      connectionStatus: "connected",
      messagesToday: 38,
      lastActive: "5 mins ago",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      team: "Support Team",
      role: "operator",
      instanceId: "Instance 3",
      connectionStatus: "disconnected",
      messagesToday: 12,
      lastActive: "1 hour ago",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      team: "Support Team",
      role: "operator",
      instanceId: "Instance 4",
      connectionStatus: "connected",
      messagesToday: 52,
      lastActive: "Just now",
    },
    {
      id: "5",
      name: "Alex Brown",
      email: "alex@example.com",
      team: "Customer Success",
      role: "operator",
      instanceId: null,
      connectionStatus: "not-assigned",
      messagesToday: 0,
      lastActive: "Never",
    },
    {
      id: "6",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      team: "Customer Success",
      role: "operator",
      instanceId: "Instance 5",
      connectionStatus: "pending",
      messagesToday: 0,
      lastActive: "10 mins ago",
    },
  ];

  const getStatusColor = (status: TeamMember["connectionStatus"]) => {
    switch (status) {
      case "connected":
        return "default";
      case "disconnected":
        return "destructive";
      case "pending":
        return "secondary";
      case "not-assigned":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: TeamMember["connectionStatus"]) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "disconnected":
        return "Disconnected";
      case "pending":
        return "Pending";
      case "not-assigned":
        return "Not Assigned";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor team members' connection status and activity
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <CardTitle>Team Members Overview</CardTitle>
            </div>
            <CardDescription>
              View connection status, messages, and activity for all team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Instance</TableHead>
                  <TableHead>Connection</TableHead>
                  <TableHead>Messages Today</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.team}</TableCell>
                    <TableCell className="capitalize">{member.role}</TableCell>
                    <TableCell>
                      {member.instanceId || (
                        <span className="text-muted-foreground text-sm">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(member.connectionStatus)}>
                        {getStatusText(member.connectionStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{member.messagesToday}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.lastActive}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Management;
