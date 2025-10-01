import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutChangeEvent } from 'react-native';

interface AppItem { id: number; name: string; bundleId: string; }
interface AppGridProps {
  section?: 'recent' | 'all';
  gap?: number;
  onOpen?: (item: AppItem) => void;
  onAdd?: () => void;
}

const DATA: AppItem[] = Array.from({ length: 56 }).map((_, i) => ({
  id: i + 1,
  name: `FPT Information System Insight ${i + 1}`,
  bundleId: 'fpt-information-system-insight',
}));

const Card = ({
  item, width, onPress, style,
}: { item: AppItem; width: number; onPress?: (it: AppItem) => void; style?: any }) => (
  <TouchableOpacity
    activeOpacity={0.92}
    onPress={() => onPress?.(item)}
    className="bg-white rounded-xl p-4 min-h-30 border border-slate-200 shadow-sm"
    style={[{ width }, style]}
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
    <Text numberOfLines={1} className="mt-1.5 text-gray-400 text-xs">{item.bundleId}</Text>
  </TouchableOpacity>
);

const AddCard = ({ width, onAdd, style }: { width: number; onAdd?: () => void; style?: any }) => (
  <TouchableOpacity
    activeOpacity={0.92}
    onPress={onAdd}
    className="bg-white rounded-xl p-4 min-h-30 border border-slate-200 justify-center"
    style={[{ width }, style]}
  >
    <Text className="text-2xl text-cyan-500 text-left">＋</Text>
    <Text className="text-slate-500 mt-2.5">Thêm mới</Text>
  </TouchableOpacity>
);

export default function AppGrid({
  section = 'all', gap = 24, onOpen, onAdd,
}: AppGridProps) {
  const [containerW, setContainerW] = useState(0);
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerW(e.nativeEvent.layout.width);
  }, []);

  const COLUMNS = 4;
  // cardWidth tính để NHÂN 4 vừa khít với (COLUMNS-1) gaps
  const cardWidth = containerW > 0 ? (containerW - gap * (COLUMNS - 1)) / COLUMNS : 230;

  const list = useMemo(() => (section === 'recent' ? DATA.slice(0, 3) : DATA), [section]);

  // helper: style cho item index i -> bỏ marginRight ở item thứ 4,8,12,...
  const mr = (i: number) => ((i + 1) % COLUMNS === 0 ? 0 : gap);

  return (
    <ScrollView onLayout={onLayout} scrollEnabled={false} contentContainerStyle={{ paddingTop: 12 }}>
      {/* RECENT: 1 Add + 3 app = 4 ô đúng 1 hàng */}
      {section === 'recent' && (
        <View className="flex-row flex-wrap">
          <AddCard width={cardWidth} onAdd={onAdd} style={{ marginRight: mr(0), marginBottom: gap }} />
          {list.map((x, idx) => (
            <Card
              key={`r-${x.id}`}
              item={x}
              width={cardWidth}
              onPress={onOpen}
              style={{ marginRight: mr(idx + 1), marginBottom: gap }} // +1 vì đã có AddCard đứng trước
            />
          ))}
        </View>
      )}

      {/* ALL */}
      {section === 'all' && (
        <View className="flex-row flex-wrap">
          {list.map((x, idx) => (
            <Card
              key={x.id}
              item={x}
              width={cardWidth}
              onPress={onOpen}
              style={{ marginRight: mr(idx), marginBottom: gap }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
