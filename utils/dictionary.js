const tech_synonyms = {
    "eKey & Access": [
        "login", "ekey", "access", "auth", "password", "sign", "identity", "credential", "reset", "user", "account", "profile", "otp", "pin",
        "دخول", "مفتاح", "سر", "باسوورد", "هوية", "بصمة", "تسجيل", "نسيت", "قفل", "مفتاح الكتروني", "حساب", "كلمة المرور", "دخول موحد", "رمز", "التحقق", "صلاحية", "حسابي", "ما يدخل", "متبند", "مقفول"
    ],
    "Payments & Fees": [
        "pay", "fee", "money", "bill", "card", "credit", "invoice", "amount", "vat", "bank", "benefit", "tamkeen", "payment", "transaction", "cash",
        "دفع", "رسوم", "مبلغ", "فاتورة", "سداد", "بطاقة", "فيزا", "بنك", "تمكين", "بنفت", "فلوس", "بيزات", "مبالغ", "ضريبة", "الدفع الالكتروني", "سحب", "تحويل", "ما ينخصم", "رصيد", "التكلفة"
    ],
    "Integration Issues": [
        "iga", "integration", "link", "connect", "api", "system", "slow", "error", "bug", "server", "network", "offline", "crash", "timeout", "down", "gateway",
        "ربط", "نظام", "هيئة", "سيستم", "بطيء", "عطل", "سيرفر", "تعليق", "تقطيع", "مشكلة", "إيرور", "معلق", "واقف", "منقطع", "الشبكة", "الموقع", "ما يفتح", "ثقيل", "الخدمة متوقفة", "خطأ تقني"
    ],
    "Document Upload": [
        "upload", "file", "doc", "pdf", "image", "scan", "attach", "size", "format", "photo", "document", "extension", "download",
        "ملف", "رفع", "مستند", "صورة", "مرفق", "اوراق", "حجم", "صيغة", "بي دي إف", "اوراق رسمية", "ما يرفع", "مرفقات", "تحميل", "عرض الملف", "الخلفية", "تصوير"
    ],
    "Workflow & Processing": [
        "request", "application", "status", "pending", "review", "approve", "reject", "cr", "license", "amend", "renew", "commercial", "register", "cancel", "activity",
        "طلب", "حالة", "معلق", "مراجعة", "موافقة", "رفض", "سجل", "تجاري", "ترخيص", "تجديد", "تعديل", "معاملة", "تأسيس", "شطب", "رخصة", "نشاط", "إضافة نشاط", "الكتروني", "سجلات", "المعاملات", "اصدار"
    ]
};

function autoDetectCategory(text) {
    if (!text) return "Other / أخرى";
    const lowerText = text.toLowerCase();
    
    for (const [category, keywords] of Object.entries(tech_synonyms)) {
        if (keywords.some(keyword => lowerText.includes(keyword))) {
            return category;
        }
    }
    return "Other / أخرى";
}

module.exports = { tech_synonyms, autoDetectCategory };