import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

interface AppItem {
  id: number;
  name: string;
  bundleId: string;
}

interface AppGridProps {
  section?: string;
  columns?: number;
  gap?: number;
  cardWidth?: number;
  onOpen?: (item: AppItem) => void;
  onAdd?: () => void;
}

const DATA: AppItem[] = Array.from({ length: 56 }).map((_, i) => ({
  id: i + 1,
  name: `FPT Information System Insight ${i + 1}`,
  bundleId: 'fpt-information-system-insight',
}));

const Card = ({ item, width = 230, onPress }: { item: AppItem; width?: number; onPress?: (item: AppItem) => void }) => (
  <TouchableOpacity 
    activeOpacity={0.92} 
    onPress={() => onPress?.(item)} 
    className="bg-white rounded-xl p-4 min-h-30 border border-slate-200 shadow-sm"
    style={{ width }}
  >
    <View className="absolute left-3 top-2.5 w-10 h-10 rounded-lg bg-orange-400 items-center justify-center">
      <View style={{ transform: [{ skewX: '-10deg' }] }}>
        <Text className="text-white text-xs font-bold tracking-wider italic text-center">F I S</Text>
        <Text className="text-white text-xs font-semibold italic text-center mt-0.5">Insight</Text>
      </View>
    </View>

    <Text numberOfLines={2} className="font-bold text-base text-gray-900 leading-5 mt-11">
      {item.name}
    </Text>
    <Text numberOfLines={1} className="mt-1.5 text-gray-400 text-xs">
      {item.bundleId}
    </Text>
  </TouchableOpacity>
);

export default function AppGrid({
  section,
  columns = 4,
  gap = 24,
  cardWidth = 230,
  onOpen,
  onAdd,
}: AppGridProps) {
  const list = useMemo(() => (section === 'recent' ? DATA.slice(0, 3) : DATA), [section]);

  // "Thêm mới" cho khu recent như mock – 1 card rỗng
  const recentLeading = section === 'recent' ? (
    <TouchableOpacity 
      activeOpacity={0.92} 
      onPress={onAdd} 
      className="bg-white rounded-xl p-4 min-h-30 border border-slate-200 justify-center"
      style={{ width: cardWidth }}
    >
      <Text className="text-2xl text-cyan-500 text-left">＋</Text>
      <Text className="text-slate-500 mt-2.5">Thêm mới</Text>
    </TouchableOpacity>
  ) : null;

  return (
    <View>
      {section === 'recent' && (
        <View className="flex-row flex-wrap mt-3" style={{ gap }}>
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
