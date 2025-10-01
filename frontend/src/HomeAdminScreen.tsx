import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import "../global.css"; 
interface HomeAdminScreenProps {
  navigation: any;
}

export default function HomeAdminScreen({ navigation }: HomeAdminScreenProps) {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Header */}
      <View className="bg-white/90 border-b border-slate-200">
        <View className="flex-row items-center justify-between px-6 h-16">
          <View className="flex-row items-center">
            <Image
              source={require("../assets/images/fpt.png")}
              className="w-30 h-7"
              resizeMode="contain"
            />
            <View className="ml-8 py-1">
              <Text className="text-base font-semibold text-sky-500">Admin</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-6">
            <TouchableOpacity className="relative">
              <Feather name="bell" size={20} color="#64748b" />
              <View className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-slate-200" />
              <Text className="text-slate-600 font-medium">Account</Text>
              <Feather name="chevron-down" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
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
                onPress={() => navigation.navigate('HomeList')}
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
    </ImageBackground>
  );
}
