import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Siapa yang berhak memilih?",
      answer: "Semua mahasiswa aktif Fakultas Hukum UNISBA yang terdaftar dalam sistem akademik."
    },
    {
      question: "Bagaimana cara memilih?",
      answer: "Login menggunakan NIM, masukkan kode OTP yang dikirim ke email resmi, lalu pilih kandidat favorit Anda."
    },
    {
      question: "Apakah bisa memilih lebih dari sekali?",
      answer: "Tidak. Setiap mahasiswa hanya bisa memberikan satu suara. Sistem akan mencatat dan memblokir akses setelah memilih."
    },
    {
      question: "Bagaimana jika lupa password atau NIM?",
      answer: "Hubungi panitia pemilu melalui kontak yang tersedia di website atau datang langsung ke sekretariat BEM."
    },
    {
      question: "Kapan hasil pemilu diumumkan?",
      answer: "Hasil sementara dapat dilihat real-time, sedangkan hasil resmi akan diumumkan maksimal 24 jam setelah pemungutan suara ditutup."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions (FAQ)</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}