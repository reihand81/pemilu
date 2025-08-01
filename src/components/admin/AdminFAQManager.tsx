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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export function AdminFAQManager() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: "Siapa yang berhak memilih?",
      answer:
        "Semua mahasiswa aktif Fakultas Hukum UNISBA yang terdaftar dalam sistem akademik.",
    },
    {
      id: 2,
      question: "Bagaimana cara memilih?",
      answer:
        "Login menggunakan NIM, masukkan kode OTP yang dikirim ke email resmi, lalu pilih kandidat favorit Anda.",
    },
    {
      id: 3,
      question: "Apakah bisa memilih lebih dari sekali?",
      answer:
        "Tidak. Setiap mahasiswa hanya bisa memberikan satu suara. Sistem akan mencatat dan memblokir akses setelah memilih.",
    },
    {
      id: 4,
      question: "Bagaimana jika lupa password atau NIM?",
      answer:
        "Hubungi panitia pemilu melalui kontak yang tersedia di website atau datang langsung ke sekretariat BEM.",
    },
    {
      id: 5,
      question: "Kapan hasil pemilu diumumkan?",
      answer:
        "Hasil sementara dapat dilihat real-time, sedangkan hasil resmi akan diumumkan maksimal 24 jam setelah pemungutan suara ditutup.",
    },
  ]);

  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (item: FAQItem) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      if (editingItem.id === 0) {
        // Adding new item
        const newId = Math.max(...faqItems.map((item) => item.id)) + 1;
        setFaqItems([...faqItems, { ...editingItem, id: newId }]);
      } else {
        // Updating existing item
        setFaqItems(
          faqItems.map((item) =>
            item.id === editingItem.id ? editingItem : item
          )
        );
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: number) => {
    setFaqItems(faqItems.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    const newItem: FAQItem = {
      id: 0,
      question: "",
      answer: "",
    };
    setEditingItem(newItem);
    setIsDialogOpen(true);
  };

  const moveItem = (id: number, direction: "up" | "down") => {
    const currentIndex = faqItems.findIndex((item) => item.id === id);
    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < faqItems.length - 1)
    ) {
      const newItems = [...faqItems];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;
      [newItems[currentIndex], newItems[targetIndex]] = [
        newItems[targetIndex],
        newItems[currentIndex],
      ];
      setFaqItems(newItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola FAQ</h2>
          <p className="text-gray-600">
            Tambah, edit, atau hapus pertanyaan yang sering diajukan
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah FAQ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Daftar FAQ
            </CardTitle>
            <CardDescription>
              Kelola pertanyaan dan jawaban yang sering diajukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-2">
                        {item.question}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.answer}
                      </p>
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
                          disabled={index === faqItems.length - 1}
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Preview FAQ
            </CardTitle>
            <CardDescription>
              Tampilan FAQ seperti yang dilihat pengunjung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id === 0 ? "Tambah FAQ Baru" : "Edit FAQ"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi pertanyaan dan jawaban di bawah ini
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Pertanyaan</Label>
                <Input
                  id="question"
                  value={editingItem.question}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      question: e.target.value,
                    })
                  }
                  placeholder="Masukkan pertanyaan yang sering diajukan"
                />
              </div>

              <div>
                <Label htmlFor="answer">Jawaban</Label>
                <Textarea
                  id="answer"
                  value={editingItem.answer}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      answer: e.target.value,
                    })
                  }
                  placeholder="Masukkan jawaban yang jelas dan informatif"
                  rows={4}
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
    </div>
  );
}
