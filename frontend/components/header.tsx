import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TopHeaderProps {
  activeTab?: string;
  onPressAccount?: () => void;
  onNotifications?: () => void;
  onPressLang?: () => void;
}

const fptLogo = require('../assets/images/fpt.png');

export default function TopHeader({
  activeTab = 'ePush',
  onPressAccount,
  onNotifications,
  onPressLang,
}: TopHeaderProps) {
  return (
    <View className="h-16 bg-white flex-row items-center px-6 border-b border-slate-200">
      <View className="flex-row items-center">
        <Image source={fptLogo} 

  className="mr-3" 
 
  style={{ width: 40, height: 32 }}
  resizeMode="contain"  />
        <Text className="text-blue-600 text-xs font-semibold">Information System</Text>
      </View>

      <View className="ml-12 h-full justify-center items-center">
        <Text className="text-base font-semibold text-cyan-500 pb-0.5 border-b-2 border-cyan-500">
          {activeTab}
        </Text>
      </View>

      <View className="flex-1" />

      <View className="flex-row items-center gap-4">
        <TouchableOpacity className="relative" onPress={onNotifications}>
          <View className="w-6 h-6 rounded-full bg-red-600 justify-center items-center">
            <Text className="text-white text-xs font-bold">1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-6 rounded-2xl bg-slate-200 justify-center px-0.5" onPress={onPressLang}>
          <View className="w-5 h-5 rounded-full bg-red-600 justify-center items-center shadow-sm">
            <Ionicons name="star" size={8} color="#FFFF00" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center" onPress={onPressAccount}>
          <View className="w-8 h-8 rounded-full bg-slate-100 justify-center items-center">
            <Ionicons name="person-outline" size={20} color="#a0aec0" />
          </View>
          <Text className="ml-2 mr-1.5 text-gray-800 text-sm font-medium">Account</Text>
          <Ionicons name="chevron-down" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
