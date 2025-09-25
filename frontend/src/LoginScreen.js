// src/LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Platform,
  Alert, // Sử dụng Alert cho đơn giản trên mobile
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fptLogo = require('../assets/images/fpt.png');
const illustration = require('../assets/images/epush.png');

const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = '123456';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      console.log('Đăng nhập thành công!');
      setError(''); 
      navigation.replace('Home'); 
    } else {
      console.log('Đăng nhập thất bại!');
      setError('Tên đăng nhập hoặc mật khẩu không đúng.'); 
    }
  };
  
  const handleInputChange = (setter, value) => {
    setter(value);
    if (error) {
        setError(''); 
    }
  };


  const handleSsoLogin = () => {
    console.log('Đăng nhập qua SSO');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
          {isLargeScreen && (
            <View style={styles.illustrationContainer}>
              <Image source={illustration} style={styles.illustration} resizeMode="contain" />
            </View>
          )}

          <View style={styles.formWrapper}>
            {!isLargeScreen && (
              <Image source={illustration} style={styles.illustrationMobile} resizeMode="contain" />
            )}
            
            <View style={styles.formContainer}>
              <Image source={fptLogo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.title}>Đăng nhập vào hệ thống ePush</Text>

              <Text style={styles.label}>Tên đăng nhập</Text>
              <TextInput
                style={[styles.input, Platform.OS === 'web' && styles.webNoOutline]}
                value={username}
                onChangeText={(text) => handleInputChange(setUsername, text)}
                placeholder="Nhập tên đăng nhập"
                placeholderTextColor={'#999'}
                autoCapitalize="none"
              />

              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, Platform.OS === 'web' && styles.webNoOutline]}
                  value={password}
                  onChangeText={(text) => handleInputChange(setPassword, text)}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={'#999'}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
              </View>

              {/* --- 4. HIỂN THỊ THÔNG BÁO LỖI --- */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>hoặc đăng nhập bằng</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.ssoButton} onPress={handleSsoLogin}>
                <Ionicons name="keypad-outline" size={20} color="#333" style={{ marginRight: 8 }} />
                <Text style={styles.ssoButtonText}>Đăng nhập qua SSO</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </ScrollView>
      <Text style={styles.footerText}>Phiên bản: 1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLarge: { flexDirection: 'row', justifyContent: 'space-around', padding: 50 },
  illustrationContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 40 },
  illustration: { width: '100%', height: 400 },
  illustrationMobile: { width: '80%', height: 200, marginBottom: 20, alignSelf: 'center' },
  formWrapper: { flex: 1, width: '100%', maxWidth: 400, justifyContent: 'center' },
  formContainer: { width: '100%' },

  logo: { width: 150, height: 60, alignSelf: 'center', marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#808080',
  },

  label: { fontSize: 14, color: '#666', marginBottom: 8 },

  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  passwordInput: { flex: 1, height: 50 },
  
  webNoOutline: {
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
    boxShadow: 'none',
  },

  // THÊM STYLE CHO VĂN BẢN LỖI
  errorText: {
    color: '#D32F2F', // Màu đỏ đậm
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: '#00ACC1',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    // Bỏ marginBottom để errorText có thể đẩy nó xuống
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  separatorText: { marginHorizontal: 10, color: '#aaa', fontSize: 12 },

  ssoButton: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ssoButtonText: { color: '#333', fontSize: 16, fontWeight: '500' },

  footerText: { textAlign: 'center', color: '#aaa', paddingBottom: 20, fontSize: 12 },
});