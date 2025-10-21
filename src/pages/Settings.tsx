import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Smartphone } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Manage your account and application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Account Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm">First Name</Label>
                  <Input id="firstName" placeholder="Rogério" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                  <Input id="lastName" placeholder="Silva" className="text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="rogerio@company.com" className="text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+55 11 98765-4321" className="text-sm" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
                <Input id="currentPassword" type="password" className="text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm">New Password</Label>
                  <Input id="newPassword" type="password" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="text-sm" />
                </div>
              </div>

              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>


          {/* WhatsApp Integration */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                WhatsApp Integration
              </CardTitle>
              <CardDescription>Manage your Evolution API connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiUrl" className="text-sm">Evolution API URL</Label>
                <Input id="apiUrl" placeholder="https://api.evolution.com" className="text-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-sm">API Key</Label>
                <Input id="apiKey" type="password" placeholder="••••••••••••••••" className="text-sm" />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Connection Status</p>
                  <p className="text-sm text-muted-foreground">Last synced 5 minutes ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>

              <Button className="w-full">Test Connection</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
