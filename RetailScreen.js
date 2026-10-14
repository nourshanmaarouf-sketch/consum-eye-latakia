import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Svg, { Line, Path, Circle, Text as SvgText } from 'react-native-svg';
import { C } from './theme';
import { Icon, Txt, Card, Badge, PrimaryButton } from './components';

/* حقل اختيار (شكل القائمة المنسدلة كما في التصميم) */
function SelectBox({ icon, value }) {
  return (
    <View style={s.inputBox}>
      <View style={s.rowGap8}>
        <Icon name={icon} size={18} color={C.g500} />
        <Txt style={{ fontWeight: '700', fontSize: 13, color: C.g900, flexShrink: 1 }}>{value}</Txt>
      </View>
      <Icon name="expand-more" size={24} color={C.g400} />
    </View>
  );
}

function Field({ label, children }) {
  return (
    <View style={{ gap: 4 }}>
      <Txt style={{ fontSize: 12, fontWeight: '600', color: C.g700 }}>{label}</Txt>
      {children}
    </View>
  );
}

function InfoCell({ label, value, valueColor = C.g800, weight = '700' }) {
  return (
    <View style={{ width: '50%', paddingVertical: 4 }}>
      <Txt style={{ fontSize: 10, color: C.g400 }}>{label}</Txt>
      <Txt style={{ fontSize: 12, fontWeight: weight, color: valueColor }}>{value}</Txt>
    </View>
  );
}

