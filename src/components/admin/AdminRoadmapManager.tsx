import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Calendar,
  CheckCircle,
  Clock,
  Vote,
} from "lucide-react";

interface RoadmapItem {
  id: number;
  title: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:MM
  description: string;
  isElectionDay?: boolean; // Special flag for election day
}

type Status = "completed" | "active" | "upcoming";

export function AdminRoadmapManager() {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([
    {
      id: 1,
      title: "Pendaftaran Calon",
      startDate: "2025-02-01",
      startTime: "08:00",
      endDate: "2025-02-07",
      endTime: "17:00",
      description:
        "Periode pendaftaran pasangan calon ketua dan wakil ketua BEM",
    },
    {
      id: 2,
      title: "Masa Kampanye",
      startDate: "2025-02-08",
      startTime: "08:00",
      endDate: "2025-02-12",
      endTime: "17:00",
      description: "Sosialisasi visi, misi, dan program kerja kandidat",
    },
    {
      id: 3,
      title: "Debat Kandidat",
      startDate: "2025-02-13",
      startTime: "13:00",
      endDate: "2025-02-13",
      endTime: "16:00",
      description: "Debat terbuka antar pasangan calon di Auditorium FH UNISBA",
    },
    {
      id: 4,
      title: "Hari Pemilihan",
      startDate: "2025-02-15",
      startTime: "08:00",
      endDate: "2025-02-15",
      endTime: "17:00",
      description: "Pemungutan suara online",
      isElectionDay: true,
    },
    {
      id: 5,
      title: "Pengumuman Hasil",
      startDate: "2025-02-16",
      startTime: "10:00",
      endDate: "2025-02-16",
      endTime: "12:00",
      description: "Penetapan ketua dan wakil ketua BEM FH UNISBA terpilih",
    },
  ]);

  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to calculate status based on current time
  const getItemStatus = (item: RoadmapItem): Status => {
    const now = new Date();
    const startDateTime = new Date(`${item.startDate}T${item.startTime}`);
    const endDateTime = new Date(`${item.endDate}T${item.endTime}`);

    if (now < startDateTime) {
      return "upcoming";
    } else if (now >= startDateTime && now <= endDateTime) {
      return "active";
    } else {
      return "completed";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "active":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "active":
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "active":
        return "Sedang Berlangsung";
      default:
        return "Akan Datang";
    }
  };

  const formatDateRange = (item: RoadmapItem) => {
    const startDate = new Date(`${item.startDate}T${item.startTime}`);
    const endDate = new Date(`${item.endDate}T${item.endTime}`);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    if (item.startDate === item.endDate) {
      return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatTime(
        endDate
      )} WIB`;
    } else {
      return `${formatDate(startDate)} ${formatTime(startDate)} - ${formatDate(
        endDate
      )} ${formatTime(endDate)} WIB`;
    }
  };

  // Get election day for countdown
  const getElectionDay = () => {
    const electionItem = roadmapItems.find((item) => item.isElectionDay);
    if (electionItem) {
      return new Date(`${electionItem.startDate}T${electionItem.startTime}`);
    }
    return null;
  };

  const handleEdit = (item: RoadmapItem) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      let updatedItems = [...roadmapItems];

      // If this item is being marked as election day, remove the flag from other items
      if (editingItem.isElectionDay) {
        updatedItems = updatedItems.map((item) => ({
          ...item,
          isElectionDay: item.id === editingItem.id ? true : false,
        }));
      }

      if (editingItem.id === 0) {
        // Adding new item
        const newId = Math.max(...roadmapItems.map((item) => item.id)) + 1;
        const newItem = { ...editingItem, id: newId };

        if (newItem.isElectionDay) {
          // Remove election day flag from existing items
          updatedItems = updatedItems.map((item) => ({
            ...item,
            isElectionDay: false,
          }));
        }

        setRoadmapItems([...updatedItems, newItem]);
      } else {
        // Updating existing item
        setRoadmapItems(
          updatedItems.map((item) =>
            item.id === editingItem.id ? editingItem : item
          )
        );
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: number) => {
    setRoadmapItems(roadmapItems.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    const newItem: RoadmapItem = {
      id: 0,
      title: "",
      startDate: "",
      startTime: "08:00",
      endDate: "",
      endTime: "17:00",
      description: "",
    };
    setEditingItem(newItem);
    setIsDialogOpen(true);
  };

  const moveItem = (id: number, direction: "up" | "down") => {
    const currentIndex = roadmapItems.findIndex((item) => item.id === id);
    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < roadmapItems.length - 1)
    ) {
      const newItems = [...roadmapItems];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;
      [newItems[currentIndex], newItems[targetIndex]] = [
        newItems[targetIndex],
        newItems[currentIndex],
      ];
      setRoadmapItems(newItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola Roadmap</h2>
          <p className="text-gray-600">Edit timeline dan tahapan pemilu</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Tahapan
        </Button>
      </div>

      {/* Election Day Info */}
      {getElectionDay() && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Vote className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Hari Pemilihan</h3>
                <p className="text-blue-700">
                  {getElectionDay()?.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  - Tanggal ini akan digunakan untuk countdown pemilihan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Roadmap Pemilu BEM FH UNISBA 2025</CardTitle>
          <CardDescription>
            Timeline dan tahapan pemilihan ketua dan wakil ketua BEM. Status
            akan otomatis menyesuaikan dengan waktu saat ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {roadmapItems.map((item, index) => {
              const status = getItemStatus(item);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`border-l-4 pl-6 pb-6 relative ${getStatusColor(
                    status
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          {item.isElectionDay && (
                            <Vote className="w-5 h-5 text-blue-600" />
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              status === "completed"
                                ? "bg-green-100 text-green-800"
                                : status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {getStatusText(status)}
                          </span>
                        </div>
                        <p className="text-blue-600 font-medium mb-2">
                          {formatDateRange(item)}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(item.id, "up")}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(item.id, "down")}
                          disabled={index === roadmapItems.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          ↓
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id === 0 ? "Tambah Tahapan Baru" : "Edit Tahapan"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi tahapan roadmap di bawah ini. Status akan
              otomatis dihitung berdasarkan waktu saat ini.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Tahapan</Label>
                <Input
                  id="title"
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: e.target.value,
                    })
                  }
                  placeholder="Masukkan judul tahapan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingItem.startDate}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Jam Mulai</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={editingItem.startTime}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="endDate">Tanggal Selesai</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingItem.endDate}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Jam Selesai</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={editingItem.endTime}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Masukkan deskripsi tahapan"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isElectionDay"
                    checked={editingItem.isElectionDay || false}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        isElectionDay: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Label htmlFor="isElectionDay" className="text-sm">
                    Tandai sebagai Hari Pemilihan (untuk countdown)
                  </Label>
                </div>
                {editingItem.isElectionDay && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    ⚠️ Hanya satu tahapan yang dapat ditandai sebagai Hari
                    Pemilihan. Menandai tahapan ini akan menghapus tanda dari
                    tahapan lain.
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
