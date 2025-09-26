// src/screens/HomeGridScreen.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopHeader from '../components/header';
import AppGrid from '../components/AppGird'; // <— sửa đúng tên file

const BG = require('../assets/images/bg.png'); // nền mờ

export default function HomeGridScreen({ navigation }) {
  const goToList = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: 'HomeList' }] });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEF2F6' }}>
      <TopHeader activeTab="ePush" />
      <ImageBackground source={BG} resizeMode="cover" style={{ flex: 1 }}>
        <View style={s.overlay}>
          <ScrollView contentContainerStyle={s.scroll}>
            <View style={s.container}>
              {/* Hàng tiêu đề + toggle */}
              <View style={s.rowHead}>
                <Text style={s.h2}>Truy cập gần đây</Text>
                <View style={s.toggleBox}>
                  <View style={[s.toggleBtn, s.active]}>
                    <Icon name="grid" size={16} color="#5B6775" />
                  </View>
                  <TouchableOpacity style={s.toggleBtn} onPress={goToList}>
                    <Icon name="menu" size={16} color="#5B6775" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Recent: 4 cột, cardWidth đồng nhất */}
              <AppGrid section="recent" cardWidth={230} gap={24} columns={4} />

              <Text style={[s.h2, { marginTop: 18 }]}>Tất cả ứng dụng</Text>
              <AppGrid cardWidth={230} gap={24} columns={4} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.88)' },
  scroll: { paddingBottom: 36 },
  container: {
    width: '100%',
    maxWidth: 1040,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1, // đẩy toggle sang phải
  },
  toggleBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E6EBF0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  toggleBtn: { paddingVertical: 7, paddingHorizontal: 10 },
  active: { backgroundColor: '#F3F4F6' },
});
