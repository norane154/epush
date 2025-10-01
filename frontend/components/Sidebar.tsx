import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SidebarProps {
  activeSection: string;
  activeSubSection: string;
  onSectionChange: (section: string, subSection?: string) => void;
  onAppChange: () => void;
  collapsed?: boolean;
}

export default function Sidebar({
  activeSection,
  activeSubSection,
  onSectionChange,
  onAppChange,
  collapsed = false,
}: SidebarProps) {
  if (collapsed) {
    return (
      <View className="w-16 bg-white border-r border-gray-200">
        <View className="p-4">
          <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
            <Ionicons name="menu" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="w-64 bg-white border-r border-gray-200">
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-6">Menu</Text>
        
        <View className="space-y-2">
          <TouchableOpacity
            className={`p-3 rounded-lg ${
              activeSection === 'thong-bao' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
            onPress={() => onSectionChange('thong-bao', 'tao-moi-ung-dung')}
          >
            <Text className={`font-medium ${
              activeSection === 'thong-bao' ? 'text-blue-600' : 'text-gray-700'
            }`}>
              Thông báo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-3 rounded-lg ${
              activeSection === 'quan-ly' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
            onPress={() => onSectionChange('quan-ly')}
          >
            <Text className={`font-medium ${
              activeSection === 'quan-ly' ? 'text-blue-600' : 'text-gray-700'
            }`}>
              Quản lý
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-3 rounded-lg ${
              activeSection === 'cai-dat' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
            onPress={() => onSectionChange('cai-dat')}
          >
            <Text className={`font-medium ${
              activeSection === 'cai-dat' ? 'text-blue-600' : 'text-gray-700'
            }`}>
              Cài đặt
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
