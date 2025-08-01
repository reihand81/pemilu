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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  FileText,
  Download,
  Eye,
  Upload,
  File,
  Image,
  Video,
} from "lucide-react";

interface Document {
  id: number;
  title: string;
  description: string;
  type: "pdf" | "image" | "video" | "other";
  category: "regulation" | "guideline" | "form" | "announcement" | "other";
  url: string;
  uploadDate: string;
  size?: string;
}

export function AdminDocumentsManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Peraturan Pemilu BEM FH UNISBA 2025",
      description:
        "Dokumen resmi yang mengatur tata cara pelaksanaan pemilihan ketua dan wakil ketua BEM",
      type: "pdf",
      category: "regulation",
      url: "/documents/peraturan-pemilu-2025.pdf",
      uploadDate: "2025-01-15",
      size: "2.5 MB",
    },
    {
      id: 2,
      title: "Panduan Pemilih",
      description:
        "Panduan lengkap untuk mahasiswa dalam menggunakan sistem pemilu online",
      type: "pdf",
      category: "guideline",
      url: "/documents/panduan-pemilih.pdf",
      uploadDate: "2025-01-20",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Formulir Pengaduan",
      description:
        "Formulir untuk melaporkan masalah atau keluhan terkait proses pemilu",
      type: "pdf",
      category: "form",
      url: "/documents/formulir-pengaduan.pdf",
      uploadDate: "2025-01-25",
      size: "500 KB",
    },
    {
      id: 4,
      title: "Pengumuman Jadwal Debat",
      description:
        "Informasi resmi mengenai jadwal dan tata cara debat kandidat",
      type: "image",
      category: "announcement",
      url: "/documents/pengumuman-debat.jpg",
      uploadDate: "2025-02-01",
      size: "1.2 MB",
    },
  ]);

  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "image":
        return <Image className="w-5 h-5 text-green-500" />;
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "regulation":
        return "Peraturan";
      case "guideline":
        return "Panduan";
      case "form":
        return "Formulir";
      case "announcement":
        return "Pengumuman";
      default:
        return "Lainnya";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "regulation":
        return "bg-red-100 text-red-800";
      case "guideline":
        return "bg-blue-100 text-blue-800";
      case "form":
        return "bg-green-100 text-green-800";
      case "announcement":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (document: Document) => {
    setEditingDocument({ ...document });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingDocument) {
      if (editingDocument.id === 0) {
        // Adding new document
        const newId = Math.max(...documents.map((doc) => doc.id)) + 1;
        const newDocument = {
          ...editingDocument,
          id: newId,
          uploadDate: new Date().toISOString().split("T")[0],
        };
        setDocuments([...documents, newDocument]);
      } else {
        // Updating existing document
        setDocuments(
          documents.map((doc) =>
            doc.id === editingDocument.id ? editingDocument : doc
          )
        );
      }
      setIsDialogOpen(false);
      setEditingDocument(null);
    }
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleAddNew = () => {
    const newDocument: Document = {
      id: 0,
      title: "",
      description: "",
      type: "pdf",
      category: "other",
      url: "",
      uploadDate: new Date().toISOString().split("T")[0],
      size: "",
    };
    setEditingDocument(newDocument);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola Dokumen</h2>
          <p className="text-gray-600">Upload dan kelola dokumen pemilu</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Dokumen
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Dokumen</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peraturan</p>
                <p className="text-2xl font-bold">
                  {
                    documents.filter((doc) => doc.category === "regulation")
                      .length
                  }
                </p>
              </div>
              <File className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Panduan</p>
                <p className="text-2xl font-bold">
                  {
                    documents.filter((doc) => doc.category === "guideline")
                      .length
                  }
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Formulir</p>
                <p className="text-2xl font-bold">
                  {documents.filter((doc) => doc.category === "form").length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen</CardTitle>
          <CardDescription>
            Kelola semua dokumen yang tersedia untuk pemilu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document, index) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getTypeIcon(document.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {document.title}
                        </h3>
                        <Badge className={getCategoryColor(document.category)}>
                          {getCategoryText(document.category)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {document.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Diupload: {formatDate(document.uploadDate)}</span>
                        {document.size && <span>Ukuran: {document.size}</span>}
                        <span className="capitalize">
                          Type: {document.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(document.url, "_blank")}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const link = window.document.createElement("a");
                        link.href = document.url;
                        link.download = document.title;
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(document)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(document.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingDocument?.id === 0
                ? "Tambah Dokumen Baru"
                : "Edit Dokumen"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi dokumen di bawah ini
            </DialogDescription>
          </DialogHeader>

          {editingDocument && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Dokumen</Label>
                <Input
                  id="title"
                  value={editingDocument.title}
                  onChange={(e) =>
                    setEditingDocument({
                      ...editingDocument,
                      title: e.target.value,
                    })
                  }
                  placeholder="Masukkan judul dokumen"
                />
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={editingDocument.description}
                  onChange={(e) =>
                    setEditingDocument({
                      ...editingDocument,
                      description: e.target.value,
                    })
                  }
                  placeholder="Masukkan deskripsi dokumen"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipe Dokumen</Label>
                  <Select
                    value={editingDocument.type}
                    onValueChange={(
                      value: "pdf" | "image" | "video" | "other"
                    ) =>
                      setEditingDocument({ ...editingDocument, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="image">Gambar</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={editingDocument.category}
                    onValueChange={(
                      value:
                        | "regulation"
                        | "guideline"
                        | "form"
                        | "announcement"
                        | "other"
                    ) =>
                      setEditingDocument({
                        ...editingDocument,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regulation">Peraturan</SelectItem>
                      <SelectItem value="guideline">Panduan</SelectItem>
                      <SelectItem value="form">Formulir</SelectItem>
                      <SelectItem value="announcement">Pengumuman</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="url">URL Dokumen</Label>
                <Input
                  id="url"
                  value={editingDocument.url}
                  onChange={(e) =>
                    setEditingDocument({
                      ...editingDocument,
                      url: e.target.value,
                    })
                  }
                  placeholder="https://example.com/document.pdf"
                />
              </div>

              <div>
                <Label htmlFor="size">Ukuran File (opsional)</Label>
                <Input
                  id="size"
                  value={editingDocument.size || ""}
                  onChange={(e) =>
                    setEditingDocument({
                      ...editingDocument,
                      size: e.target.value,
                    })
                  }
                  placeholder="Contoh: 2.5 MB"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Upload File</span>
                </div>
                <p className="text-sm text-blue-700">
                  Untuk upload file baru, gunakan sistem file management atau
                  cloud storage, kemudian masukkan URL-nya di field "URL
                  Dokumen" di atas.
                </p>
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
