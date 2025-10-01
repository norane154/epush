import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopHeader from '../components/header';
import Sidebar from '../components/Sidebar';

interface ServerConfig {
  id: number;
  ip: string;
  port: string;
  name: string;
  emailList: string[];
  username: string;
  password: string;
}

interface FormData {
  appName: string;
  description: string;
  appImage: string;
  serviceFile: string;
  chatbotWorkplace: string;
  serverConfigs: ServerConfig[];
}

interface CreateAppScreenProps {
  navigation: any;
}

export default function CreateAppScreen({ navigation }: CreateAppScreenProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('thong-bao');
  const [activeSubSection, setActiveSubSection] = useState('tao-moi-ung-dung');
  const [activeTab, setActiveTab] = useState('workplace');
  const [formData, setFormData] = useState<FormData>({
    appName: '2.1',
    description: '',
    appImage: '/images/application.png',
    serviceFile: '',
    chatbotWorkplace: '2.1',
    serverConfigs: [
      {
        id: 1,
        ip: '2.1.1.2',
        port: '2.1',
        name: 'conchimnon',
        emailList: ['ChungTa@fpt.com.vn'],
        username: '',
        password: '',
      }
    ],
  });

  const handleSectionChange = (section: string, subSection?: string) => {
    setActiveSection(section);
    if (subSection) {
      setActiveSubSection(subSection);
    }
  };

  const handleAppChange = () => {
    console.log('Change app');
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServerConfigChange = (index: number, field: keyof ServerConfig, value: string) => {
    const newConfigs = [...formData.serverConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      serverConfigs: newConfigs
    }));
  };

  const handleAddEmail = (configIndex: number) => {
    const newConfigs = [...formData.serverConfigs];
    newConfigs[configIndex].emailList.push('');
    setFormData(prev => ({
      ...prev,
      serverConfigs: newConfigs
    }));
  };

  const handleRemoveEmail = (configIndex: number, emailIndex: number) => {
    const newConfigs = [...formData.serverConfigs];
    newConfigs[configIndex].emailList.splice(emailIndex, 1);
    setFormData(prev => ({
      ...prev,
      serverConfigs: newConfigs
    }));
  };

  const handleEmailChange = (configIndex: number, emailIndex: number, value: string) => {
    const newConfigs = [...formData.serverConfigs];
    newConfigs[configIndex].emailList[emailIndex] = value;
    setFormData(prev => ({
      ...prev,
      serverConfigs: newConfigs
    }));
  };

  const handleAddServerConfig = () => {
    const newConfig: ServerConfig = {
      id: Date.now(),
      ip: '',
      port: '',
      name: '',
      emailList: [],
      username: '',
      password: '',
    };
    setFormData(prev => ({
      ...prev,
      serverConfigs: [...prev.serverConfigs, newConfig]
    }));
  };

  const handleSave = () => {
    console.log('Save app', formData);
    navigation.goBack();
  };

  const handleReset = () => {
    setFormData({
      appName: '2.1',
      description: '',
      appImage: '/images/application.png',
      serviceFile: '',
      chatbotWorkplace: '2.1',
      serverConfigs: [
        {
          id: 1,
          ip: '2.1.1.2',
          port: '2.1',
          name: 'conchimnon',
          emailList: ['ChungTa@fpt.com.vn'],
          username: '',
          password: '',
        }
      ],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TopHeader 
        activeTab="ePush" 
        onNotifications={() => console.log('Notifications')}
        onPressAccount={() => console.log('Account')}
        onPressLang={() => console.log('Language')}
      />
      <View className="flex-1 flex-row">
        <Sidebar
          activeSection={activeSection}
          activeSubSection={activeSubSection}
          onSectionChange={handleSectionChange}
          onAppChange={handleAppChange}
          collapsed={sidebarCollapsed}
        />
        <View className="flex-1 bg-gray-100">
          <ScrollView>
            <View className="p-6">
              {/* Breadcrumbs */}
              <View className="mb-4">
                <Text className="text-sm text-gray-500">ePush / Tạo mới ứng dụng</Text>
              </View>

              {/* Page Title */}
              <Text className="text-2xl font-bold text-gray-800 mb-6">tạo mới ứng dụng</Text>

              {/* Application Setup Section */}
              <View className="mb-8">
                <Text className="text-lg font-semibold text-gray-800 mb-6">Thiết lập ứng dụng</Text>
                
                {/* Tabs */}
                <View className="flex-row mb-6 bg-gray-100 rounded-lg p-1">
                  <TouchableOpacity
                    className={`flex-1 py-3 px-4 rounded-md items-center ${
                      activeTab === 'workplace' ? 'bg-white shadow-sm' : ''
                    }`}
                    onPress={() => setActiveTab('workplace')}
                  >
                    <Text className={`text-sm font-medium ${
                      activeTab === 'workplace' ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      Thiết lập Workplace
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 px-4 rounded-md items-center ${
                      activeTab === 'email' ? 'bg-white shadow-sm' : ''
                    }`}
                    onPress={() => setActiveTab('email')}
                  >
                    <Text className={`text-sm font-medium ${
                      activeTab === 'email' ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      Thiết lập Server Email
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View className="bg-white rounded-lg p-6">
                  <View className="mb-5">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Tên ứng dụng</Text>
                    <TextInput
                      className="flex-1 h-10 text-sm text-gray-700"
                      value={formData.appName}
                      onChangeText={(value) => handleInputChange('appName', value)}
                    />
                  </View>

                  <View className="mb-5">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Mô tả</Text>
                    <TextInput
                      className="h-20 border border-gray-300 rounded-md p-3 text-sm text-gray-700"
                      placeholder="Nhập tại đây"
                      value={formData.description}
                      onChangeText={(value) => handleInputChange('description', value)}
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View className="mb-5">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Tải ảnh ứng dụng lên đây</Text>
                    <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-3">
                      <Text className="flex-1 text-sm text-gray-500">{formData.appImage}</Text>
                      <TouchableOpacity className="p-1">
                        <Ionicons name="arrow-up" size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mb-5">
                    <Text className="text-sm font-medium text-gray-700 mb-2">File dịch vụ</Text>
                    <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-3">
                      <Text className="flex-1 text-sm text-gray-500">Tải file dịch vụ ở đây</Text>
                      <TouchableOpacity className="p-1">
                        <Ionicons name="arrow-up" size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Workplace Setup */}
              <View className="mb-8">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="at" size={16} color="#6b7280" />
                  <Text className="text-lg font-semibold text-gray-800 ml-2">Thiết lập Workplace</Text>
                </View>
                <View className="bg-white rounded-lg p-6">
                  <View className="mb-5">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Chatbot Workplace</Text>
                    <TextInput
                      className="flex-1 h-10 text-sm text-gray-700"
                      value={formData.chatbotWorkplace}
                      onChangeText={(value) => handleInputChange('chatbotWorkplace', value)}
                    />
                  </View>
                </View>
              </View>

              {/* Server Email Setup */}
              <View className="mb-8">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="mail" size={16} color="#6b7280" />
                  <Text className="text-lg font-semibold text-gray-800 ml-2">Thiết lập server email</Text>
                </View>
                <View className="bg-white rounded-lg p-6">
                  {/* Server Configuration Numbers */}
                  <View className="flex-row items-center mb-6">
                    {formData.serverConfigs.map((config, index) => (
                      <TouchableOpacity
                        key={config.id}
                        className={`w-8 h-8 rounded-full justify-center items-center mr-2 ${
                          index === 0 ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      >
                        <Text className={`text-sm font-semibold ${
                          index === 0 ? 'text-white' : 'text-gray-500'
                        }`}>
                          {index + 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center border border-gray-300"
                      onPress={handleAddServerConfig}
                    >
                      <Ionicons name="add" size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  {/* Server Configuration Form */}
                  {formData.serverConfigs.map((config, configIndex) => (
                    <View key={config.id} className="mb-6">
                      <View className="flex-row mb-5">
                        <View className="flex-1 mr-3">
                          <Text className="text-sm font-medium text-gray-700 mb-2">IP</Text>
                          <View className="flex-row items-center border border-gray-300 rounded-md px-3">
                            <TextInput
                              className="flex-1 h-10 text-sm text-gray-700"
                              value={config.ip}
                              onChangeText={(value) => handleServerConfigChange(configIndex, 'ip', value)}
                            />
                            <Ionicons name="chevron-down" size={16} color="#6b7280" />
                          </View>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-medium text-gray-700 mb-2">Port</Text>
                          <View className="flex-row items-center border border-gray-300 rounded-md px-3">
                            <TextInput
                              className="flex-1 h-10 text-sm text-gray-700"
                              value={config.port}
                              onChangeText={(value) => handleServerConfigChange(configIndex, 'port', value)}
                            />
                            <Ionicons name="chevron-down" size={16} color="#6b7280" />
                          </View>
                        </View>
                      </View>

                      <View className="mb-5">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Tên</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-md px-3">
                          <TextInput
                            className="flex-1 h-10 text-sm text-gray-700"
                            value={config.name}
                            onChangeText={(value) => handleServerConfigChange(configIndex, 'name', value)}
                          />
                          <Ionicons name="chevron-down" size={16} color="#6b7280" />
                        </View>
                      </View>

                      <View className="mb-5">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Email List</Text>
                        <View className="mt-2">
                          {config.emailList.map((email, emailIndex) => (
                            <View key={emailIndex} className="flex-row items-center mb-2">
                              <TextInput
                                className="flex-1 h-10 border border-gray-300 rounded-md px-3 text-sm text-gray-700 mr-2"
                                value={email}
                                onChangeText={(value) => handleEmailChange(configIndex, emailIndex, value)}
                              />
                              <TouchableOpacity
                                className="p-2"
                                onPress={() => handleRemoveEmail(configIndex, emailIndex)}
                              >
                                <Ionicons name="close" size={16} color="#ef4444" />
                              </TouchableOpacity>
                            </View>
                          ))}
                          <TouchableOpacity
                            className="flex-row items-center py-2"
                            onPress={() => handleAddEmail(configIndex)}
                          >
                            <Ionicons name="add" size={16} color="#3b82f6" />
                            <Text className="ml-1 text-sm text-blue-500 font-medium">+ Thêm email</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View className="flex-row">
                        <View className="flex-1 mr-3">
                          <Text className="text-sm font-medium text-gray-700 mb-2">Username</Text>
                          <TextInput
                            className="h-10 border border-gray-300 rounded-md px-3 text-sm text-gray-700"
                            value={config.username}
                            onChangeText={(value) => handleServerConfigChange(configIndex, 'username', value)}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                          <TextInput
                            className="h-10 border border-gray-300 rounded-md px-3 text-sm text-gray-700"
                            value={config.password}
                            onChangeText={(value) => handleServerConfigChange(configIndex, 'password', value)}
                            secureTextEntry
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-end gap-3">
                <TouchableOpacity 
                  className="px-6 py-3 rounded-md border border-gray-300 bg-white"
                  onPress={handleReset}
                >
                  <Text className="text-sm text-gray-500">Đặt lại</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="px-6 py-3 rounded-md bg-blue-500"
                  onPress={handleSave}
                >
                  <Text className="text-sm font-medium text-white">Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
