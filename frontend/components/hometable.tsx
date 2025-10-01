import React, { useMemo, useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface AppData {
  id: number;
  name: string;
  bundleId: string;
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface AppTableProps {
  onAdd?: () => void;
  onView?: (item: AppData) => void;
  onEdit?: (item: AppData) => void;
  onDelete?: (item: AppData) => void;
}

/* ---- dummy data ---- */
const createDummyData = (): AppData[] => {
  const data: AppData[] = [];
  for (let i = 1; i <= 56; i++) {
    data.push({
      id: i,
      name: `App Name ${i}`,
      bundleId: `com.fpt.AppName${i}`,
      description: 'Production',
      createdAt: '20 Feb 2022',
      createdBy: 'quoctx',
      updatedAt: '20 Feb 2022',
      updatedBy: 'dungt66',
    });
  }
  return data;
};
const DUMMY_DATA = createDummyData();

const ROW_H = 64;
const PAGE_SIZE = 8;

/* ---- helper cột ---- */
const Col: React.FC<{ flex: number; className?: string; children?: React.ReactNode }> = ({
  flex,
  className = '',
  children,
}) => (
  <View style={{ flex }} className={`pr-3 ${className}`}>
    {children}
  </View>
);

/* ---- header ---- */
const TableHeader = () => (
  <View className="flex-row bg-gray-50 border-b border-gray-100 px-4 h-14 items-center">
    <Col flex={2.5}><Text className="text-sm font-medium text-gray-800">Ứng dụng</Text></Col>
    <Col flex={1.5}><Text className="text-sm font-medium text-gray-800">Mô tả</Text></Col>
    <Col flex={1.5}><Text className="text-sm font-medium text-gray-800">Ngày tạo</Text></Col>
    <Col flex={1}><Text className="text-sm font-medium text-gray-800">Người tạo</Text></Col>
    <Col flex={1.5}><Text className="text-sm font-medium text-gray-800">Ngày sửa</Text></Col>
    <Col flex={1}><Text className="text-sm font-medium text-gray-800">Người sửa</Text></Col>
    <Col flex={1.5}><Text className="text-sm font-medium text-gray-800">Thao tác</Text></Col>
  </View>
);

/* ---- row ---- */
const TableRow = ({
  item, onView, onEdit, onDelete,
}: {
  item: AppData;
  onView?: (item: AppData) => void;
  onEdit?: (item: AppData) => void;
  onDelete?: (item: AppData) => void;
}) => (
  <View className="flex-row border-b border-gray-100 items-center px-4 h-16">
    <Col flex={2.5} className="flex-row items-center">
      <View className="w-10 h-10 rounded-full bg-gray-100 mr-3" />
      <View>
        <Text className="font-semibold text-gray-900 text-sm">{item.name}</Text>
        <Text className="text-gray-400 text-xs">{item.bundleId}</Text>
      </View>
    </Col>

    <Col flex={1.5}><Text className="text-sm text-gray-600">{item.description}</Text></Col>
    <Col flex={1.5}><Text className="text-sm text-gray-600">{item.createdAt}</Text></Col>
    <Col flex={1}><Text className="text-sm text-gray-600">{item.createdBy}</Text></Col>
    <Col flex={1.5}><Text className="text-sm text-gray-600">{item.updatedAt}</Text></Col>
    <Col flex={1}><Text className="text-sm text-gray-600">{item.updatedBy}</Text></Col>

    <Col flex={1.5} className="flex-row items-center">
      <TouchableOpacity className="p-1 mr-3" onPress={() => onView?.(item)}>
        <Icon name="eye" size={16} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity className="p-1 mr-3" onPress={() => onEdit?.(item)}>
        <Icon name="edit" size={16} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity className="p-1" onPress={() => onDelete?.(item)}>
        <Icon name="trash" size={16} color="#ef4444" />
      </TouchableOpacity>
    </Col>
  </View>
);

/* ---- page jump ---- */
const PageJump = ({ current, total, onJump }: { current: number; total: number; onJump: (page: number) => void }) => {
  const [open, setOpen] = useState(false);
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <View className="relative ml-2">
      <TouchableOpacity
        className="flex-row items-center border border-gray-300 rounded-md py-2 px-2.5"
        onPress={() => setOpen((v) => !v)}
      >
        <Text className="mr-2 text-sm">{current}</Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#595959" />
      </TouchableOpacity>
      {open && (
        <View className="absolute top-11 right-0 bg-white border border-gray-200 rounded-lg min-w-30 overflow-hidden shadow-lg z-20">
          {pages.map((p) => (
            <TouchableOpacity
              key={p}
              className={`py-2.5 px-3 ${p === current ? 'bg-blue-50' : ''}`}
              onPress={() => { onJump(p); setOpen(false); }}
            >
              <Text className={`text-sm ${p === current ? 'text-gray-800 font-semibold' : 'text-gray-700'}`}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

/* ---- pagination ---- */
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  const MAX = 5;
  let start = Math.max(1, currentPage - Math.floor(MAX / 2));
  let end = Math.min(totalPages, start + MAX - 1);
  if (end - start + 1 < MAX) start = Math.max(1, end - MAX + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <View className="flex-row items-center">
      <TouchableOpacity onPress={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-8 h-8 justify-center items-center">
        <Icon name="chevron-left" size={18} color={currentPage === 1 ? '#bfbfbf' : '#595959'} />
      </TouchableOpacity>

      {pages.map((p) => (
        <TouchableOpacity
          key={p}
          className={`min-w-8 h-8 rounded-md justify-center items-center mx-1 ${currentPage === p ? 'bg-slate-400' : ''}`}
          onPress={() => onPageChange(p)}
        >
          <Text className={`text-sm ${currentPage === p ? 'text-white' : 'text-gray-800'}`}>{p}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-8 h-8 justify-center items-center">
        <Icon name="chevron-right" size={18} color={currentPage === totalPages ? '#bfbfbf' : '#595959'} />
      </TouchableOpacity>

      <PageJump current={currentPage} total={totalPages} onJump={onPageChange} />
    </View>
  );
};

/* ---- main table ---- */
export default function AppTable({ onAdd, onView, onEdit, onDelete }: AppTableProps) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DUMMY_DATA;
    return DUMMY_DATA.filter((x) => x.name.toLowerCase().includes(s) || x.bundleId.toLowerCase().includes(s));
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { if (page > totalPages) setPage(1); }, [filtered.length, totalPages]);

  const data = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [page, filtered]);

  return (
    <View className="w-full max-w-6xl self-center bg-white rounded-lg p-4 border border-gray-200 mt-3">
      {/* toolbar */}
      <View className="flex-row justify-between items-center mb-5">
        <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-md py-2 px-3">
          <Text className="mr-2 text-sm">Tất cả</Text>
          <Icon name="chevron-down" size={20} color="#374151" />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <TouchableOpacity className="bg-cyan-500 rounded-md py-2 px-4 mr-4" onPress={onAdd}>
            <Text className="text-white font-medium text-sm">Thêm ứng dụng</Text>
          </TouchableOpacity>

          <View className="flex-row items-center bg-gray-50 rounded-md px-3 w-70 h-10">
            <Icon name="search" size={20} color="#bfbfbf" style={{ marginRight: 8 }} />
            <TextInput
              className="flex-1 h-full text-sm border-0"
              placeholder="Tìm kiếm"
              placeholderTextColor="#bfbfbf"
              value={q}
              onChangeText={setQ}
              style={Platform.OS === 'web' ? { outline: 'none' } : {}}
            />
          </View>
        </View>
      </View>

      {/* table */}
      <View className="flex-grow-0 border border-gray-100 rounded-lg overflow-hidden">
        <FlatList
          data={data}
          keyExtractor={(it) => String(it.id)}
          ListHeaderComponent={TableHeader}
          renderItem={({ item }) => (
            <TableRow item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          )}
          stickyHeaderIndices={[0]}
          scrollEnabled={false}
          getItemLayout={(_, index) => ({ length: ROW_H, offset: ROW_H * index, index })}
        />
      </View>

      {/* footer */}
      <View className="flex-row justify-center items-center pt-6 relative">
        <Text className="text-sm text-gray-600 absolute left-0">
          Hiển thị {data.length} trong {filtered.length} kết quả
        </Text>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </View>
    </View>
  );
}
