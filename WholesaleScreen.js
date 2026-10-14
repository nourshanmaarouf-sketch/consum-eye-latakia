import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { C, F } from './theme';
import { Icon, Txt, Card, Badge, PrimaryButton, RtlHScroll } from './components';

const STATS = [
  { label: 'المواد الموردة', value: '24', unit: 'مادة', icon: 'category', color: C.green, valueColor: C.dark },
  { label: 'الموردون المعتمدون', value: '18', unit: 'شركة', icon: 'verified', color: C.green, valueColor: C.dark },
  { label: 'التحديثات اليومية', value: '7', unit: 'إشعارات', icon: 'sync', color: C.emerald600, valueColor: C.emerald700 },
  { label: 'قيد التدقيق التمويني', value: '2', unit: 'سجلات', icon: 'pending-actions', color: C.amber600, valueColor: C.amber600 },
];

const CATEGORIES = ['جميع المواد (24)', 'مواد غذائية أساسية', 'حبوب وبقوليات', 'زيوت وسُمون'];

const ITEMS = [
  {
    icon: 'grain',
    name: 'سكر أبيض ناصع',
    pack: '(شوال 50 كغ)',
    company: 'شركة السكر الوطنية المحدودة',
    status: 'approved',
    priceLabel: 'سعر الجملة الرسمي للمستودع:',
    price: '16,500 ل.س / كغ',
    date: '2025/10/26',
  },
  {
    icon: 'rice-bowl',
    name: 'رز مصري نخب أول',
    pack: '(أكياس 25 كغ)',
    company: 'شركة الفجر للتجارة والتوزيع',
    status: 'approved',
    priceLabel: 'سعر الجملة الرسمي للمستودع:',
    price: '14,200 ل.س / كغ',
    date: '2025/10/26',
  },
  {
    icon: 'water-drop',
    name: 'زيت دوار الشمس نباتي',
    pack: '(عبوة 4 لتر)',
    company: 'شركة الشام للتصنيع الغذائي',
    status: 'review',
    priceLabel: 'سعر الجملة المقترح:',
    price: '55,000 ل.س / لتر',
    date: '2025/10/25',
  },
];

export default function WholesaleScreen() {
  const [cat, setCat] = useState(0);

  return (
    <View style={{ gap: 16 }}>
      {/* عنوان الشاشة */}
      <Card style={{ padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={s.iconBox}>
          <Icon name="inventory" size={20} color={C.green} />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Txt style={{ fontWeight: '700', fontSize: 14, color: C.dark }}>
            قاعدة بيانات أسعار الجملة والتوريد
          </Txt>
          <Txt style={{ fontSize: 10, color: C.g400 }}>سجلات التسعير المركزي رقم 402</Txt>
        </View>
      </Card>

      {/* زر تحديث سعر الجملة */}
      <PrimaryButton icon="add-circle" label="+ تحديث سعر الجملة" style={{ borderRadius: 8, paddingVertical: 14 }} />

      {/* بطاقات الإحصائيات */}
      <View style={s.statsGrid}>
        {STATS.map((st) => (
          <View key={st.label} style={s.statCard}>
            <View style={{ flexShrink: 1 }}>
              <Txt style={{ fontSize: 10, color: C.g500 }}>{st.label}</Txt>
              <Txt style={{ fontSize: 18, fontWeight: '700', color: st.valueColor }}>
                {st.value} <Txt style={{ fontSize: 11, fontWeight: '400', color: C.g400 }}>{st.unit}</Txt>
              </Txt>
            </View>
            <Icon name={st.icon} size={24} color={st.color} />
          </View>
        ))}
      </View>

      {/* البحث */}
      <View style={s.searchWrap}>
        <View style={s.searchIcon}>
          <Icon name="search" size={20} color={C.g400} />
        </View>
        <TextInput
          placeholder="البحث عن مادة تموينية أو شركة موردة..."
          placeholderTextColor={C.g400}
          style={s.searchInput}
        />
      </View>

      {/* فئات السلع */}
      <RtlHScroll contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
        {CATEGORIES.map((c, i) => {
          const on = i === cat;
          return (
            <Pressable
              key={c}
              onPress={() => setCat(i)}
              style={[s.chip, on ? { backgroundColor: C.dark } : { backgroundColor: '#ffffff', borderWidth: 1, borderColor: C.g200 }]}
            >
              <Txt style={{ fontSize: 11, fontWeight: '600', color: on ? '#ffffff' : C.g600 }}>{c}</Txt>
            </Pressable>
          );
        })}
      </RtlHScroll>

      {/* قائمة المواد */}
      <View style={{ gap: 10 }}>
        {ITEMS.map((it) => {
          const approved = it.status === 'approved';
          return (
            <View key={it.name} style={s.itemCard}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 }}>
                  <View style={s.itemIcon}>
                    <Icon name={it.icon} size={18} color={C.g700} />
                  </View>
                  <View style={{ flexShrink: 1 }}>
                    <Txt style={{ fontWeight: '700', fontSize: 13, color: C.g900 }}>
                      {it.name} <Txt style={{ fontSize: 10, fontWeight: '400', color: C.g500 }}>{it.pack}</Txt>
                    </Txt>
                    <Txt style={{ fontSize: 10, color: C.g500 }}>{it.company}</Txt>
                  </View>
                </View>
                {approved ? (
                  <Badge bg={C.emerald50} color={C.emerald700} border={C.emerald200}>معتمد</Badge>
                ) : (
                  <Badge bg={C.amber50} color={C.amber700} border={C.amber200}>قيد التدقيق</Badge>
                )}
              </View>
              <View style={s.priceRow}>
                <Txt style={{ fontSize: 11, color: C.g500, flexShrink: 1 }}>
                  {it.priceLabel}{' '}
                  <Txt style={{ fontWeight: '700', fontSize: 13, color: approved ? C.dark : C.amber800 }}>{it.price}</Txt>
                </Txt>
                <Txt style={{ fontSize: 10, color: C.g400 }}>{it.date}</Txt>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.g200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    elevation: 1,
  },
  searchWrap: { justifyContent: 'center' },
  searchIcon: { position: 'absolute', start: 12, zIndex: 1 },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: C.g200,
    borderRadius: 8,
    paddingVertical: 10,
    paddingStart: 40,
    paddingEnd: 16,
    fontSize: 12,
    color: C.g800,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: F.regular,
    elevation: 1,
  },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  itemCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.g200,
    gap: 8,
    elevation: 1,
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.g100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceRow: {
    backgroundColor: C.g50,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
