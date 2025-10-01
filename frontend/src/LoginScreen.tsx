// src/LoginScreen.tsx
import React, { useState, FC } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Định nghĩa kiểu cho props của component
// Giả định navigation prop có một phương thức 'replace'
type LoginScreenProps = {
  navigation: {
    replace: (screenName: 'HomeAdmin') => void;
  };
};

const fptLogo = require('../assets/images/fpt.png');
const illustration = require('../assets/images/epush.png');

const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = '123456';

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  
  const [error, setError] = useState<string>('');

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const handleLogin = (): void => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      console.log('Đăng nhập thành công!');
      setError(''); 
      navigation.replace('HomeAdmin'); 
    } else {
      console.log('Đăng nhập thất bại!');
      setError('Tên đăng nhập hoặc mật khẩu không đúng.'); 
    }
  };
  
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>, 
    value: string
  ): void => {
    setter(value);
    if (error) {
        setError(''); 
    }
  };


  const handleSsoLogin = (): void => {
    console.log('Đăng nhập qua SSO');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-grow justify-center">
        <View className={`flex-1 p-5 bg-white items-center justify-center ${isLargeScreen && 'flex-row justify-around p-12'}`}>
          {isLargeScreen && (
            <View className="flex-1 justify-center items-center pr-10">
              <Image source={illustration}
  className="w-full" 
  style={{ height: 400 }} 
  resizeMode="contain" />
            </View>
          )}

          <View className="flex-1 w-full max-w-md justify-center">
            {!isLargeScreen && (
              <Image source={illustration}
  className="w-full" 
  style={{ height: 400 }} 
  resizeMode="contain" />
            )}
            
            <View className="w-full">
              <Image  source={fptLogo}

  className="self-center mb-6" 
  
  style={{ width: 150, height: 60 }} 
  resizeMode="contain" />
              <Text className="text-2xl font-bold text-center mb-6 text-gray-500">Đăng nhập vào hệ thống ePush</Text>

              <Text className="text-sm text-gray-600 mb-2">Tên đăng nhập</Text>
              <TextInput
                className="h-[50px] border border-gray-300 rounded-lg px-4 mb-4 bg-white placeholder:text-gray-400 web:focus:outline-none"
                value={username}
                onChangeText={(text) => handleInputChange(setUsername, text)}
                placeholder="Nhập tên đăng nhập"
                autoCapitalize="none"
              />

              <Text className="text-sm text-gray-600 mb-2">Mật khẩu</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg bg-white px-4 mb-4">
                <TextInput
                  className="flex-1 h-[50px] placeholder:text-gray-400 web:focus:outline-none"
                  value={password}
                  onChangeText={(text) => handleInputChange(setPassword, text)}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
              </View>

              {/* --- 4. HIỂN THỊ THÔNG BÁO LỖI --- */}
              {error ? <Text className="text-red-600 text-center mb-3 text-sm">{error}</Text> : null}

              <TouchableOpacity className="bg-[#00ACC1] py-4 rounded-lg items-center" onPress={handleLogin}>
                <Text className="text-white text-base font-bold">Đăng nhập</Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-5">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-2.5 text-gray-400 text-xs">hoặc đăng nhập bằng</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              <TouchableOpacity className="bg-gray-100 py-4 rounded-lg items-center justify-center flex-row border border-gray-300" onPress={handleSsoLogin}>
                <Ionicons name="keypad-outline" size={20} color="#333" className="mr-2" />
                <Text className="text-gray-800 text-base font-medium">Đăng nhập qua SSO</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </ScrollView>
      <Text className="text-center text-gray-400 pb-5 text-xs">Phiên bản: 1.0.0</Text>
    </SafeAreaView>
  );
}

export default LoginScreen;