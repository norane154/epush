// src/screens/HomeListScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopHeader from '../components/header';
import AppTable from '../components/hometable';

export default function HomeListScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <TopHeader activeTab="ePush" />
      <ScrollView>
        <View style={s.page}>
          <View style={s.card}>
            <View style={s.header}>
              <Text style={s.title}>Danh sách ứng dụng</Text>
              <View style={s.toggleBox}>
                <TouchableOpacity style={s.toggle} onPress={() => navigation.navigate('HomeGrid')}>
                  <Icon name="grid" size={18} color="#595959" />
                </TouchableOpacity>
                <View style={[s.toggle, s.active]}>
                  <Icon name="menu" size={18} color="#595959" />
                </View>
              </View>
            </View>

            <AppTable
              onAdd={() => console.log('Thêm ứng dụng')}
              onView={(it) => console.log('Xem', it.id)}
              onEdit={(it) => console.log('Sửa', it.id)}
              onDelete={(it) => console.log('Xoá', it.id)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 24 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 8, padding: 24, borderWidth: 1, borderColor: '#e8e8e8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '500', color: '#1f2937' },
  toggleBox: { flexDirection: 'row', borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 8, overflow: 'hidden' },
  toggle: { paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#fff' },
  active: { backgroundColor: '#f0f0f0' },
});
