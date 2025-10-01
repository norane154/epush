import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import TopHeader from '../components/header';
import SidebarBody from '../components/Sidebar';
import DetailTable from '../components/detailtable';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AppDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { appName = 'App Name' } = (route.params || {}) as { appName?: string };

  return (
    <SafeAreaView className="flex-1 bg-[#dbe9e7]">
      <TopHeader activeTab="ePush" />
      <View className="flex-1 flex-row">
        <SidebarBody
          appName={appName}
          activeSection="thong-bao"
          activeSubSection="da-gui"
          onSectionChange={() => {}}
          onAppChange={() => {}}
          onBack={() => navigation.navigate('HomeTable')} // về màn list
        />

        <ScrollView className="flex-1">
          <View className="px-6 py-4">
            <View className="bg-white rounded-xl border border-gray-200 p-4">
              <Text className="text-lg font-semibold text-gray-800 mb-3">{appName}</Text>

              <DetailTable
                onCreateNew={() => {/* mở tạo thông báo */}}
                onExport={() => {/* export */}}
                onRowPress={(row) => {
                  // ví dụ mở chi tiết 1 thông báo đã gửi
                  console.log('Open sent item', row.id);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
