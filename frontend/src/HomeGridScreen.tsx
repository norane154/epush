import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
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
    if (navigation?.canGoBack?.()) navigation.goBack();
    else navigation?.reset?.({ index: 0, routes: [{ name: 'Home' }] });
  };

  const onOpenApp = (item: { id: number; name: string }) => {
    // điều hướng tùy app
    // navigation.navigate('AppDetail', { id: item.id })
    console.log('open app:', item.id, item.name);
  };

  const onAddApp = () => {
  
    navigation.navigate('CreateApp')
    console.log('add new app');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
     
      <TopHeader activeTab="ePush"  />

      <ImageBackground source={BG} className="flex-1" resizeMode={Platform.OS === 'web' ? 'cover' : 'stretch'}>
        <View className="flex-1 bg-white/90">
          <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>

            <View
              style={{ width: '100%', maxWidth: 1120 }}
              className="self-center px-6 pt-3"
            >
        
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

          
              <AppGrid section="recent" gap={24} onOpen={onOpenApp} onAdd={onAddApp} />

              <Text className="text-lg font-bold text-gray-800 mt-6">Tất cả ứng dụng</Text>
              {/* All: 4 card mỗi hàng */}
              <AppGrid section="all" gap={24} onOpen={onOpenApp} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