export default function RetailScreen() {
  const [range, setRange] = useState('week');
  const ranges = [
    { key: 'week', label: 'أسبوع' },
    { key: 'month', label: 'شهر' },
    { key: 'quarter', label: '3 أشهر' },
  ];

  return (
    <View style={{ gap: 16 }}>
      {/* عنوان الشاشة */}
      <Card style={{ padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <View style={[s.rowGap10, { flexShrink: 1 }]}>
          <View style={s.iconBox}>
            <Icon name="storefront" size={20} color={C.green} />
          </View>
          <Txt style={{ fontWeight: '700', fontSize: 15, color: C.dark, flexShrink: 1 }}>
            منصة تسجيل أسعار التجزئة والأسواق
          </Txt>
        </View>
        <Badge bg={C.greenSoft} color={C.green} size={11}>دائرة رقابة الأسواق</Badge>
      </Card>

      {/* نموذج إدخال واعتماد السعر */}
      <Card>
        <View style={s.cardHead}>
          <View style={s.rowGap4}>
            <Icon name="assignment" size={18} color={C.green} />
            <Txt style={{ fontWeight: '700', fontSize: 13, color: C.dark }}>
              بيانات المادة التموينية واعتماد السعر
            </Txt>
          </View>
          <Txt style={{ fontSize: 11, color: C.red600, fontWeight: '500' }}>* حقل إلزامي</Txt>
        </View>

        <Field label="اختر المادة / الصنف *">
          <SelectBox icon="inventory-2" value="سُكَّر أبيض مستورد (دوكما مقنن)" />
        </Field>

        <Field label="حدد المتجر أو المركز التمويني المعتمد *">
          <SelectBox icon="store" value="ماركت العثمان - حي الشيخ ضاهر (سجل ت: 4892)" />
        </Field>

        <Field label="سعر البيع النهائي للمستهلك (ل.س) *">
          <View style={s.inputBox}>
            <Txt style={{ fontWeight: '700', fontSize: 16, color: C.dark }}>22,000</Txt>
            <Txt style={{ fontSize: 11, fontWeight: '600', color: C.g500 }}>ل.س / كغ</Txt>
          </View>
        </Field>

        <View style={s.infoBox}>
          <Icon name="info" size={16} color={C.infoText} style={{ marginTop: 2 }} />
          <Txt style={{ fontSize: 11, color: C.infoText, flex: 1, lineHeight: 17 }}>
            يُشترط التقيّد بالتسعيرة التأشيرية المحددة بالنشرة الدورية الأخيرة الصادرة برقم (47/ت) تحت طائلة تنظيم الضبط رقم (8).
          </Txt>
        </View>

        <PrimaryButton icon="verified" label="+ اعتماد سعر التجزئة وتوثيقه" size={13} />
      </Card>

      {/* بطاقة نتيجة التوثيق الفوري */}
      <Card style={{ borderColor: C.emerald200, backgroundColor: '#f6fdf9', gap: 10 }}>
        <View style={s.rowBetween}>
          <View style={s.rowGap6}>
            <Icon name="check-circle" size={22} color={C.emerald600} />
            <Txt style={{ fontWeight: '700', fontSize: 13, color: C.emerald800 }}>
              تم توثيق سعر التجزئة بنجاح
            </Txt>
          </View>
          <Badge bg={C.emerald100} color={C.emerald800}>إشعار فوري</Badge>
        </View>
        <View style={s.grid2}>
          <InfoCell label="المادة التموينية" value="سُكَّر أبيض (دوكما)" />
          <InfoCell label="المتجر / السوق" value="ماركت العثمان" />
          <InfoCell label="السعر الموثق" value="22,000 ل.س" valueColor={C.dark} />
          <InfoCell label="تاريخ وتوقيت التوثيق" value="2025/10/26 - 09:41" valueColor={C.g600} weight="600" />
        </View>
        <View style={s.rowGap4}>
          <Icon name="verified-user" size={15} color={C.emerald700} />
          <Txt style={{ fontSize: 11, color: C.emerald700, fontWeight: '500', flex: 1 }}>
            تم التدقيق والتثبيت في السجل الرقابي الرقمي (مديرية اللاذقية)
          </Txt>
        </View>
      </Card>

      {/* مخطط تتبع الأسعار */}
      <Card style={{ gap: 12 }}>
        <View style={s.rowBetween}>
          <Txt style={{ fontWeight: '700', fontSize: 13, color: C.dark }}>مخطط تتبع أسعار المادة (سُكَّر)</Txt>
          <View style={s.rangeWrap}>
            {ranges.map((r) => {
              const on = r.key === range;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setRange(r.key)}
                  style={[s.rangeBtn, on && { backgroundColor: C.dark }]}
                >
                  <Txt style={{ fontSize: 11, fontWeight: '600', color: on ? '#ffffff' : C.g600 }}>
                    {r.label}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={s.rowBetween}>
          <Txt style={{ fontSize: 11, color: C.g500 }}>
            سعر التجزئة المرصود: <Txt style={{ fontWeight: '700', color: C.g800 }}>20,000 - 22,000 ل.س</Txt>
          </Txt>
          <Txt style={{ fontSize: 11, color: C.red700, fontWeight: '700' }}>الحد الأقصى: 22,000 ل.س</Txt>
        </View>

        <View style={s.chartBox}>
          <Svg width="100%" height="100%" viewBox="0 0 320 100">
            <Line x1="10" y1="20" x2="310" y2="20" stroke="#ba1a1a" strokeDasharray="4 3" strokeWidth="1.5" />
            <Path
              d="M 20 80 C 70 75, 120 78, 170 55 C 220 38, 270 25, 300 20"
              fill="none"
              stroke="#0e2b20"
              strokeWidth="2.5"
            />
            <Circle cx="300" cy="20" r="4" fill="#0e2b20" />
            <Circle cx="170" cy="55" r="3" fill="#2d6a4f" />
            <Circle cx="20" cy="80" r="3" fill="#2d6a4f" />
            <SvgText x="20" y="95" fontSize="9" fill="#888888" textAnchor="middle">السبت</SvgText>
            <SvgText x="170" y="95" fontSize="9" fill="#888888" textAnchor="middle">الثلاثاء</SvgText>
            <SvgText x="300" y="95" fontSize="9" fill="#888888" textAnchor="middle">اليوم</SvgText>
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={s.miniStat}>
            <Txt style={{ fontSize: 10, color: C.g500 }}>نسبة التزام الأسواق</Txt>
            <Txt style={{ fontSize: 14, fontWeight: '700', color: C.emerald700 }}>98.4%</Txt>
          </View>
          <View style={s.miniStat}>
            <Txt style={{ fontSize: 10, color: C.g500 }}>الاستقرار السعري</Txt>
            <Txt style={{ fontSize: 13, fontWeight: '700', color: C.dark }}>ضمن السقف المسموح</Txt>
          </View>
        </View>
      </Card>
    </View>
  );
}

const s = StyleSheet.create({
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  rowGap4: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowGap6: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 },
  rowGap8: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  rowGap10: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: C.g100,
    paddingBottom: 8,
    gap: 8,
  },
  inputBox: {
    backgroundColor: C.g50,
    borderWidth: 1,
    borderColor: C.g200,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoBox: {
    backgroundColor: C.infoBg,
    borderWidth: 1,
    borderColor: C.infoBorder,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.g100,
  },
  rangeWrap: {
    flexDirection: 'row',
    backgroundColor: C.g100,
    borderRadius: 8,
    padding: 2,
  },
  rangeBtn: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  chartBox: {
    width: '100%',
    height: 128,
    backgroundColor: C.g50,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniStat: {
    flex: 1,
    backgroundColor: C.g50,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.g100,
    alignItems: 'center',
  },
});
