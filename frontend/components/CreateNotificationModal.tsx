// components/CreateNotificationModal.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// ... (INTERFACES & MOCK DATA giữ nguyên như cũ) ...
// --------------- INTERFACES & TYPES --------------- //
type DeviceStatus = 'Thành công' | 'Thất bại';

interface Device {
  id: number;
  platform: 'apple' | 'android';
  name: string;
  status: DeviceStatus;
  token: string;
  deviceId: string;
  note: string;
  createdAt: string;
}

interface AccountRow {
  id: number;
  accountName: string;
  devices: Device[];
  target: string;
  targetType: string;
  createdAt: string;
}

interface CreateNotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// --------------- MOCK DATA --------------- //
const makeMockData = (): AccountRow[] => {
  const accounts: AccountRow[] = [];
  for (let i = 1; i <= 56; i++) {
    const deviceCount = Math.floor(Math.random() * 4) + 1;
    const devices: Device[] = Array.from({ length: deviceCount }).map((_, j) => ({
      id: i * 100 + j,
      platform: j % 2 === 0 ? 'apple' : 'android',
      name: j % 2 === 0 ? 'iPhone 14 Pro Max Ultra' : `SM-A205F`,
      status: Math.random() > 0.3 ? 'Thành công' : 'Thất bại',
      token: `eHo-THsupdDocOx...${Math.random().toString(36).substring(2, 12)}`,
      deviceId: `ZALO-7381521644989...${Math.random().toString(36).substring(2, 12)}`,
      note: '0909123456',
      createdAt: `17/01/2022 10:${40 + j}`,
    }));

    accounts.push({
      id: i,
      accountName: `hienptt${i}`,
      devices: devices,
      target: i % 3 === 0 ? '5463' : i % 3 === 1 ? '40057' : 'ZALO-7381521644989294600',
      targetType: i % 2 === 0 ? 'Tất cả thiết bị' : 'Đã đăng nhập',
      createdAt: '17/01/2022',
    });
  }
  return accounts;
};

const DEFAULT_DATA = makeMockData();


// --------------- LAYOUT CONFIG (THAY ĐỔI QUAN TRỌNG) --------------- //
// <<< THAY ĐỔI 1: Chuyển từ `width` sang `flex` để layout linh hoạt
const COLS = [
  { key: 'stt', title: 'STT', flex: 0.6 },
  { key: 'accountName', title: 'Tên tài khoản', flex: 1.5 },
  { key: 'deviceCount', title: 'Số thiết bị\nThành công / Thất bại', flex: 1.8 },
  { key: 'target', title: 'Đối tượng', flex: 2.2 },
  { key: 'targetType', title: 'Loại đối tượng', flex: 1.5 },
  { key: 'createdAt', title: 'Ngày tạo', flex: 1.5 },
];

const SUB_COLS = [
    { key: 'platform', title: 'Nền tảng', flex: 1 },
    { key: 'deviceName', title: 'Tên thiết bị', flex: 2.2 },
    { key: 'status', title: 'Trạng thái', flex: 1.2 },
    { key: 'token', title: 'Token', flex: 2 },
    { key: 'deviceId', title: 'Mã thiết bị', flex: 2.5 },
    { key: 'note', title: 'Ghi chú', flex: 1.2 },
    { key: 'sentAt', title: 'Ngày tạo', flex: 1.5 },
];

const PAGE_SIZE = 10;

// --------------- SUB-COMPONENTS --------------- //

