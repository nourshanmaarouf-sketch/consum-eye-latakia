import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
import { C } from './theme';
import { Icon, Txt, Card, Badge, PulseDot } from './components';

const STATS = [
  { label: 'المواد المراقبة', icon: 'rule', iconColor: C.g500, value: '18', valueColor: C.dark, unit: 'سلعة أساسية', note: 'تغطية تامة للتسعيرة', noteColor: C.emerald700, noteWeight: '400' },
  { label: 'متوسط التغير اليومي', icon: 'trending-up', iconColor: C.red600, value: '+3.2%', valueColor: C.red600, unit: '', note: 'مؤشر الضغط الاستهلاكي', noteColor: C.g400, noteWeight: '400' },
  { label: 'المتاجر المرصودة', icon: 'store', iconColor: C.g500, value: '56', valueColor: C.dark, unit: 'مركزاً تجارياً', note: 'ضمن الحيز البلدي', noteColor: C.g400, noteWeight: '400' },
  { label: 'تنبيهات ومخالفات', icon: 'notification-important', iconColor: C.amber600, value: '4', valueColor: C.amber600, unit: 'إشعارات عاجلة', note: 'إجراءات المتابعة والتدقيق التمويني', noteColor: C.dark, noteWeight: '600' },
];

export default function SupervisionScreen() {
  return (
    <View style={{ gap: 16 }}>
      {/* لافتة الرصد الميداني */}
      <View style={s.banner}>
        <View style={{ flexShrink: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <PulseDot />
            <Txt style={{ color: C.accent, fontSize: 11, fontWeight: '700' }}>نظام الرصد والتحكم الميداني المباشر</Txt>
          </View>
          <Txt style={{ color: '#ffffff', fontWeight: '700', fontSize: 15 }}>لوحة المراقبة والإشراف</Txt>
          <Txt style={{ color: C.g300, fontSize: 10 }}>دائرة الأسعار والرقابة التموينية • السجل الميداني المؤتمت</Txt>
        </View>
        <View style={s.sectorBadge}>
          <Txt style={{ color: '#ffffff', fontSize: 11, fontWeight: '600' }}>قطاع اللاذقية والمرافئ</Txt>
        </View>
      </View>

      {/* المؤشرات */}
      <View style={s.statsGrid}>
        {STATS.map((st) => (
          <View key={st.label} style={s.statCard}>
            <View style={s.statHead}>
              <Txt style={{ fontSize: 11, color: C.g500, flexShrink: 1 }}>{st.label}</Txt>
              <Icon name={st.icon} size={18} color={st.iconColor} />
            </View>
            <Txt style={{ fontSize: 18, fontWeight: '700', color: st.valueColor }}>
              {st.value}
              {st.unit ? <Txt style={{ fontSize: 11, fontWeight: '400', color: C.g400 }}> {st.unit}</Txt> : null}
            </Txt>
            <Txt style={{ fontSize: 10, color: st.noteColor, fontWeight: st.noteWeight, marginTop: 4 }}>{st.note}</Txt>
          </View>
        ))}
      </View>

      {/* مقارنة حركة الأسعار */}
      <Card style={{ gap: 10, borderColor: C.g200 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <View style={{ flexShrink: 1 }}>
            <Txt style={{ fontWeight: '700', fontSize: 13, color: C.dark }}>مقارنة حركة الأسعار</Txt>
            <Txt style={{ fontSize: 10, color: C.g400 }}>تحليل الهامش بين سعر الجملة والتجزئة (7 أيام)</Txt>
          </View>
          <Badge bg={C.emerald50} color={C.emerald700}>98.4% التزام</Badge>
        </View>

        <View style={s.chartBox}>
          <Svg width="100%" height="100%" viewBox="0 0 320 80">
            <Path d="M 20 45 C 80 40, 140 30, 200 25 C 260 20, 290 15, 300 15" fill="none" stroke="#0e2b20" strokeWidth="2.5" />
            <Path d="M 20 65 C 80 62, 140 55, 200 48 C 260 45, 290 42, 300 42" fill="none" stroke="#52b788" strokeWidth="2" />
            <Circle cx="300" cy="15" r="3.5" fill="#0e2b20" />
            <Circle cx="300" cy="42" r="3" fill="#52b788" />
            <SvgText x="20" y="78" fontSize="9" fill="#888888" textAnchor="middle">السبت</SvgText>
            <SvgText x="160" y="78" fontSize="9" fill="#888888" textAnchor="middle">الثلاثاء</SvgText>
            <SvgText x="300" y="78" fontSize="9" fill="#888888" textAnchor="middle">اليوم</SvgText>
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <View style={s.legend}>
            <View style={[s.dot, { backgroundColor: C.dark }]} />
            <Txt style={{ fontSize: 10, color: C.g500 }}>سعر التجزئة</Txt>
          </View>
          <View style={s.legend}>
            <View style={[s.dot, { backgroundColor: C.accent }]} />
            <Txt style={{ fontSize: 10, color: C.g500 }}>سعر الجملة</Txt>
          </View>
        </View>
      </Card>

      {/* سجل التنبيهات */}
      <Card style={{ gap: 12, borderColor: C.g200 }}>
        <View style={s.alertsHead}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="crisis-alert" size={18} color={C.dark} />
            <Txt style={{ fontWeight: '700', fontSize: 13, color: C.dark }}>سجل التنبيهات والرقابة اليومية</Txt>
          </View>
          <View style={s.countBadge}>
            <Txt style={{ fontSize: 10, color: C.g600, fontWeight: '600' }}>4 أحداث</Txt>
          </View>
        </View>

        <View style={[s.alertCard, { backgroundColor: '#fef7f7', borderColor: C.red100 }]}>
          <View style={s.alertTop}>
            <Txt style={{ fontWeight: '700', fontSize: 12, color: C.g900 }}>زيت نباتي (1 لتر)</Txt>
            <Badge bg={C.red100} color={C.red700}>مخالفة مرصودة</Badge>
          </View>
          <Txt style={{ fontSize: 11, color: C.g600 }}>
            ماركت السلام - شارع بغداد (تجاوز بنسبة 15% عن السعر التأشيري)
          </Txt>
          <View style={[s.alertTop, { paddingTop: 4 }]}>
            <Txt style={{ fontSize: 10, color: C.g400 }}>منذ 25 دقيقة</Txt>
            <Pressable style={s.patrolBtn}>
              <Txt style={{ color: '#ffffff', fontWeight: '700', fontSize: 10 }}>تحريك دورية رقابية</Txt>
            </Pressable>
          </View>
        </View>

        <View style={[s.alertCard, { backgroundColor: C.g50, borderColor: C.g100 }]}>
          <View style={s.alertTop}>
            <Txt style={{ fontWeight: '700', fontSize: 12, color: C.g900 }}>سكر أبيض (1 كغ)</Txt>
            <Badge bg={C.emerald100} color={C.emerald800}>تدقيق هامش</Badge>
          </View>
          <Txt style={{ fontSize: 11, color: C.g600 }}>
            ماركت العثمان - حي الزراعة (مطابقة فواتير المستودع والجملة)
          </Txt>
          <View style={[s.alertTop, { paddingTop: 4 }]}>
            <Txt style={{ fontSize: 10, color: C.g400 }}>منذ ساعتين</Txt>
            <Txt style={{ fontSize: 10, color: C.emerald700, fontWeight: '700' }}>ضمن الحدود التموينية المعتمدة</Txt>
          </View>
        </View>
      </Card>

      {/* إجراءات المفتش */}
      <View style={{ gap: 8, paddingTop: 4 }}>
        <Pressable style={({ pressed }) => [s.actionPrimary, pressed && { backgroundColor: C.dark2 }]}>
          <Icon name="description" size={18} color="#ffffff" />
          <Txt style={{ color: '#ffffff', fontWeight: '700', fontSize: 13 }}>إصدار تقرير دوري للأسعار والمطابقة</Txt>
        </Pressable>
        <Pressable style={({ pressed }) => [s.actionOutline, pressed && { backgroundColor: C.g50 }]}>
          <Icon name="send" size={18} color={C.dark} />
          <Txt style={{ color: C.dark, fontWeight: '700', fontSize: 13 }}>توجيه دورية رقابية فورية للموقع</Txt>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  banner: {
    backgroundColor: C.dark,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    elevation: 1,
  },
  sectorBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
    elevation: 1,
  },
  statHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 4,
  },
  chartBox: {
    width: '100%',
    height: 112,
    backgroundColor: C.g50,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  alertsHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: C.g100,
    paddingBottom: 8,
    gap: 8,
  },
  countBadge: { backgroundColor: C.g100, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  alertCard: { padding: 12, borderWidth: 1, borderRadius: 8, gap: 6 },
  alertTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  patrolBtn: { backgroundColor: C.dark, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  actionPrimary: {
    backgroundColor: C.dark,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 2,
  },
  actionOutline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: C.dark,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
