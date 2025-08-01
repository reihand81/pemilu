import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Users, 
  FileText, 
  Calendar, 
  HelpCircle, 
  LogOut,
  BarChart3
} from "lucide-react";
import { AdminCandidatesManager } from "./admin/AdminCandidatesManager";
import { AdminRoadmapManager } from "./admin/AdminRoadmapManager";
import { AdminFAQManager } from "./admin/AdminFAQManager";
import { AdminDocumentsManager } from "./admin/AdminDocumentsManager";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onAdminLogout: () => void;
}

export function AdminDashboard({ onNavigate, onAdminLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    onAdminLogout();
    onNavigate("home");
  };

  const stats = [
    {
      title: "Total Kandidat",
      value: "3",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Total Pemilih",
      value: "1,247",
      icon: BarChart3,
      color: "bg-green-500"
    },
    {
      title: "Suara Masuk",
      value: "0",
      icon: FileText,
      color: "bg-purple-500"
    },
    {
      title: "FAQ Items",
      value: "5",
      icon: HelpCircle,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Panel Administrasi Pemilu BEM FH UNISBA</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onNavigate("home")}
              >
                Lihat Website
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Kandidat</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-full ${stat.color}`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Aksi cepat untuk mengelola pemilu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      onClick={() => setActiveTab("candidates")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      variant="outline"
                    >
                      <Users className="w-6 h-6" />
                      <span>Kelola Kandidat</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("roadmap")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      variant="outline"
                    >
                      <Calendar className="w-6 h-6" />
                      <span>Edit Roadmap</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("documents")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      variant="outline"
                    >
                      <FileText className="w-6 h-6" />
                      <span>Kelola Dokumen</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("faq")}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      variant="outline"
                    >
                      <HelpCircle className="w-6 h-6" />
                      <span>Edit FAQ</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Aktivitas terbaru di sistem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Sistem pemilu berhasil diinisialisasi</span>
                      <Badge variant="secondary">Baru</Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">3 kandidat telah terdaftar</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Roadmap pemilu telah ditetapkan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="candidates">
            <AdminCandidatesManager />
          </TabsContent>

          <TabsContent value="roadmap">
            <AdminRoadmapManager />
          </TabsContent>

          <TabsContent value="documents">
            <AdminDocumentsManager />
          </TabsContent>

          <TabsContent value="faq">
            <AdminFAQManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}