const StatusBadge = ({ status }: { status: DeviceStatus }) => {
    const isSuccess = status === 'Thành công';
    return (
        <View className={`px-2 py-1 rounded-md ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`text-xs font-medium ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                {status}
            </Text>
        </View>
    )
}

// <<< THAY ĐỔI 2: Áp dụng `flex` cho style của các ô
const TableHeader = () => (
  <View className="flex-row items-center bg-gray-50 border-b border-gray-200 px-3 py-3">
    {COLS.map((c) => (
      <View key={c.key} className="px-2" style={{ flex: c.flex }}>
        <Text className="text-[13px] font-medium text-gray-700">{c.title}</Text>
      </View>
    ))}
  </View>
);

const SubTableHeader = () => (
    <View className="flex-row items-center bg-gray-100/80 px-3 py-2.5" style={{ paddingLeft: 60 }}>
        {SUB_COLS.map(c => (
            <View key={c.key} className="px-2" style={{ flex: c.flex }}>
                <Text className="text-[13px] font-medium text-gray-600">{c.title}</Text>
            </View>
        ))}
    </View>
);

const DeviceSubRow = ({ device }: { device: Device }) => (
    <View className="flex-row items-center px-3 py-3 border-t border-gray-200" style={{ paddingLeft: 60 }}>
        <View className="px-2" style={{ flex: SUB_COLS[0].flex }}>
            <Icon name={device.platform === 'apple' ? 'apple' : 'smartphone'} size={18} color="#4b5563"/>
        </View>
        <View className="px-2" style={{ flex: SUB_COLS[1].flex }}>
            <Text className="text-sm text-gray-800">{device.name}</Text>
        </View>
        <View className="px-2 items-start" style={{ flex: SUB_COLS[2].flex }}>
            <StatusBadge status={device.status} />
        </View>
        <View className="px-2" style={{ flex: SUB_COLS[3].flex }}>
            <Text className="text-sm text-gray-600" numberOfLines={1}>{device.token}</Text>
        </View>
        <View className="px-2" style={{ flex: SUB_COLS[4].flex }}>
            <Text className="text-sm text-gray-600" numberOfLines={1}>{device.deviceId}</Text>
        </View>
        <View className="px-2" style={{ flex: SUB_COLS[5].flex }}>
            <Text className="text-sm text-gray-600">{device.note}</Text>
        </View>
        <View className="px-2" style={{ flex: SUB_COLS[6].flex }}>
            <Text className="text-sm text-gray-600">{device.createdAt}</Text>
        </View>
    </View>
);


const TableRow = ({
  row,
  index,
  isExpanded,
  onToggleExpand,
}: {
  row: AccountRow;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}) => {
  const successCount = row.devices.filter(d => d.status === 'Thành công').length;
  const failCount = row.devices.length - successCount;

  return (
    <View className="bg-white">
      <View className="flex-row items-center px-3 py-3.5 border-b border-gray-200">
        <TouchableOpacity onPress={() => onToggleExpand(row.id)} className="flex-row items-center px-2" style={{ flex: COLS[0].flex }}>
          <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={16} color="#6b7280" />
          <Text className="text-sm text-gray-700 ml-3">{index + 1}</Text>
        </TouchableOpacity>
        <View className="px-2" style={{ flex: COLS[1].flex }}><Text className="text-sm text-gray-800">{row.accountName}</Text></View>
        <View className="px-2" style={{ flex: COLS[2].flex }}>
          <Text className="text-sm">
            <Text className="font-medium text-green-600">{successCount}</Text>
            <Text className="text-gray-500"> / {failCount}</Text>
          </Text>
        </View>
        <View className="px-2" style={{ flex: COLS[3].flex }}><Text className="text-sm text-gray-700">{row.target}</Text></View>
        <View className="px-2" style={{ flex: COLS[4].flex }}><Text className="text-sm text-gray-700">{row.targetType}</Text></View>
        <View className="px-2" style={{ flex: COLS[5].flex }}><Text className="text-sm text-gray-700">{row.createdAt}</Text></View>
      </View>
      
      {isExpanded && (
        <View className="bg-gray-50">
            <SubTableHeader />
            {row.devices.map(device => <DeviceSubRow key={device.id} device={device} />)}
        </View>
      )}
    </View>
  );
};



export default function CreateNotificationModal({ isVisible, onClose }: CreateNotificationModalProps) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  
  const handleToggleExpand = (id: number) => {
    setExpandedRows(current => 
      current.includes(id) ? current.filter(rowId => rowId !== id) : [...current, id]
    );
  };

  const filteredData = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DEFAULT_DATA;
    return DEFAULT_DATA.filter(r => r.accountName.toLowerCase().includes(s));
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const pageWindow = useMemo(() => {
    const MAX = 5;
    let start = Math.max(1, page - Math.floor(MAX / 2));
    let end = Math.min(totalPages, start + MAX - 1);
    if (end - start + 1 < MAX) start = Math.max(1, end - MAX + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);


  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white rounded-lg shadow-xl w-[95%] max-w-7xl h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-800">Chi tiết thông báo</Text>
            <TouchableOpacity onPress={onClose} className="p-1 rounded-full active:bg-gray-200">
              <Icon name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          {/* Modal Body */}
          <ScrollView className="flex-1 bg-white">
             <View className="p-4">
                <Text className="text-xl font-bold text-slate-800 mb-4">Tên thông báo</Text>

                {/* Filters & Actions */}
                <View className="flex-row items-center justify-between flex-wrap gap-2 mb-4">
                    {/* ... (phần filter giữ nguyên) ... */}
                    <View className="flex-row items-center flex-wrap gap-2">
                        <TouchableOpacity className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                            <Text className="mr-2 text-sm">Export</Text><Icon name="download" size={16} color="#374151" />
                        </TouchableOpacity>
                        {['Tên tài khoản', 'Đối tượng', 'Loại đối tượng', 'Ngày tạo'].map((t) => (
                            <TouchableOpacity key={t} className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                                <Text className="mr-2 text-sm">{t}: Tất cả</Text><Icon name="chevron-down" size={16} color="#374151" />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="h-10 w-[260px] bg-gray-100 rounded-md flex-row items-center px-3">
                        <Icon name="search" size={16} color="#9ca3af" /><TextInput className="flex-1 h-full ml-2 text-sm" placeholder="Tìm kiếm nhân viên" value={q} onChangeText={setQ} style={Platform.OS === 'web' ? { outline: 'none' } : {}}/>
                    </View>
                </View>

                {/* <<< THAY ĐỔI 3: Bỏ ScrollView horizontal và View có width cố định */}
                <View className="border border-gray-200 rounded-lg overflow-hidden">
                    <FlatList
                    ListHeaderComponent={TableHeader}
                    data={pageData}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => (
                        <TableRow
                        row={item}
                        index={(page - 1) * PAGE_SIZE + index}
                        isExpanded={expandedRows.includes(item.id)}
                        onToggleExpand={handleToggleExpand}
                        />
                    )}
                    scrollEnabled={false}
                    />
                </View>

             </View>
          </ScrollView>

          {/* Modal Footer (Pagination) */}
          <View className="p-3 border-t border-gray-200 flex-row justify-between items-center bg-white">
             <Text className="text-sm text-gray-600">
                Hiển thị {pageData.length} trong {filteredData.length} kết quả
             </Text>
             
             <View className="flex-row items-center">
                <TouchableOpacity className="w-8 h-8 mx-1 rounded-md items-center justify-center" onPress={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                    <Icon name="chevron-left" size={16} color={page === 1 ? '#bfbfbf' : '#595959'} />
                </TouchableOpacity>

                {pageWindow.map((p) => (
                <TouchableOpacity key={p} onPress={() => setPage(p)} className={`min-w-[32px] h-8 mx-1 rounded-md items-center justify-center px-2 ${p === page ? 'bg-gray-200' : ''}`}>
                    <Text className={`text-sm ${p === page ? 'font-medium' : ''}`}>{p}</Text>
                </TouchableOpacity>
                ))}

                <TouchableOpacity className="w-8 h-8 mx-1 rounded-md items-center justify-center" onPress={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                    <Icon name="chevron-right" size={16} color={page === totalPages ? '#bfbfbf' : '#595959'} />
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}