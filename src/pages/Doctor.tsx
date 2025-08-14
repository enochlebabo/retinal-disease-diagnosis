import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  BarChart3, 
  FileText, 
  Camera, 
  Upload,
  Eye,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const recentPatients = [
  { id: "P001", name: "John Smith", condition: "Diabetic Retinopathy", status: "High Risk", lastVisit: "2024-01-15" },
  { id: "P002", name: "Sarah Johnson", condition: "CNV", status: "Moderate", lastVisit: "2024-01-14" },
  { id: "P003", name: "Michael Brown", condition: "Normal", status: "Low Risk", lastVisit: "2024-01-12" },
];

const todaySchedule = [
  { time: "09:00", patient: "Alice Wilson", type: "Follow-up" },
  { time: "10:30", patient: "Robert Davis", type: "Screening" },
  { time: "14:00", patient: "Emma Thompson", type: "Consultation" },
  { time: "15:30", patient: "James Miller", type: "Treatment" },
];

const Doctor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-8 px-4">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Dr. Smith</h1>
            <p className="text-muted-foreground">Here's your practice overview for today</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Patients Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-medical rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-sm text-muted-foreground">Scans Analyzed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">High Risk Cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">98.2%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col gap-2" variant="outline">
                      <Camera className="h-6 w-6" />
                      Capture Retinal Image
                    </Button>
                    <Button className="h-20 flex-col gap-2" variant="outline">
                      <Upload className="h-6 w-6" />
                      Upload Images
                    </Button>
                    <Button className="h-20 flex-col gap-2" variant="outline">
                      <Users className="h-6 w-6" />
                      Patient Management
                    </Button>
                    <Button className="h-20 flex-col gap-2" variant="outline">
                      <FileText className="h-6 w-6" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Recent Patients</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <div className="space-y-3">
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={patient.status === "High Risk" ? "destructive" : 
                                   patient.status === "Moderate" ? "default" : "secondary"}
                          >
                            {patient.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Schedule & Analytics */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
                  </div>
                  <div className="space-y-3">
                    {todaySchedule.map((appointment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{appointment.time}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Overview */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">This Week</span>
                        <span className="text-sm font-medium text-foreground">+12%</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">84 Patients</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">AI Accuracy</span>
                        <span className="text-sm font-medium text-green-600">+0.3%</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">98.2%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Doctor;