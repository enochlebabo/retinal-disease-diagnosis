import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalPatients: number;
  recentAnalyses: number;
  conversations: number;
  learningEntries: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    recentAnalyses: 0,
    conversations: 0,
    learningEntries: 0
  });
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load patients count
      const { count: patientsCount } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });

      // Load recent medical results
      const { data: medicalResults, count: analysesCount } = await supabase
        .from('medical_results')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      // Load conversations count
      const { count: conversationsCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Load recent patients
      const { data: patients } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalPatients: patientsCount || 0,
        recentAnalyses: analysesCount || 0,
        conversations: conversationsCount || 0,
        learningEntries: analysesCount || 0
      });

      setRecentPatients(patients || []);
      setRecentAnalyses(medicalResults || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <Header />
        
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold">{stats.totalPatients}</p>
                    </div>
                    <Icon icon="mdi:account-group" className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Analyses</p>
                      <p className="text-2xl font-bold">{stats.recentAnalyses}</p>
                    </div>
                    <Icon icon="mdi:eye" className="h-8 w-8 text-medical" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">AI Learning</p>
                      <p className="text-2xl font-bold">{stats.learningEntries}</p>
                    </div>
                    <Icon icon="mdi:chart-line" className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reports</p>
                      <p className="text-2xl font-bold">{stats.recentAnalyses}</p>
                    </div>
                    <Icon icon="mdi:file-document" className="h-8 w-8 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link to="/chatbot">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon icon="mdi:eye" className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload retinal images for AI-powered analysis
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/doctor">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon icon="mdi:account-group" className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Patient Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage patient records and medical history
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Icon icon="mdi:file-document" className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Generate Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Create detailed medical reports
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Patients
                    <Button size="sm" variant="outline">
                      <Icon icon="mdi:plus" className="h-4 w-4 mr-2" />
                      Add Patient
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPatients.length > 0 ? (
                      recentPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Age: {patient.age} • {patient.condition || 'No condition'}
                            </p>
                          </div>
                          <Badge variant={patient.risk_level === 'high' ? 'destructive' : 'secondary'}>
                            {patient.risk_level || 'low'}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No patients yet. Add your first patient to get started.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Analyses */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Analyses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAnalyses.length > 0 ? (
                      recentAnalyses.map((analysis) => (
                        <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{analysis.diagnosis || 'Analysis'}</p>
                            <p className="text-sm text-muted-foreground">
                              Confidence: {analysis.confidence_score || 'N/A'}%
                            </p>
                          </div>
                          <Badge variant={analysis.status === 'pending' ? 'secondary' : 'default'}>
                            {analysis.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No analyses yet. Start by uploading a retinal image.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Dashboard;