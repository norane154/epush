import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import TopHeader from '../components/header'; 
export default function HomeScreen({ navigation }) {
  
  const handleLogout = () => {
    navigation.replace('Login');
  };
  
  const handleAccountPress = () => {
    console.log("Account button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader 
        activeTab="ePush"
        onPressAccount={handleAccountPress} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to ePush!</Text>
        <Text style={styles.subtitle}>Bạn đã đăng nhập thành công hehe.</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#F44336', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});