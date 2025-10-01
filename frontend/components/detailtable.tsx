// components/detailtable.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export interface DetailRow {
  id: number;
  name: string;   // Tên thông báo
  code: string;   // Tiêu đề
  title: string;  // Nội dung
  hasImage?: boolean;
  type: string;   // Loại thông báo
  target: string; // Loại đối tượng
  success: number;
  total: number;
  createdAt: string;
  createdBy: string;
  sentAt: string;
  sender: string;
}

export interface DetailTableProps {
  data?: DetailRow[];
  onCreateNew?: () => void;
  onExport?: () => void;
  onRowPress?: (row: DetailRow) => void;
}

/** ------------ mock data ------------ */
const makeMock = (): DetailRow[] =>
  Array.from({ length: 56 }).map((_, i) => ({
    id: i + 1,
    name: 'hoant',
    code: `HD000000${(i % 9) + 1}`,
    title: 'Cao Thị Kim Anh',
    hasImage: i % 2 === 0,
    type: i % 3 === 0 ? 'Thông báo chi tiết' : i % 3 === 1 ? 'Tin tức' : 'Tin tức nổi bật',
    target: i % 2 === 0 ? 'Tất cả' : 'Tuỳ chọn',
    success: 1267,
    total: 2050,
    createdAt: '20 Feb 2022',
    createdBy: 'quoctx',
    sentAt: '20 Feb 2022',
    sender: 'dungt66',
  }));

const DEFAULT_DATA = makeMock();

/** ------------ layout config ------------ */
const COLS: { key: string; title: string; width: number }[] = [
  { key: 'idx',       title: 'STT',                                           width: 60 },
  { key: 'name',      title: 'Tên thông báo',                                 width: 180 },
  { key: 'code',      title: 'Tiêu đề',                                       width: 180 },
  { key: 'title',     title: 'Nội dung',                                      width: 220 },
  { key: 'img',       title: 'Hình ảnh',                                      width: 90 },
  { key: 'type',      title: 'Loại thông báo',                                width: 220 },
  { key: 'target',    title: 'Loại đối tượng',                                width: 160 },
  { key: 'result',    title: 'Số người dùng\nThành công / Thất bại',          width: 220 },
  { key: 'createdAt', title: 'Ngày tạo',                                      width: 120 },
  { key: 'createdBy', title: 'Người tạo',                                     width: 120 },
  { key: 'sentAt',    title: 'Ngày gửi',                                      width: 120 },
  { key: 'sender',    title: 'Người gửi',                                     width: 120 },
];
const TABLE_WIDTH = COLS.reduce((s, c) => s + c.width, 0);

const PAGE_SIZE = 10;
const ROW_H = 56;

/** ------------ header ------------ */
const HeaderRow = () => (
  <View className="flex-row items-center bg-gray-50 border-b border-gray-200 px-3 py-3">
    {COLS.map((c) => (
      <View key={c.key} className="px-2" style={{ width: c.width }}>
        <Text className="text-[13px] font-medium text-gray-700">{c.title}</Text>
      </View>
    ))}
  </View>
);

/** ------------ row ------------ */
const BodyRow = ({
  row,
  index,
  onPress,
}: {
  row: DetailRow;
  index: number;
  onPress?: (r: DetailRow) => void;
}) => (
  <View className="flex-row items-center px-3 py-3 border-b border-gray-100">
    {/* STT */}
    <View className="px-2" style={{ width: COLS[0].width }}>
      <Text className="text-sm text-gray-700">{index + 1}</Text>
    </View>

    {/* Tên thông báo (clickable) */}
    <TouchableOpacity
      className="px-2"
      style={{ width: COLS[1].width }}
      activeOpacity={0.85}
      onPress={() => onPress?.(row)}
    >
      <Text className="text-sm text-slate-800 underline">{row.name}</Text>
    </TouchableOpacity>

    {/* Tiêu đề */}
    <View className="px-2" style={{ width: COLS[2].width }}>
      <Text className="text-sm text-gray-700">{row.code}</Text>
    </View>

    {/* Nội dung */}
    <View className="px-2" style={{ width: COLS[3].width }}>
      <Text className="text-sm text-gray-700">{row.title}</Text>
    </View>

    {/* Hình ảnh */}
    <View className="px-2" style={{ width: COLS[4].width }}>
      <View className={`w-8 h-8 rounded-full ${row.hasImage ? 'bg-gray-300' : 'bg-gray-200'}`} />
    </View>

    {/* Loại thông báo */}
    <View className="px-2" style={{ width: COLS[5].width }}>
      <Text className="text-sm text-gray-700">{row.type}</Text>
    </View>

    {/* Loại đối tượng */}
    <View className="px-2" style={{ width: COLS[6].width }}>
      <Text className="text-sm text-gray-700">{row.target}</Text>
    </View>

    {/* Kết quả */}
    <View className="px-2" style={{ width: COLS[7].width }}>
      <Text className="text-sm">
        <Text className="text-emerald-600">{row.success}</Text>
        <Text className="text-gray-500"> / {row.total}</Text>
      </Text>
    </View>

    {/* Ngày/Người tạo & gửi */}
    <View className="px-2" style={{ width: COLS[8].width }}>
      <Text className="text-sm text-gray-700">{row.createdAt}</Text>
    </View>
    <View className="px-2" style={{ width: COLS[9].width }}>
      <Text className="text-sm text-gray-700">{row.createdBy}</Text>
    </View>
    <View className="px-2" style={{ width: COLS[10].width }}>
      <Text className="text-sm text-gray-700">{row.sentAt}</Text>
    </View>
    <View className="px-2" style={{ width: COLS[11].width }}>
      <Text className="text-sm text-gray-700">{row.sender}</Text>
    </View>
  </View>
);

