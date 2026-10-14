import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { C, F } from './theme';
import { Icon, Txt, Card, Badge, PrimaryButton } from './components';

function PriceCell({ label, value, color }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Txt style={{ fontSize: 10, color: C.g400 }}>{label}</Txt>
      <Txt style={{ fontWeight: '700', fontSize: 15, color }}>
        {value} <Txt style={{ fontSize: 10, color }}>ل.س</Txt>
      </Txt>
    </View>
  );
}

export default function CitizenScreen() {
  return (
    <View style={{ gap: 14 }}>
      {/* عنوان الشاشة */}
      <Card style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flexShrink: 1 }}>
          <Txt style={{ fontWeight: '700', fontSize: 14, color: C.dark }}>دليل الأسعار والتحقق الذكي</Txt>
          <Txt style={{ fontSize: 10, color: C.g400 }}>المرجعية التموينية المعتمدة - محافظة اللاذقية</Txt>
        </View>
        <View style={s.pill}>
          <Icon name="verified" size={15} color={C.green} />
          <Txt style={{ fontSize: 11, fontWeight: '700', color: C.green }}>خدمة المواطن</Txt>
        </View>
      </Card>

      {/* البحث والباركود */}
      <View style={{ justifyContent: 'center' }}>
        <View style={[s.abs, { start: 12 }]}>
          <Icon name="search" size={20} color={C.g400} />
        </View>
        <View style={[s.abs, { end: 12 }]}>
          <Icon name="qr-code-scanner" size={20} color={C.dark} />
        </View>
        <TextInput
          placeholder="ابحث عن مادة أو سلعة لمعرفة سعرها الرسمي..."
          placeholderTextColor={C.g400}
          style={s.searchInput}
        />
      </View>

      {/* تصوير المادة */}
      <PrimaryButton
        icon="photo-camera"
        label="تصوير المادة / الرمز للتحقق من السعر"
        style={{ borderRadius: 8, paddingVertical: 14 }}
      />

      {/* شريط النشرة */}
      <View style={s.bulletin}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
          <Icon name="menu-book" size={16} color={C.green} />
          <Txt style={{ fontSize: 11, color: C.g600, fontWeight: '500', flexShrink: 1 }}>
            نشرة الأسعار رقم 42 الصادرة بقرار المكتب التنفيذي
          </Txt>
        </View>
        <Txt style={{ fontSize: 11, fontWeight: '700', color: C.dark }}>اللاذقية</Txt>
      </View>

      {/* سلعة 1 */}
      <View style={[s.itemCard, { borderColor: C.g200 }]}>
        <View style={s.rowTop}>
          <View style={{ flexShrink: 1 }}>
            <Txt style={{ fontWeight: '700', fontSize: 14, color: C.g900 }}>
              سُكَّر أبيض حبيبات <Txt style={{ fontSize: 10, fontWeight: '400', color: C.g400 }}>(1 كغ)</Txt>
            </Txt>
            <Txt style={{ fontSize: 10, color: C.g500 }}>مواصفة قياسية ممتازة - حيازة نظامية</Txt>
          </View>
          <Badge bg={C.emerald50} color={C.emerald700} border={C.emerald200} icon="check-circle">
            ملتزم بالسعر
          </Badge>
        </View>
        <View style={s.priceBox}>
          <PriceCell label="السعر الرسمي النافذ" value="22,000" color={C.dark} />
          <PriceCell label="سعر التجزئة المرصود" value="22,000" color={C.emerald700} />
        </View>
      </View>

      {/* سلعة 2 */}
      <View style={[s.itemCard, { borderColor: C.red200 }]}>
        <View style={s.rowTop}>
          <View style={{ flexShrink: 1 }}>
            <Txt style={{ fontWeight: '700', fontSize: 14, color: C.g900 }}>
              زيت نباتي (دوار الشمس) <Txt style={{ fontSize: 10, fontWeight: '400', color: C.g400 }}>(1 ليتر)</Txt>
            </Txt>
            <Txt style={{ fontSize: 10, color: C.red600, fontWeight: '500' }}>
              قيد المتابعة التموينية من قبل الدوريات
            </Txt>
          </View>
          <Badge bg={C.red50} color={C.red700} border={C.red200} icon="warning">
            تجاوز طفيف
          </Badge>
        </View>
        <View style={s.priceBox}>
          <PriceCell label="السعر التأشيري المعتمد" value="55,000" color={C.dark} />
          <PriceCell label="سعر السوق المسجل" value="58,000" color={C.red600} />
        </View>
      </View>

      {/* زر البلاغ */}
      <View style={{ paddingTop: 2 }}>
        <Pressable style={({ pressed }) => [s.reportBtn, pressed && { backgroundColor: '#991b1b' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 }}>
            <Icon name="campaign" size={20} color="#ffffff" />
            <View style={{ flexShrink: 1 }}>
              <Txt style={{ color: '#ffffff', fontWeight: '700', fontSize: 13 }}>تقديم بلاغ أو شكوى تموينية</Txt>
              <Txt style={{ color: '#ffffff', fontSize: 10, opacity: 0.9 }}>
                إرسال مخالفة سعرية فورية مع توثيق المصدر والمكان
              </Txt>
            </View>
          </View>
          <Icon name="arrow-back" size={18} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  pill: {
    backgroundColor: C.greenSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  abs: { position: 'absolute', zIndex: 1 },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: C.g200,
    borderRadius: 8,
    paddingVertical: 12,
    paddingStart: 40,
    paddingEnd: 44,
    fontSize: 12,
    color: C.g800,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: F.regular,
    elevation: 1,
  },
  bulletin: {
    backgroundColor: C.g100,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    elevation: 1,
  },
  rowTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  priceBox: {
    flexDirection: 'row',
    backgroundColor: C.g50,
    padding: 10,
    borderRadius: 8,
  },
  reportBtn: {
    backgroundColor: C.red,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    elevation: 2,
  },
});
