import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Users, Smartphone } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "user";
  instanceId?: string;
}

interface Team {
  id: string;
  name: string;
  instanceId?: string;
}

interface Instance {
  id: string;
  name: string;
  status: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "João Silva", email: "joao@example.com", role: "admin" },
    { id: "2", name: "Maria Santos", email: "maria@example.com", role: "operator", instanceId: "inst-1" },
    { id: "3", name: "Pedro Costa", email: "pedro@example.com", role: "operator" },
    { id: "4", name: "Ana Paula", email: "ana@example.com", role: "user" },
    { id: "5", name: "Carlos Lima", email: "carlos@example.com", role: "operator", instanceId: "inst-2" },
  ]);

  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "Team Alpha", instanceId: "inst-1" },
    { id: "2", name: "Team Beta", instanceId: "inst-2" },
    { id: "3", name: "Team Gamma" },
    { id: "4", name: "Team Delta" },
  ]);

  const instances: Instance[] = [
    { id: "inst-1", name: "WhatsApp Instance 1", status: "connected" },
    { id: "inst-2", name: "WhatsApp Instance 2", status: "connected" },
    { id: "inst-3", name: "WhatsApp Instance 3", status: "connected" },
  ];

  const handleRoleChange = (userId: string, newRole: "admin" | "operator" | "user") => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleUserInstanceChange = (userId: string, instanceId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, instanceId: instanceId || undefined } : user
    ));
  };

  const handleTeamInstanceChange = (teamId: string, instanceId: string) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, instanceId: instanceId || undefined } : team
    ));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-700 border-red-200";
      case "operator":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage user roles and WhatsApp instance assignments
            </p>
          </div>
        </div>

        {/* User Role Management */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Role & Instance Assignment
            </CardTitle>
            <CardDescription>
              Assign roles to users and link operators to WhatsApp instances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>WhatsApp Instance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value as "admin" | "operator" | "user")}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {user.role === "operator" ? (
                        <Select
                          value={user.instanceId || "none"}
                          onValueChange={(value) => handleUserInstanceChange(user.id, value)}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select instance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No instance</SelectItem>
                            {instances.map((instance) => (
                              <SelectItem key={instance.id} value={instance.id}>
                                {instance.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role === "operator" && !user.instanceId ? "No Instance" : 
                         user.role === "operator" && user.instanceId ? "Ready" : 
                         user.role}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Team Instance Assignment */}
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Team Instance Assignment
            </CardTitle>
            <CardDescription>
              Link teams to specific WhatsApp instances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>WhatsApp Instance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>
                      <Select
                        value={team.instanceId || "none"}
                        onValueChange={(value) => handleTeamInstanceChange(team.id, value)}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select instance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No instance</SelectItem>
                          {instances.map((instance) => (
                            <SelectItem key={instance.id} value={instance.id}>
                              {instance.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={team.instanceId ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}
                      >
                        {team.instanceId ? "Assigned" : "Unassigned"}
                      </Badge>
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

export default Admin;
