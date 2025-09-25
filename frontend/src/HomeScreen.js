//gọi table vào home 
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import TopHeader from '../components/header'; 
import AppTable from '../components/hometable'; 

export default function HomeScreen({ navigation }) {
  
  const handleAccountPress = () => {
    console.log("Account button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader 
        activeTab="ePush"
        onPressAccount={handleAccountPress} 
      />
      <View style={styles.mainContent}>
        <AppTable
          pageSize={8}
          onAdd={() => console.log('Sự kiện: Thêm ứng dụng')}
          onView={(item) => console.log('Sự kiện: Xem item:', item.id)}
          onEdit={(item) => console.log('Sự kiện: Sửa item:', item.id)}
          onDelete={(item) => console.log('Sự kiện: Xóa item:', item.id)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    padding: 24, 
  },
});