export const database = {
  officialAuthority: "مديرية التجارة الداخلية وحماية المستهلك في اللاذقية",
  bulletinTitle: "النشرة السعرية الرسمية للمواد والسلع الغذائية الأساسية",

  // 1. قاعدة بيانات الجملة والموردين (مع إمكانية إضافة مواد جديدة عبر الواجهة)
  wholesaleData: [
    {
      id: "W01",
      barcode: "6211001200011",
      materialName: "السكر الأسري",
      category: "مواد أساسية",
      typeAndBrand: "معبأ (كيس 1 كغ / مغلف)",
      unit: "كيلوغرام",
      minPrice: 12000,
      maxPrice: 12500,
      displayMin: "12,000 ل.س",
      displayMax: "12,500 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W02",
      barcode: "6211001200012",
      materialName: "الأرز المصري (حبّة قصيرة)",
      category: "حبوب وبقوليات",
      typeAndBrand: "صنف أول معبأ",
      unit: "كيلوغرام",
      minPrice: 13500,
      maxPrice: 14200,
      displayMin: "13,500 ل.س",
      displayMax: "14,200 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W03",
      barcode: "6211001200013",
      materialName: "الأرز البسماتي (حبّة طويلة)",
      category: "حبوب وبقوليات",
      typeAndBrand: "صنف أول فاخر",
      unit: "كيلوغرام",
      minPrice: 24000,
      maxPrice: 26000,
      displayMin: "24,000 ل.س",
      displayMax: "26,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W04",
      barcode: "6211001200014",
      materialName: "زيت دوار الشمس",
      category: "زيوت وسمن",
      typeAndBrand: "مكرر صافي (عبوة 1 ليتر)",
      unit: "ليتر",
      minPrice: 27000,
      maxPrice: 28500,
      displayMin: "27,000 ل.س",
      displayMax: "28,500 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W05",
      barcode: "6211001200015",
      materialName: "السمن النباتي",
      category: "زيوت وسمن",
      typeAndBrand: "قالب صلب (عبوة 2 كغ)",
      unit: "عبوة",
      minPrice: 62000,
      maxPrice: 65000,
      displayMin: "62,000 ل.س",
      displayMax: "65,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W06",
      barcode: "6211001200016",
      materialName: "الطحين الفاخر (زيرو)",
      category: "مخابز ومعجنات",
      typeAndBrand: "استهلاك منزلي معبأ",
      unit: "كيلوغرام",
      minPrice: 8500,
      maxPrice: 9000,
      displayMin: "8,500 ل.س",
      displayMax: "9,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W07",
      barcode: "6211001200017",
      materialName: "البرغل الخشن والناعم",
      category: "حبوب وبقوليات",
      typeAndBrand: "بلدي مسلوق صنف أول",
      unit: "كيلوغرام",
      minPrice: 10000,
      maxPrice: 11000,
      displayMin: "10,000 ل.س",
      displayMax: "11,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W08",
      barcode: "6211001200018",
      materialName: "الجبنة البيضاء البلدية",
      category: "أجبان وألبان",
      typeAndBrand: "بقري / غنم صنف أول",
      unit: "كيلوغرام",
      minPrice: 35000,
      maxPrice: 39000,
      displayMin: "35,000 ل.س",
      displayMax: "39,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    },
    {
      id: "W09",
      barcode: "6211001200019",
      materialName: "الشاي الأسود الفاخر",
      category: "مستوردات",
      typeAndBrand: "فرط فاخر (عبوة 1 كغ)",
      unit: "كيلوغرام",
      minPrice: 95000,
      maxPrice: 98000,
      displayMin: "95,000 ل.س",
      displayMax: "98,000 ل.س",
      status: "معتمد",
      addedBy: "المورد المعتمد"
    }
  ],

  // 2. قاعدة بيانات التجزئة والمحلات (مع إمكانية إضافة مواد جديدة عبر الواجهة)
  retailData: [
    { id: "R01", materialName: "السكر الأسري", storeType: "مستهلك (مفرق)", maxRetailPrice: "12,500 ل.س", status: "ملتزم" },
    { id: "R02", materialName: "الأرز المصري (حبّة قصيرة)", storeType: "مستهلك (مفرق)", maxRetailPrice: "14,500 ل.س", status: "ملتزم" },
    { id: "R03", materialName: "الأرز البسماتي", storeType: "مستهلك (مفرق)", maxRetailPrice: "27,500 ل.س", status: "قيد المتابعة" },
    { id: "R04", materialName: "زيت دوار الشمس", storeType: "مستهلك (مفرق)", maxRetailPrice: "29,000 ل.س", status: "ملتزم" },
    { id: "R05", materialName: "السمن النباتي", storeType: "مستهلك (مفرق)", maxRetailPrice: "67,000 ل.س", status: "ملتزم" },
    { id: "R06", materialName: "الطحين الفاخر (زيرو)", storeType: "مستهلك (مفرق)", maxRetailPrice: "9,500 ل.س", status: "ملتزم" },
    { id: "R07", materialName: "البرغل", storeType: "مستهلك (مفرق)", maxRetailPrice: "11,500 ل.س", status: "ملتزم" },
    { id: "R08", materialName: "الجبنة البيضاء البلدية", storeType: "مستهلك (مفرق)", maxRetailPrice: "41,000 ل.س", status: "قيد التدقيق" },
    { id: "R09", materialName: "الشاي الأسود الفاخر", storeType: "مستهلك (مفرق)", maxRetailPrice: "102,000 ل.س", status: "ملتزم" }
  ],

  // 3. تحليل تطورات الأسعار والخط البياني للرقابة التموينية
  priceTrendAnalytics: {
    title: "مؤشر تطور الأسعار العام في أسواق اللاذقية",
    months: ["أيلول (أسبوع 1)", "أيلول (أسبوع 2)", "أيلول (أسبوع 3)", "أيلول (أسبوع 4)", "تشرين الأول (الحالي)"],
    averageIndex: [92, 95, 94, 96, 93.8],
    trendSummary: "استقرار ملحوظ في مؤشر السلع الغذائية الأساسية مع متابعة دقيقة لأسعار الأجبان والألبان والمستوردات.",
    totalMonitoredItems: 140,
    generalComplianceRate: "93.8%",
    activeInspectionsToday: 24,
    recentViolationsCount: 5
  }
};
