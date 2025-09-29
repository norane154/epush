import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DATA = Array.from({ length: 56 }).map((_, i) => ({
  id: i + 1,
  name: `FPT Information System Insight ${i + 1}`,
  bundleId: 'fpt-information-system-insight',
}));


const Card = ({ item, width = 230, onPress }) => (
  <TouchableOpacity activeOpacity={0.92} onPress={() => onPress?.(item)} style={[s.card, { width }]}>
    <View style={s.badgeTL}>
      <View style={s.badgeSkew}>
        <Text style={s.badgeTop}>F I S</Text>
        <Text style={s.badgeBot}>Insight</Text>
      </View>
    </View>

    <Text numberOfLines={2} style={[s.title, { marginTop: 44 }]}>{item.name}</Text>
    <Text numberOfLines={1} style={s.sub}>{item.bundleId}</Text>
  </TouchableOpacity>
);


export default function AppGrid({
  section, columns = 4, gap = 24, cardWidth = 230, onOpen, onAdd,
}) {
  const list = useMemo(() => (section === 'recent' ? DATA.slice(0, 3) : DATA), [section]);

  // “Thêm mới” cho khu recent như mock – 1 card rỗng
  const recentLeading = section === 'recent'
    ? (
      <TouchableOpacity activeOpacity={0.92} onPress={onAdd} style={[s.cardAdd, { width: cardWidth }]}>
        <Text style={s.plus}>＋</Text>
        <Text style={s.addTxt}>Thêm mới</Text>
      </TouchableOpacity>
    )
    : null;

  return (
    <View>
      {section === 'recent' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap, marginTop: 12 }}>
          {recentLeading}
          {list.map(x => <Card key={`r${x.id}`} item={x} width={cardWidth} onPress={onOpen} />)}
        </View>
      )}

      {section !== 'recent' && (
        <FlatList
          data={list}
          key={`grid-${columns}`}
          numColumns={columns}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 12 }}
          columnWrapperStyle={{ gap, marginBottom: gap }}
          keyExtractor={it => String(it.id)}
          renderItem={({ item }) => (
            <View style={{ flex: 1 / columns }}>
              <Card item={item} width={cardWidth} onPress={onOpen} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  // card nhỏ, bo, bóng rất nhẹ như mock
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 118,
    borderWidth: 1, borderColor: '#E9EDF2',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  // “thêm mới”
  cardAdd: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 118,
    borderWidth: 1, borderColor: '#E9EDF2',
    justifyContent: 'center',
  },
  plus: { fontSize: 24, color: '#00A2B9', textAlign: 'left' },
  addTxt: { color: '#6B7280', marginTop: 10 },

 
  badgeTL: {
    position: 'absolute', left: 12, top: 10,
    width: 42, height: 42, borderRadius: 10,
    backgroundColor: '#F58A3D', alignItems: 'center', justifyContent: 'center',
  },
  badgeSkew: { transform: [{ skewX: '-10deg' }] },
  badgeTop: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1, fontStyle: 'italic', textAlign: 'center' },
  badgeBot: { color: '#fff', fontSize: 10, fontWeight: '600', fontStyle: 'italic', textAlign: 'center', marginTop: 2 },

  title: { fontWeight: '700', fontSize: 16, color: '#111827', lineHeight: 22 },
  sub: { marginTop: 6, color: '#9CA3AF', fontSize: 12 },
});
