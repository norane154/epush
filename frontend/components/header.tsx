import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native'; 
import '../global.css';
import { Feather, Ionicons } from '@expo/vector-icons';


interface TopHeaderProps {  
  activeTab?: string;
  onPressAccount?: () => void;
  onPressLang?: () => void;
  onBack?: () => void;
}

const fptLogo = require('../assets/images/header.png');

export default function TopHeader({
  activeTab = 'ePush',
  onPressAccount,
  onPressLang,
    onBack,
}: TopHeaderProps) {
  const navigation = useNavigation();   
  const handleBack = () => { if (onBack) return onBack();
    if (navigation?.canGoBack?.()) navigation.goBack();
  };

  return (
    <View className="h-16 bg-white flex-row items-center px-6 border-b border-slate-200">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>  
          <Image
            source={fptLogo}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
                  onPress={handleBack}
                  activeOpacity={0.9}
                  className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center ml-8"
                >
                  <Feather name="chevron-left" size={16} color="#6b7280" />
                </TouchableOpacity>
   <View className="w-px h-full bg-slate-200 ml-10" />
      <View className="ml-12 h-full justify-center items-center">
        <Text className="text-base font-semibold text-cyan-500 pb-0.5 border-b-2 border-cyan-500">
          {activeTab}
        </Text>
      </View>

      <View className="flex-1" />

      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          className="w-10 h-6 rounded-2xl bg-slate-200 justify-center px-0.5"
          onPress={onPressLang}
        >
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
