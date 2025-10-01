import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface SidebarProps {
  appName?: string;
  activeSection: string;
  activeSubSection?: string;
  onSectionChange: (section: string, subSection?: string) => void;
  onAppChange?: () => void;
  onBack?: () => void;
}

type Sub = { key: string; label: string };
type Section = { key: string; label: string; icon: keyof typeof Ionicons.glyphMap; subs?: Sub[] };

const SECTIONS: Section[] = [
  {
    key: 'thong-bao',
    label: 'Thông báo',
    icon: 'notifications-outline',
    subs: [
      { key: 'da-gui', label: 'Đã gửi' },
      { key: 'da-len-lich', label: 'Đã lên lịch' },
      { key: 'luu-nhap', label: 'Lưu nháp' },
      { key: 'tu-dong', label: 'Tự động' },
      { key: 'danh-sach-nguoi-dung', label: 'Danh sách người dùng' },
    ],
  },
  {
    key: 'cau-hinh',
    label: 'Cấu hình',
    icon: 'construct-outline',
    subs: [
      { key: 'bieu-mau', label: 'Biểu mẫu' },
      { key: 'danh-muc', label: 'Danh mục' },
    ],
  },
  { key: 'tai-khoan', label: 'Tài khoản', icon: 'person-outline' },
];

export default function SidebarBody({
  appName = 'App Name',
  activeSection,
  activeSubSection,
  onSectionChange,
  onAppChange,
  onBack,
}: SidebarProps) {
  const navigation = useNavigation<any>();   
  const [open, setOpen] = useState<Record<string, boolean>>({ [activeSection]: true });
  const toggle = (k: string) => setOpen((s) => ({ ...s, [k]: !s[k] }));
  

  return (
    <View className="w-72 bg-white border-r border-gray-200 relative">
      {/* Chọn app */}
      <View className="px-4  pb-3 top-7">
        <TouchableOpacity
          onPress={onAppChange}
          activeOpacity={0.85}
          className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-3"
        >
          <View className="w-10 h-10 rounded-full bg-gray-100 mr-3" />
          <Text className="flex-1 text-gray-800 font-medium">{appName}</Text>
          <Ionicons name="chevron-down" size={18} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View className="px-2 pb-4 top-6">
        {SECTIONS.map((sec) => {
          const isActiveSec = activeSection === sec.key;
          const hasSubs = (sec.subs?.length || 0) > 0;
          const opened = open[sec.key];

          return (
            <View key={sec.key} className="mb-1 overflow-hidden rounded-lg">
              {/* Hàng section */}
              <TouchableOpacity
                onPress={() => {
                  if (hasSubs) {
                    toggle(sec.key);
                    if (!opened) onSectionChange(sec.key);
                  } else {
                    onSectionChange(sec.key);
                  }
                }}
                activeOpacity={0.85}
                className={`px-4 py-3 flex-row items-center ${isActiveSec ? 'bg-cyan-50' : 'bg-white'}`}
              >
                <Ionicons
                  name={sec.icon}
                  size={18}
                  color={isActiveSec ? '#0284c7' : '#6b7280'}
                />
                <Text className={`ml-3 text-[15px] ${isActiveSec ? 'text-sky-700 font-medium' : 'text-gray-700'}`}>
                  {sec.label}
                </Text>
                {hasSubs ? (
                  <Ionicons
                    name={opened ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#6b7280"
                    style={{ marginLeft: 'auto' }}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#9ca3af"
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>

              {/* Sub items */}
              {hasSubs && opened && (
                <View className="bg-white">
                  {sec.subs!.map((sub) => {
                    const activeSub = isActiveSec && activeSubSection === sub.key;
                    return (
                      <TouchableOpacity
                        key={sub.key}
                        onPress={() => onSectionChange(sec.key, sub.key)}
                        className={`pl-10 pr-4 py-3 flex-row items-center ${activeSub ? 'bg-cyan-50' : ''}`}
                        activeOpacity={0.85}
                      >
                        <View className={`w-2 h-2 rounded-full mr-3 ${activeSub ? 'bg-sky-500' : 'bg-gray-300'}`} />
                        <Text className={`text-[14px] ${activeSub ? 'text-sky-700 font-medium' : 'text-gray-700'}`}>
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
      </View>
    </View>
  );
}
