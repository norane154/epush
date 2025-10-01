import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopHeader from '../components/header';
import AppTable from '../components/hometable';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeTableScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TopHeader activeTab="ePush" />
      <ScrollView>
        <View className="flex-1 p-6">
          <View className="w-full bg-white rounded-lg p-6 border border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-medium text-gray-800">Danh sách ứng dụng</Text>
              <View className="flex-row border border-gray-300 rounded-lg overflow-hidden">
                <TouchableOpacity 
                  className="py-2 px-3 bg-white"
                  onPress={() => navigation.navigate('HomeGrid')}
                >
                  <Icon name="grid" size={18} color="#595959" />
                </TouchableOpacity>
                <View className="py-2 px-3 bg-gray-100">
                  <Icon name="menu" size={18} color="#595959" />
                </View>
              </View>
            </View>

            <AppTable
  onAdd={() => navigation.navigate('CreateApp')}
  onView={(it) => navigation.navigate('AppDetail', { appId: it.id, appName: it.name })}
  onEdit={(it) => console.log('Sửa', it.id)}
  onDelete={(it) => console.log('Xoá', it.id)}
/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
