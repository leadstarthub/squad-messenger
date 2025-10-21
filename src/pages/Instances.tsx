import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Smartphone, QrCode, Trash2, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface Instance {
  id: string;
  name: string;
  phone: string;
  status: "connected" | "disconnected" | "pending";
  createdAt: Date;
  qrCode?: string;
}

const Instances = () => {
  const [instances, setInstances] = useState<Instance[]>([
    {
      id: "1",
      name: "Main Support",
      phone: "+1 234 567 8900",
      status: "connected",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Sales Team",
      phone: "+1 234 567 8901",
      status: "connected",
      createdAt: new Date("2024-01-20"),
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInstanceName, setNewInstanceName] = useState("");
  const [generatingQR, setGeneratingQR] = useState(false);
  const [currentQRCode, setCurrentQRCode] = useState<string | null>(null);

  const handleCreateInstance = async () => {
    if (!newInstanceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an instance name",
        variant: "destructive",
      });
      return;
    }

    setGeneratingQR(true);

    try {
      // Generate a unique instance ID
      const instanceId = `instance_${Date.now()}`;
      
      // Generate QR code data (in real app, this would be connection data from backend)
      const qrData = `whatsapp://connect?instance=${instanceId}&token=${Math.random().toString(36).substring(7)}`;
      
      // Generate QR code image
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1F2937",
          light: "#FFFFFF",
        },
      });

      const newInstance: Instance = {
        id: instanceId,
        name: newInstanceName,
        phone: "Pending connection",
        status: "pending",
        createdAt: new Date(),
        qrCode: qrCodeUrl,
      };

      setInstances([...instances, newInstance]);
      setCurrentQRCode(qrCodeUrl);
      setNewInstanceName("");

      toast({
        title: "Instance Created",
        description: "Scan the QR code with WhatsApp to connect",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setGeneratingQR(false);
    }
  };

  const handleDeleteInstance = (id: string) => {
    setInstances(instances.filter((instance) => instance.id !== id));
    toast({
      title: "Instance Deleted",
      description: "The instance has been removed",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentQRCode(null);
    setNewInstanceName("");
  };

  const handleReconnect = async (instance: Instance) => {
    setGeneratingQR(true);

    try {
      // Generate new QR code data for reconnection
      const qrData = `whatsapp://connect?instance=${instance.id}&token=${Math.random().toString(36).substring(7)}`;
      
      // Generate QR code image
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1F2937",
          light: "#FFFFFF",
        },
      });

      // Update instance with new QR code and pending status
      setInstances(instances.map(inst => 
        inst.id === instance.id 
          ? { ...inst, status: "pending" as const, qrCode: qrCodeUrl }
          : inst
      ));

      setCurrentQRCode(qrCodeUrl);
      setIsDialogOpen(true);

      toast({
        title: "Reconnection Initiated",
        description: "Scan the QR code to reconnect your WhatsApp instance",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate reconnection QR code",
        variant: "destructive",
      });
    } finally {
      setGeneratingQR(false);
    }
  };

  const getStatusColor = (status: Instance["status"]) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      case "disconnected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">WhatsApp Instances</h1>
            <p className="text-muted-foreground mt-2">
              Manage your WhatsApp connections and instances
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Instance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Instance</DialogTitle>
                <DialogDescription>
                  {currentQRCode ? "Scan the QR code with WhatsApp" : "Enter a name for your new WhatsApp instance"}
                </DialogDescription>
              </DialogHeader>
              
              {!currentQRCode ? (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Instance Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Main Support, Sales Team"
                      value={newInstanceName}
                      onChange={(e) => setNewInstanceName(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateInstance} 
                    disabled={generatingQR}
                    className="w-full"
                  >
                    {generatingQR ? "Generating..." : "Generate QR Code"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="flex justify-center p-4 bg-muted rounded-lg">
                    <img 
                      src={currentQRCode} 
                      alt="QR Code" 
                      className="w-64 h-64"
                    />
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground text-center">
                    <p className="flex items-center justify-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Open WhatsApp on your phone
                    </p>
                    <p>Tap Menu or Settings and select WhatsApp Web</p>
                    <p>Point your phone to this screen to capture the code</p>
                  </div>
                  <Button onClick={handleCloseDialog} className="w-full" variant="secondary">
                    Done
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instances.map((instance) => (
            <Card key={instance.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{instance.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {instance.phone}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteInstance(instance.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(instance.status)}`}>
                      {instance.status.charAt(0).toUpperCase() + instance.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">
                      {instance.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  {instance.status === "pending" && instance.qrCode && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => {
                        setCurrentQRCode(instance.qrCode!);
                        setIsDialogOpen(true);
                      }}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Show QR Code
                    </Button>
                  )}
                  {instance.status === "disconnected" && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => handleReconnect(instance)}
                      disabled={generatingQR}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {generatingQR ? "Reconnecting..." : "Reconnect"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {instances.length === 0 && (
          <Card className="py-16">
            <CardContent className="text-center">
              <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No instances yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first WhatsApp instance to get started
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Instance
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Instances;
