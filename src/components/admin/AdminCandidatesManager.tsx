import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  User,
  Users,
  Target,
  Award,
  AlertTriangle,
} from "lucide-react";

interface Candidate {
  id: number;
  number: string;
  ketua: {
    name: string;
    nim: string;
    photo: string;
  };
  wakil: {
    name: string;
    nim: string;
    photo: string;
  };
  visi: string;
  misi: string[];
  programs: string[];
  experience: string[];
  videoId: string;
}

export function AdminCandidatesManager() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      number: "01",
      ketua: {
        name: "Ahmad Fauzan",
        nim: "20210001",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      },
      wakil: {
        name: "Siti Nurhaliza",
        nim: "20210002",
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      },
      visi: "Mewujudkan BEM FH UNISBA yang Inovatif, Aspiratif, dan Berintegritas",
      misi: [
        "Meningkatkan kualitas akademik mahasiswa melalui program studi banding",
        "Mengoptimalkan fungsi BEM sebagai wadah aspirasi mahasiswa",
        "Membangun kerjasama dengan berbagai instansi hukum",
        "Mengembangkan soft skill mahasiswa melalui pelatihan dan workshop",
      ],
      programs: [
        "Legal Clinic untuk masyarakat",
        "Kompetisi debat hukum nasional",
        "Magang bersertifikat di firma hukum",
      ],
      experience: [
        "Ketua Himpunan Mahasiswa Jurusan 2023",
        "Peserta Kompetisi Peradilan Semu Nasional 2022",
        "Volunteer di Legal Aid UNISBA",
      ],
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: 2,
      number: "02",
      ketua: {
        name: "Budi Santoso",
        nim: "20210003",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      },
      wakil: {
        name: "Rina Permata",
        nim: "20210004",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      },
      visi: "BEM FH UNISBA sebagai Pelopor Gerakan Mahasiswa yang Progresif dan Berkeadilan",
      misi: [
        "Memperkuat advokasi hak-hak mahasiswa",
        "Mengembangkan program kewirausahaan untuk mahasiswa hukum",
        "Meningkatkan kualitas fasilitas akademik",
        "Membangun jaringan alumni yang solid",
      ],
      programs: [
        "Inkubator bisnis mahasiswa hukum",
        "Program beasiswa prestasi",
        "Festival seni budaya fakultas",
      ],
      experience: [
        "Wakil Ketua BEM periode sebelumnya",
        "Koordinator Divisi Advokasi 2023",
        "Juara 1 Lomba Karya Tulis Hukum 2022",
      ],
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: 3,
      number: "03",
      ketua: {
        name: "Dian Sastika",
        nim: "20210005",
        photo:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop",
      },
      wakil: {
        name: "Rio Pratama",
        nim: "20210006",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      },
      visi: "Membangun Ekosistem Mahasiswa Hukum yang Kolaboratif dan Berdaya Saing Global",
      misi: [
        "Mengintegrasikan teknologi dalam kegiatan kemahasiswaan",
        "Memperluas jaringan internasional fakultas",
        "Meningkatkan partisipasi mahasiswa dalam penelitian hukum",
        "Mengembangkan program kepedulian sosial",
      ],
      programs: [
        "Digital law library",
        "International moot court competition",
        "Program pengabdian masyarakat berkelanjutan",
      ],
      experience: [
        "Ketua Divisi Akademik BEM 2023",
        "Delegasi Indonesia di Model United Nations",
        "Peneliti junior di Pusat Studi Hukum",
      ],
      videoId: "dQw4w9WgXcQ",
    },
  ]);

  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(
    null
  );

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate({ ...candidate });
    setIsDialogOpen(true);
  };

  const validateCandidate = (candidate: Candidate): boolean => {
    // Check if all required fields are filled
    if (
      !candidate.ketua.name.trim() ||
      !candidate.ketua.nim.trim() ||
      !candidate.wakil.name.trim() ||
      !candidate.wakil.nim.trim() ||
      !candidate.visi.trim()
    ) {
      return false;
    }

    // Check if all misi items are filled
    if (candidate.misi.some((item) => !item.trim())) {
      return false;
    }

    // Check if all program items are filled
    if (candidate.programs.some((item) => !item.trim())) {
      return false;
    }

    // Check if all experience items are filled
    if (candidate.experience.some((item) => !item.trim())) {
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (editingCandidate) {
      if (!validateCandidate(editingCandidate)) {
        alert(
          "Mohon lengkapi semua field yang diperlukan. Pastikan semua poin misi, program unggulan, dan pengalaman organisasi telah diisi."
        );
        return;
      }

      if (editingCandidate.id === 0) {
        // Adding new candidate
        const newId = Math.max(...candidates.map((c) => c.id)) + 1;
        setCandidates([...candidates, { ...editingCandidate, id: newId }]);
      } else {
        // Updating existing candidate
        setCandidates(
          candidates.map((c) =>
            c.id === editingCandidate.id ? editingCandidate : c
          )
        );
      }
      setIsDialogOpen(false);
      setEditingCandidate(null);
    }
  };

  const handleDeleteClick = (candidate: Candidate) => {
    setCandidateToDelete(candidate);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (candidateToDelete) {
      setCandidates(candidates.filter((c) => c.id !== candidateToDelete.id));
      setDeleteDialogOpen(false);
      setCandidateToDelete(null);
    }
  };

  const handleAddNew = () => {
    const newCandidate: Candidate = {
      id: 0,
      number: String(candidates.length + 1).padStart(2, "0"),
      ketua: { name: "", nim: "", photo: "" },
      wakil: { name: "", nim: "", photo: "" },
      visi: "",
      misi: [""],
      programs: [""],
      experience: [""],
      videoId: "",
    };
    setEditingCandidate(newCandidate);
    setIsDialogOpen(true);
  };

  const updateMisiItem = (index: number, value: string) => {
    if (editingCandidate) {
      const newMisi = [...editingCandidate.misi];
      newMisi[index] = value;
      setEditingCandidate({ ...editingCandidate, misi: newMisi });
    }
  };

  const addMisiItem = () => {
    if (editingCandidate) {
      setEditingCandidate({
        ...editingCandidate,
        misi: [...editingCandidate.misi, ""],
      });
    }
  };

  const removeMisiItem = (index: number) => {
    if (editingCandidate && editingCandidate.misi.length > 1) {
      const newMisi = editingCandidate.misi.filter((_, i) => i !== index);
      setEditingCandidate({ ...editingCandidate, misi: newMisi });
    }
  };

  const updateArrayItem = (
    field: "programs" | "experience",
    index: number,
    value: string
  ) => {
    if (editingCandidate) {
      const newArray = [...editingCandidate[field]];
      newArray[index] = value;
      setEditingCandidate({ ...editingCandidate, [field]: newArray });
    }
  };

  const addArrayItem = (field: "programs" | "experience") => {
    if (editingCandidate) {
      setEditingCandidate({
        ...editingCandidate,
        [field]: [...editingCandidate[field], ""],
      });
    }
  };

  const removeArrayItem = (field: "programs" | "experience", index: number) => {
    if (editingCandidate && editingCandidate[field].length > 1) {
      const newArray = editingCandidate[field].filter((_, i) => i !== index);
      setEditingCandidate({ ...editingCandidate, [field]: newArray });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola Kandidat</h2>
          <p className="text-gray-600">
            Tambah, edit, atau hapus kandidat pemilu
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kandidat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge className="bg-blue-600">
                    PASLON {candidate.number}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(candidate)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(candidate)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img
                    src={candidate.ketua.photo}
                    alt={candidate.ketua.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-semibold">{candidate.ketua.name}</h3>
                  <p className="text-sm text-gray-600">Calon Ketua</p>
                </div>

                <div className="text-center">
                  <img
                    src={candidate.wakil.photo}
                    alt={candidate.wakil.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-semibold">{candidate.wakil.name}</h3>
                  <p className="text-sm text-gray-600">Calon Wakil Ketua</p>
                </div>

                <div>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {candidate.visi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCandidate?.id === 0
                ? "Tambah Kandidat Baru"
                : "Edit Kandidat"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi kandidat di bawah ini
            </DialogDescription>
          </DialogHeader>

          {editingCandidate && (
            <div className="space-y-6">
              {/* Nomor Urut */}
              <div>
                <Label htmlFor="number">Nomor Urut</Label>
                <Input
                  id="number"
                  value={editingCandidate.number}
                  onChange={(e) =>
                    setEditingCandidate({
                      ...editingCandidate,
                      number: e.target.value,
                    })
                  }
                />
              </div>

              {/* Calon Ketua */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Calon Ketua
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ketua-name">Nama</Label>
                    <Input
                      id="ketua-name"
                      value={editingCandidate.ketua.name}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          ketua: {
                            ...editingCandidate.ketua,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="ketua-nim">NIM</Label>
                    <Input
                      id="ketua-nim"
                      value={editingCandidate.ketua.nim}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          ketua: {
                            ...editingCandidate.ketua,
                            nim: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="ketua-photo">URL Foto</Label>
                    <Input
                      id="ketua-photo"
                      value={editingCandidate.ketua.photo}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          ketua: {
                            ...editingCandidate.ketua,
                            photo: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Calon Wakil Ketua */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Calon Wakil Ketua
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="wakil-name">Nama</Label>
                    <Input
                      id="wakil-name"
                      value={editingCandidate.wakil.name}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          wakil: {
                            ...editingCandidate.wakil,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="wakil-nim">NIM</Label>
                    <Input
                      id="wakil-nim"
                      value={editingCandidate.wakil.nim}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          wakil: {
                            ...editingCandidate.wakil,
                            nim: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="wakil-photo">URL Foto</Label>
                    <Input
                      id="wakil-photo"
                      value={editingCandidate.wakil.photo}
                      onChange={(e) =>
                        setEditingCandidate({
                          ...editingCandidate,
                          wakil: {
                            ...editingCandidate.wakil,
                            photo: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Visi */}
              <div>
                <Label htmlFor="visi">Visi</Label>
                <Textarea
                  id="visi"
                  value={editingCandidate.visi}
                  onChange={(e) =>
                    setEditingCandidate({
                      ...editingCandidate,
                      visi: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              {/* Misi */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Misi
                    </span>
                    <Button size="sm" onClick={addMisiItem}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {editingCandidate.misi.map((item, index) => (
                    <div key={index} className="flex space-x-2">
                      <Textarea
                        value={item}
                        onChange={(e) => updateMisiItem(index, e.target.value)}
                        placeholder={`Misi ${index + 1}`}
                        rows={2}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeMisiItem(index)}
                        disabled={editingCandidate.misi.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Program Unggulan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Program Unggulan
                    </span>
                    <Button size="sm" onClick={() => addArrayItem("programs")}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {editingCandidate.programs.map((item, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateArrayItem("programs", index, e.target.value)
                        }
                        placeholder={`Program ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("programs", index)}
                        disabled={editingCandidate.programs.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pengalaman */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Pengalaman Organisasi</span>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("experience")}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {editingCandidate.experience.map((item, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateArrayItem("experience", index, e.target.value)
                        }
                        placeholder={`Pengalaman ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("experience", index)}
                        disabled={editingCandidate.experience.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Video ID */}
              <div>
                <Label htmlFor="videoId">YouTube Video ID</Label>
                <Input
                  id="videoId"
                  value={editingCandidate.videoId}
                  onChange={(e) =>
                    setEditingCandidate({
                      ...editingCandidate,
                      videoId: e.target.value,
                    })
                  }
                  placeholder="dQw4w9WgXcQ"
                />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Konfirmasi Hapus Kandidat
            </AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kandidat{" "}
              <span className="font-semibold">
                {candidateToDelete?.ketua.name} &{" "}
                {candidateToDelete?.wakil.name}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
