// file: components/Sidebar.tsx

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface SidebarProps {
  appName?: string;
  onAppChange?: () => void;
}

type Sub = { key: string; label: string };
type Section = { key: string; label: string; icon: keyof typeof Ionicons.glyphMap; subs?: Sub[] };

const SECTIONS: Section[] = [
  {
    key: 'thong-bao', label: 'Thông báo', icon: 'notifications-outline',
    subs: [
      { key: 'da-gui', label: 'Đã gửi' }, { key: 'da-len-lich', label: 'Đã lên lịch' },
      { key: 'luu-nhap', label: 'Lưu nháp' }, { key: 'tu-dong', label: 'Tự động' },
      { key: 'danh-sach-nguoi-dung', label: 'Danh sách người dùng' },
    ],
  },
  {
    key: 'cau-hinh', label: 'Cấu hình', icon: 'construct-outline',
    subs: [
      { key: 'bieu-mau', label: 'Biểu mẫu' }, { key: 'danh-muc', label: 'Danh mục' },
      { key: 'nhom-thong-bao', label: 'Nhóm thông báo' },
    ],
  },
  {
    key: 'tai-khoan', label: 'Tài khoản', icon: 'person-outline',
    subs: [
      { key: 'bieu-mau-tk', label: 'Biểu mẫu' },
      { key: 'danh-muc-tk', label: 'Danh mục' },
    ],
  },
  // <<< VÍ DỤ: MỘT SECTION KHÔNG CÓ MỤC CON >>>
  {
    key: 'phan-tich', label: 'Phân tích', icon: 'stats-chart-outline',
  }
];

const sectionMap = new Map<string, string>();
SECTIONS.forEach(sec => {
  
  sectionMap.set(sec.key, sec.key);
  sec.subs?.forEach(sub => {
    sectionMap.set(sub.key, sec.key);
  });
});

export default function Sidebar({
  appName = 'App Name ',
  onAppChange,
}: SidebarProps) {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const activeSectionKey = useMemo(() => sectionMap.get(route.name), [route.name]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ [activeSectionKey || '']: true });


  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  return (
    <View className="bg-white border-r border-slate-200 w-72 flex-1">
      {/* App Selector (không cuộn) */}
      <View className="p-4 border-b border-slate-200">
        <TouchableOpacity
          onPress={onAppChange}
          className="flex-row items-center bg-white border border-slate-200 rounded-xl p-3 shadow-sm"
        >
          <View className="w-8 h-8 rounded-full bg-slate-100 mr-3" />
          <Text className="flex-1 text-slate-800 font-semibold">{appName}</Text>
          <Ionicons name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-2">
        {SECTIONS.map((sec) => {
          const isActiveSec = activeSectionKey === sec.key;
          const isSectionOpen = openSections[sec.key];

          return (
            <View key={sec.key} className="mb-1">
  
              <View
                className={`flex-row items-center justify-between p-3 rounded-lg ${isActiveSec ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(sec.key)}
                  className="flex-row items-center flex-1"
                >
                  <Ionicons name={sec.icon} size={20} color={isActiveSec ? '#0891b2' : '#475569'} />
                  <Text className={`ml-3 text-base font-medium ${isActiveSec ? 'text-cyan-700' : 'text-slate-700'}`}>
                    {sec.label}
                  </Text>
                </TouchableOpacity>

      
                {sec.subs && sec.subs.length > 0 && (
                  <TouchableOpacity onPress={() => toggleSection(sec.key)} className="p-1">
                    <Ionicons
                      name={isSectionOpen ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#64748b"
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Phần hiển thị các mục con không thay đổi */}
              {isSectionOpen && sec.subs && (
                <View className="mt-1 pl-5">
                  {sec.subs.map((sub) => {
                    const isActiveSub = route.name === sub.key;
                    return (
                      <TouchableOpacity
                        key={sub.key}
                        onPress={() => navigation.navigate(sub.key)}
                        className="flex-row items-center py-2.5 pl-5"
                      >
                        <View className={`w-1.5 h-1.5 rounded-full mr-3 ${isActiveSub ? 'bg-cyan-500' : 'bg-slate-400'}`} />
                        <Text className={`text-[15px] ${isActiveSub ? 'text-cyan-700 font-semibold' : 'text-slate-600'}`}>
                          {sub.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}