/** ------------ main table ------------ */
export default function DetailTable({
  data = DEFAULT_DATA,
  onCreateNew,
  onExport,
  onRowPress,
}: DetailTableProps) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.code.toLowerCase().includes(s) ||
        r.title.toLowerCase().includes(s) ||
        r.type.toLowerCase().includes(s) ||
        r.target.toLowerCase().includes(s)
    );
  }, [q, data]);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const pageWindow = useMemo(() => {
    const MAX = 5;
    let start = Math.max(1, page - Math.floor(MAX / 2));
    let end = Math.min(totalPages, start + MAX - 1);
    if (end - start + 1 < MAX) start = Math.max(1, end - MAX + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return (
    <View className="bg-white rounded-xl border border-gray-200 p-4">
      {/* toolbar */}
      <View className="flex-row items-center flex-wrap gap-2 mb-3">
        <TouchableOpacity
          onPress={onExport}
          className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-2"
        >
          <Text className="mr-2 text-sm">Export</Text>
          <Icon name="download" size={16} color="#374151" />
        </TouchableOpacity>

        {['Nhóm thông báo', 'Loại thông báo', 'Loại đối tượng', 'Lịch trình thông báo'].map(
          (t, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-2"
            >
              <Text className="mr-2 text-sm font-bold ">{t}: Tất cả</Text>
              <Icon name="chevron-down" size={16} color="#374151" />
            </TouchableOpacity>
          ),
        )}

        <View className="flex-1" />

        <TouchableOpacity
          onPress={onCreateNew}
          className="bg-sky-600 rounded-md px-4 py-2 mr-3"
        >
          <Text className="text-white text-sm font-medium">+ Thông báo mới</Text>
        </TouchableOpacity>

        <View className="flex-row items-center bg-gray-50 rounded-md px-3 h-10 w-[240px]">
          <Icon name="search" size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 h-full ml-2 text-sm"
            placeholder="Tìm kiếm nhân viên"
            placeholderTextColor="#9ca3af"
            value={q}
            onChangeText={setQ}
            style={Platform.OS === 'web' ? { outline: 'none' } : {}}
          />
        </View>
      </View>

      {/* table (horizontal scroll) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{}}
        bounces={false}
      >
        <View style={{ width: TABLE_WIDTH }}>
          <View className="border border-gray-200 rounded-lg overflow-hidden">
            <FlatList
              data={pageData}
              keyExtractor={(it) => String(it.id)}
              ListHeaderComponent={HeaderRow}
              renderItem={({ item, index }) => (
                <BodyRow
                  row={item}
                  index={(page - 1) * PAGE_SIZE + index}
                  onPress={onRowPress}
                />
              )}
              stickyHeaderIndices={[0]}
              scrollEnabled={false} // chỉ scroll theo chiều ngang ở ScrollView ngoài
              getItemLayout={(_, index) => ({
                length: ROW_H,
                offset: ROW_H * index,
                index,
              })}
            />
          </View>
        </View>
      </ScrollView>

      {/* footer / pagination với << < > >> */}
      <View className="items-center py-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-8 h-8 mx-1 rounded-md items-center justify-center"
            onPress={() => setPage(1)}
            disabled={page === 1}
          >
            <Icon name="chevrons-left" size={16} color={page === 1 ? '#bfbfbf' : '#595959'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-8 h-8 mx-1 rounded-md items-center justify-center"
            onPress={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <Icon name="chevron-left" size={16} color={page === 1 ? '#bfbfbf' : '#595959'} />
          </TouchableOpacity>

          {pageWindow.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPage(p)}
              className={`min-w-8 h-8 mx-1 rounded-md items-center justify-center ${
                p === page ? 'bg-gray-200' : ''
              }`}
            >
              <Text className="text-sm">{p}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="w-8 h-8 mx-1 rounded-md items-center justify-center"
            onPress={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <Icon name="chevron-right" size={16} color={page === totalPages ? '#bfbfbf' : '#595959'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-8 h-8 mx-1 rounded-md items-center justify-center"
            onPress={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <Icon name="chevrons-right" size={16} color={page === totalPages ? '#bfbfbf' : '#595959'} />
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-500 mt-1">
          Hiển thị {pageData.length} trong {filtered.length} kết quả
        </Text>
      </View>
    </View>
  );
}
