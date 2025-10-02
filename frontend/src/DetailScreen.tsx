// AppDetailScreen.tsx

import React, { useState } from 'react'; // 👈 1. Thêm useState
import { SafeAreaView, ScrollView, View } from 'react-native';
import TopHeader from '../components/header';
import SidebarBody from '../components/Sidebar';
import DetailTable from '../components/detailtable';
import { useNavigation, useRoute } from '@react-navigation/native';
import CreateNotificationModal from '../components/detailapp'; // 👈 2. Import component modal

export default function AppDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { appName = 'App Name' } = (route.params || {}) as { appName?: string };

 


  const [isModalVisible, setModalVisible] = useState(false);

 
  const handleOpenCreateModal = () => {
    setModalVisible(true);
  };

 
  const handleCloseCreateModal = () => {
    setModalVisible(false);
  };
  
  

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <TopHeader activeTab="ePush" />
      <View className="flex-1 flex-row">
        <SidebarBody
          appName={appName}
          activeSection="thong-bao"
          activeSubSection="da-gui"
          onSectionChange={() => {}}
          onAppChange={() => {}}
          onBack={() => navigation.navigate('HomeTable')} 
        />

        <ScrollView className="flex-1">
          <View className="px-6 py-4">
              <DetailTable
              
                onCreateNew={handleOpenCreateModal} 
                onExport={() => {/* export */}}
                onRowPress={(row) => {
                  console.log('Open sent item', row.id);
                }}
              />
            </View>
        </ScrollView>
      </View>
      
  
      <CreateNotificationModal 
        isVisible={isModalVisible} 
        onClose={handleCloseCreateModal} 
      />
    </SafeAreaView>
  );
}