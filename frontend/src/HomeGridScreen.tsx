import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopHeader from '../components/header';
import AppGrid from '../components/AppGird'; 

const BG = require('../assets/images/bg.png'); 

interface HomeGridScreenProps {
  navigation: any;
}

export default function HomeGridScreen({ navigation }: HomeGridScreenProps) {
  const goToList = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: 'HomeList' }] });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <TopHeader activeTab="ePush" />
      <ImageBackground source={BG} className="flex-1">
        <View className="flex-1 bg-white">
          <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
            <View className="w-full max-w-4xl self-center px-6 pt-3">
              
              <View className="flex-row items-center mb-2">
                <Text className="text-lg font-bold text-gray-800 flex-1">Truy cập gần đây</Text>
                <View className="flex-row border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <View className="py-2 px-3 bg-gray-100">
                    <Icon name="grid" size={16} color="#5B6775" />
                  </View>
                  <TouchableOpacity className="py-2 px-3" onPress={goToList}>
                    <Icon name="menu" size={16} color="#5B6775" />
                  </TouchableOpacity>
                </View>
              </View>

              <AppGrid section="recent" cardWidth={230} gap={24} columns={4} />

              <Text className="text-lg font-bold text-gray-800 mt-5">Tất cả ứng dụng</Text>
              <AppGrid cardWidth={230} gap={24} columns={4} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
