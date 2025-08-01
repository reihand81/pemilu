import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BarChart3, Users, Clock, ArrowLeft, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ResultsPageProps {
  onNavigate: (page: string) => void;
}

export function ResultsPage({ onNavigate }: ResultsPageProps) {
  const results = [
    {
      id: 1,
      number: "01",
      ketua: "Ahmad Fauzan",
      wakil: "Siti Nurhaliza", 
      votes: 456,
      percentage: 42.3
    },
    {
      id: 2,
      number: "02",
      ketua: "Budi Santoso", 
      wakil: "Rina Permata",
      votes: 398,
      percentage: 36.9
    },
    {
      id: 3,
      number: "03",
      ketua: "Dian Sastika",
      wakil: "Rio Pratama",
      votes: 224,
      percentage: 20.8
    }
  ];

  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0);
  const totalVoters = 1247;
  const turnoutPercentage = ((totalVotes / totalVoters) * 100).toFixed(1);

  const chartData = results.map(candidate => ({
    name: `Paslon ${candidate.number}`,
    votes: candidate.votes,
    percentage: candidate.percentage
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  const pieData = results.map((candidate, index) => ({
    name: `Paslon ${candidate.number}`,
    value: candidate.votes,
    color: COLORS[index]
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('home')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <h1 className="text-3xl font-bold">Hasil Sementara Pemilu</h1>
            <p className="text-gray-600 mt-2">Real-time Count - Pemilu BEM FH UNISBA 2025</p>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Live Update
            </Badge>
            <p className="text-sm text-gray-600">Terakhir update: {new Date().toLocaleTimeString('id-ID')}</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{totalVotes.toLocaleString()}</h3>
            <p className="text-gray-600">Total Suara Masuk</p>
          </Card>
          <Card className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{turnoutPercentage}%</h3>
            <p className="text-gray-600">Tingkat Partisipasi</p>
          </Card>
          <Card className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Paslon {results[0].number}</h3>
            <p className="text-gray-600">Sementara Unggul</p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{totalVoters - totalVotes}</h3>
            <p className="text-gray-600">Belum Memilih</p>
          </Card>
        </div>

        {/* Results Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Perolehan Suara</h2>
            <div className="space-y-6">
              {results.map((candidate, index) => (
                <div key={candidate.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${index === 0 ? 'bg-yellow-500' : 'bg-gray-500'}`}>
                        #{index + 1}
                      </Badge>
                      <div>
                        <h3 className="font-semibold">Paslon {candidate.number}</h3>
                        <p className="text-sm text-gray-600">
                          {candidate.ketua} & {candidate.wakil}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{candidate.votes.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{candidate.percentage}%</p>
                    </div>
                  </div>
                  <Progress value={candidate.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Distribusi Suara</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Suara']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Grafik Perbandingan Suara</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [value, 'Suara']}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="votes" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Catatan Penting</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Hasil ini masih bersifat sementara dan dapat berubah seiring bertambahnya suara</li>
            <li>• Hasil resmi akan diumumkan setelah pemungutan suara ditutup dan verifikasi selesai</li>
            <li>• Data diperbarui secara real-time setiap ada suara baru yang masuk</li>
          </ul>
        </div>
      </div>
    </div>
  );
}