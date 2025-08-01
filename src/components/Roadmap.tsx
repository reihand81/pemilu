import { CheckCircle, Clock, Calendar } from "lucide-react";

export function Roadmap() {
  const roadmapItems = [
    {
      title: "Pendaftaran Calon",
      date: "1-7 Februari 2025",
      status: "completed",
      description: "Periode pendaftaran pasangan calon ketua dan wakil ketua BEM"
    },
    {
      title: "Masa Kampanye",
      date: "8-12 Februari 2025", 
      status: "completed",
      description: "Sosialisasi visi, misi, dan program kerja kandidat"
    },
    {
      title: "Debat Kandidat",
      date: "13 Februari 2025",
      status: "active",
      description: "Debat terbuka antar pasangan calon di Auditorium FH UNISBA"
    },
    {
      title: "Hari Pemilihan",
      date: "15 Februari 2025",
      status: "upcoming",
      description: "Pemungutan suara online pukul 08.00 - 17.00 WIB"
    },
    {
      title: "Pengumuman Hasil",
      date: "16 Februari 2025",
      status: "upcoming", 
      description: "Penetapan ketua dan wakil ketua BEM FH UNISBA terpilih"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'active':
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'active':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">Roadmap Pemilu BEM FH UNISBA 2025</h2>
      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <div key={index} className={`border-l-4 pl-6 pb-6 ${getStatusColor(item.status)}`}>
            <div className="flex items-start space-x-3">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-blue-600 font-medium">{item.date}</p>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}