// --- File: src/screens/HomeAdminScreen.tsx ---

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import "../global.css"; 
import TopHeader from '../components/header';

interface HomeAdminScreenProps {
  navigation: any;
}

export default function HomeAdminScreen({ navigation }: HomeAdminScreenProps) {
  return (
    
    <View className="flex-1 bg-transparent">
      <TopHeader activeTab="ePush" />

      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-2xl bg-white rounded-xl border border-black/5 p-8 shadow-lg">
          <Text className="text-2xl text-slate-800 font-semibold">
            Quản lý hệ thống ePush
          </Text>
          
          <View className="mt-5">
            <Text className="text-lg text-slate-700 font-medium">Danh mục</Text>
            <Text className="text-sm text-slate-500 mt-2">
              Chọn chức năng bạn muốn thao tác
            </Text>

            <View className="flex-row items-center gap-6 mt-6">
              <TouchableOpacity 
                className="w-35 h-35 rounded-xl bg-white border border-slate-200 items-center justify-center p-4"
                onPress={() => navigation.navigate('Home')}
              >
                <View className="w-16 h-16 rounded-xl bg-sky-50 items-center justify-center mb-3">
                  <Feather name="layers" size={24} color="#0284c7" />
                </View>
                <Text className="text-base text-slate-600 font-medium">Ứng dụng</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="w-35 h-35 rounded-xl bg-white border border-slate-200 items-center justify-center p-4"
                onPress={() => navigation.navigate('AccountList')}
              >
                <View className="w-16 h-16 rounded-xl bg-sky-50 items-center justify-center mb-3">
                  <Feather name="users" size={24} color="#0284c7" />
                </View>
                <Text className="text-base text-slate-600 font-medium">Tài khoản</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}