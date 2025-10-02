// screens/CreateAppScreen.tsx
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform, 
  Switch,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import TopHeader from '../components/header'; // dùng header bạn đã tạo

/* ---------- helpers ---------- */
const Label = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-sm text-gray-600 mb-1">{children}</Text>
);

const Input = (props: React.ComponentProps<typeof TextInput>) => (
  <TextInput
    {...props}
    className={`h-10 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-800 ${
      props.multiline ? 'h-24 py-2' : ''
    }`}
    placeholderTextColor="#bfbfbf"
    style={Platform.OS === 'web' ? { outline: 'none' } : undefined}
  />
);

const UploadField = ({
  label,
  value,
  onPick,
}: {
  label: string;
  value?: string;
  onPick?: () => void;
}) => (
  <View className="mb-4">
    <Label>{label}</Label>
    <View className="flex-row items-center">
      <Input editable={false} value={value} placeholder="/images/appicon.png" className="flex-1" />
      <TouchableOpacity
        onPress={onPick}
        className="ml-2 w-10 h-10 border border-gray-200 rounded-md items-center justify-center"
      >
        <Feather name="upload" size={16} color="#6b7280" />
      </TouchableOpacity>
    </View>
  </View>
);

const Section = ({
  title,
  icon = 'settings',
  children,
  defaultOpen = true,
  onLayout,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onLayout?: (y: number) => void;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View
      className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden"
      onLayout={(e) => onLayout?.(e.nativeEvent.layout.y)}
    >
      <TouchableOpacity
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.9}
        className="flex-row items-center justify-between px-4 py-3"
      >
        <View className="flex-row items-center">
          <Feather name={icon as any} size={16} color="#6b7280" />
          <Text className="ml-2 font-semibold text-gray-800">{title}</Text>
        </View>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#6b7280" />
      </TouchableOpacity>
      {open && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
};

type EmailChip = { id: string; value: string };

/* ---------- screen ---------- */
export default function CreateAppScreen({ navigation }: any) {
  // anchor refs for quick nav
  const scrollRef = useRef<ScrollView>(null);
  const yWorkplace = useRef(0);
  const yServer = useRef(0);

  // form states
  const [appName, setAppName] = useState('');
  const [appCode, setAppCode] = useState('');
  const [appDesc, setAppDesc] = useState('');
  const [shortName, setShortName] = useState('');
  const [logoPath, setLogoPath] = useState('');
  const [faviconPath, setFaviconPath] = useState('');

  const [workplace, setWorkplace] = useState('');

  const [serverOn, setServerOn] = useState(true);
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<EmailChip[]>([{ id: '1', value: 'chungnt@fpt.com.vn' }]);

  const addEmail = () => {
    const v = emailInput.trim();
    if (!v) return;
    setEmails((s) => [...s, { id: String(Date.now()), value: v }]);
    setEmailInput('');
  };
  const removeEmail = (id: string) => setEmails((s) => s.filter((x) => x.id !== id));

  const onSave = () => {
    const payload = {
      app: { appName, appCode, appDesc, shortName, logoPath, faviconPath },
      workplace: { value: workplace },
      emailServer: { serverOn, ip, port, service, username, password, emails: emails.map((e) => e.value) },
    };
    console.log('SAVE', payload);
    // TODO: gọi API của bạn tại đây
  };

  const onReset = () => {
    setAppName('');
    setAppCode('');
    setAppDesc('');
    setShortName('');
    setLogoPath('');
    setFaviconPath('');
    setWorkplace('');
    setServerOn(true);
    setIp('');
    setPort('');
    setService('');
    setUsername('');
    setPassword('');
    setEmailInput('');
    setEmails([{ id: '1', value: 'chungnt@fpt.com.vn' }]);
  };

  const goToY = (y: number) => scrollRef.current?.scrollTo({ y, animated: true });
  const onScroll = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {};

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TopHeader
        activeTab="ePush"
        showBack
        breadcrumbs={[
          { label: 'ePush', onPress: () => navigation.navigate('Home') },
          { label: 'Tạo mới ứng dụng' },
        ]}
      />

      <ScrollView ref={scrollRef} onScroll={onScroll} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* container middle */}
        <View className="w-full self-center px-4 md:px-6" style={{ maxWidth: 1120 }}>
          {/* card wrapper */}
          <View className="bg-white rounded-xl border border-gray-200 mt-4 overflow-hidden">
            {/* title + quick nav */}
            <View className="px-4 md:px-6 py-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800 ">Tạo mới ứng dụng</Text>

              <View className="flex-row mt-3">
                <TouchableOpacity
                  onPress={() => goToY(yWorkplace.current)}
                  className="mr-2 bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-full px-3 py-1.5"
                >
                  <Text className="text-xs text-cyan-700">Thiết lập Workplace</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => goToY(yServer.current)}
                  className="bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-full px-3 py-1.5"
                >
                  <Text className="text-xs text-cyan-700">Thiết lập Server Email</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* body */}
            <View className="px-4 md:px-6 py-5">
              {/* 1) Thiết lập ứng dụng */}
              <Section title="Thiết lập ứng dụng" icon="settings" defaultOpen>
                <View className="mb-4">
                  <Label>Tên ứng dụng</Label>
                  <Input value={appName} onChangeText={setAppName} placeholder="Ví dụ: ePush" />
                </View>

                <View className="mb-4">
                  <Label>Mã số</Label>
                  <Input value={appCode} onChangeText={setAppCode} placeholder="Nhập mã số" />
                </View>

                <View className="mb-4">
                  <Label>Mô tả</Label>
                  <Input
                    value={appDesc}
                    onChangeText={setAppDesc}
                    placeholder="Mô tả ứng dụng"
                    multiline
                  />
                </View>

                <UploadField label="Tải ảnh ứng dụng (logo)" value={logoPath} onPick={() => setLogoPath('/images/appicon.png')} />
                <UploadField label="Favicon" value={faviconPath} onPick={() => setFaviconPath('/images/favicon.png')} />

                <View>
                  <Label>Tên viết tắt</Label>
                  <Input value={shortName} onChangeText={setShortName} placeholder="VD: eP" />
                </View>
              </Section>

              {/* 2) Thiết lập Workplace */}
              <Section
                title="Thiết lập Workplace"
                icon="briefcase"
                defaultOpen
                onLayout={(y) => (yWorkplace.current = y)}
              >
                <Label>Outlook Workplace</Label>
                <Input value={workplace} onChangeText={setWorkplace} placeholder="Nhập workplace" />
              </Section>

              {/* 3) Thiết lập server email */}
              <Section
                title="Thiết lập server email"
                icon="mail"
                defaultOpen
                onLayout={(y) => (yServer.current = y)}
              >
                <View className="flex-row items-center mb-3">
                  <Text className="text-gray-700 mr-3">Bật</Text>
                  <Switch value={serverOn} onValueChange={setServerOn} />
                </View>

                <View className="mb-4">
                  <Label>IP</Label>
                  <Input value={ip} onChangeText={setIp} placeholder="2.1.1.2" />
                </View>

                <View className="mb-4">
                  <Label>Port</Label>
                  <Input value={port} onChangeText={setPort} placeholder="21" />
                </View>

                <View className="mb-4">
                  <Label>Tên dịch vụ</Label>
                  <Input value={service} onChangeText={setService} placeholder="service-name" />
                </View>

                {/* email chips */}
                <View className="mb-4">
                  <Label>Emails nhận</Label>

                  <View className="flex-row flex-wrap mb-2">
                    {emails.map((e) => (
                      <View
                        key={e.id}
                        className="flex-row items-center bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2"
                      >
                        <Text className="text-xs text-gray-700 mr-1">{e.value}</Text>
                        <TouchableOpacity onPress={() => removeEmail(e.id)}>
                          <Feather name="x" size={12} color="#6b7280" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row">
                    <Input
                      value={emailInput}
                      onChangeText={setEmailInput}
                      placeholder="nhập email..."
                      className="flex-1"
                    />
                    <TouchableOpacity
                      onPress={addEmail}
                      className="ml-2 h-10 px-3 rounded-md bg-gray-100 border border-gray-200 items-center justify-center"
                    >
                      <Text className="text-sm text-gray-700">+ Thêm email</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="mb-4">
                  <Label>Username</Label>
                  <Input value={username} onChangeText={setUsername} placeholder="username" />
                </View>

                <View>
                  <Label>Password</Label>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                </View>
              </Section>

              {/* footer buttons */}
              <View className="flex-row justify-end items-center mt-4">
                <TouchableOpacity
                  onPress={onReset}
                  className="h-10 px-4 rounded-md bg-gray-100 border border-gray-200 items-center justify-center mr-2"
                >
                  <Text className="text-sm text-gray-700">Đặt lại</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onSave}
                  className="h-10 px-4 rounded-md bg-cyan-500 items-center justify-center"
                >
                  <Text className="text-sm text-white font-medium">Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
