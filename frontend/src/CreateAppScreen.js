// src/CreateAppScreen.js
import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopHeader from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ---------- Component con ---------- */

const PillButton = ({ active, onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.pill, active && styles.pillActive]}
    activeOpacity={0.9}
  >
    <Icon
      name={active ? 'minus' : 'plus'}
      size={14}
      color={active ? '#fff' : '#334155'}
      style={{ marginRight: 8 }}
    />
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text>
  </TouchableOpacity>
);

const Section = ({ title, open, onToggle, children, icon, isLast = false }) => (
  <View style={[styles.section, isLast && styles.sectionLast]}>
    <TouchableOpacity onPress={onToggle} style={styles.sectionHead} activeOpacity={0.9}>
      <View style={styles.sectionHeadLeft}>
        {icon && <Icon name={icon} size={16} color="#00A2B9" style={{ marginRight: 8 }} />}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#4b5563" />
    </TouchableOpacity>
    {open && <View style={styles.sectionBody}>{children}</View>}
  </View>
);

const UploadField = ({ placeholder = 'Chọn tệp…', value, onChange }) => {
  const inputRef = useRef(null);
  const openPicker = () => {
    if (Platform.OS === 'web' && inputRef.current) {
      inputRef.current.click();
    } else {
      alert('Chức năng upload chỉ hỗ trợ trên web trong bản demo này.');
    }
  };
  const onFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) onChange?.(file);
  };
  return (
    <View style={styles.uploadWrap}>
      {Platform.OS === 'web' && (
        <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={onFileChange} />
      )}
      <TextInput
        editable={false}
        style={[styles.input, { flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor="#9aa4b2"
        value={value ? (value.name || String(value)) : ''}
      />
      <TouchableOpacity onPress={openPicker} style={styles.uploadBtn} activeOpacity={0.9}>
        <Icon name="upload" size={16} color="#334155" />
      </TouchableOpacity>
    </View>
  );
};

/* ---------- Màn hình chính ---------- */
export default function CreateAppScreen() {
  const [appName, setAppName] = useState('2.1');
  const [desc, setDesc] = useState('');
  const [appImage, setAppImage] = useState(null);
  const [serviceFile, setServiceFile] = useState(null);
  const [openWorkplace, setOpenWorkplace] = useState(false);
  const [openEmail, setOpenEmail] = useState(true);
  const [workspace, setWorkspace] = useState('2.1');
  const [ip, setIp] = useState('2.1.1.2');
  const [port, setPort] = useState('2.1');
  const [senderName, setSenderName] = useState('conchimnon');
  const [senderEmail, setSenderEmail] = useState('ChungTa@fpt.com.vn');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSave = () => console.log('Saving...');
  const onReset = () => console.log('Resetting...');

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopHeader activeTab="ePush" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.container}>
          {/* Breadcrumbs */}
          <View style={styles.breadcrumbsContainer}>
            <Text style={styles.breadcrumbText}>ePush</Text>
            <Text style={styles.breadcrumbSeparator}>&gt;</Text>
           
            <Text style={styles.breadcrumbTextActive}>Tạo mới ứng dụng</Text>
          </View>
          
          {/* Card chính */}
          <View style={styles.card}>
            <Text style={styles.h1}>Tạo mới ứng dụng</Text>
            <View style={styles.pillsRow}>
              <PillButton active={openWorkplace} onPress={() => setOpenWorkplace((v) => !v)}>
                Thiết lập Workplace
              </PillButton>
              <PillButton active={openEmail} onPress={() => setOpenEmail((v) => !v)}>
                Thiết lập Server Email
              </PillButton>
            </View>

            <Section title="Thiết lập ứng dụng" open={true} onToggle={() => {}}>
              <Text style={styles.label}>Tên ứng dụng</Text>
              <TextInput style={styles.input} value={appName} onChangeText={setAppName} />
              <Text style={styles.label}>Mô tả</Text>
              <TextInput style={[styles.input, styles.textarea]} value={desc} onChangeText={setDesc} multiline placeholder="Nhập tại đây" />
              <Text style={styles.label}>Tải ảnh ứng dụng lên đây</Text>
              <UploadField value={appImage} onChange={setAppImage} placeholder="/images/application.svg" />
              <Text style={styles.label}>File dịch vụ</Text>
              <UploadField value={serviceFile} onChange={setServiceFile} placeholder="Tải file dịch vụ ở đây" />
            </Section>

            <Section title="Thiết lập Workplace" open={openWorkplace} onToggle={() => setOpenWorkplace((v) => !v)} icon="slack">
              <Text style={styles.label}>Chatbot Workplace</Text>
              <TextInput style={styles.input} value={workspace} onChangeText={setWorkspace} />
            </Section>

            <Section title="Thiết lập server email" open={openEmail} onToggle={() => setOpenEmail((v) => !v)} icon="mail" isLast={true}>
              <Text style={styles.label}>IP</Text>
              <TextInput style={styles.input} value={ip} onChangeText={setIp} />
              <Text style={styles.label}>Port</Text>
              <TextInput style={styles.input} value={port} onChangeText={setPort} />
              <Text style={styles.label}>Tên</Text>
              <TextInput style={styles.input} value={senderName} onChangeText={setSenderName} />
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailFieldWrap}>
                <TextInput style={[styles.input, { flex: 1 }]} value={senderEmail} onChangeText={setSenderEmail} />
                <TouchableOpacity style={styles.addMailBtn}>
                  <Text style={styles.addMailText}>+ Thêm email</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Username</Text>
              <TextInput style={styles.input} value={username} onChangeText={setUsername} />
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            </Section>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
                <Text style={styles.resetText}>Đặt lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                <Text style={styles.saveText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Stylesheet ---------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  page: { padding: 24, alignItems: 'center' },
  container: { width: '100%', maxWidth: 960 }, // 960px là một giá trị tốt cho max-w-4xl
  
  breadcrumbsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  breadcrumbText: { fontSize: 14, color: '#0891b2' }, // cyan-600
  breadcrumbSeparator: { fontSize: 14, color: '#64748b', marginHorizontal: 8 }, // slate-500
  breadcrumbTextActive: { fontSize: 14, color: '#334155', fontWeight: '600' }, // slate-700

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  
  h1: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 8 }, // slate-800
  
  pillsRow: { flexDirection: 'row', gap: 10, marginBottom: 12, flexWrap: 'wrap' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#0891b2', borderColor: '#0891b2' },
  pillText: { color: '#334155', fontWeight: '600' },
  pillTextActive: { color: '#fff' },

  section: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionLast: { borderBottomWidth: 0 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeadLeft: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
  sectionBody: { paddingTop: 16 },

  label: { fontSize: 12, color: '#6b7280', marginTop: 12, marginBottom: 6 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cbd5e1', // slate-300
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#111827',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  textarea: { height: 96, textAlignVertical: 'top', paddingTop: 10 },
  
  uploadWrap: { flexDirection: 'row', alignItems: 'center' },
  uploadBtn: {
    marginLeft: 8,
    height: 40,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  
  emailFieldWrap: { flexDirection: 'row', gap: 8 },
  addMailBtn: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f9ff', // cyan-50
    borderWidth: 1,
    borderColor: '#bae6fd', // cyan-200
    justifyContent: 'center',
  },
  addMailText: { color: '#0891b2', fontWeight: '600' },

  footer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 24 },
  resetBtn: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  resetText: { color: '#475569', fontWeight: '600' },
  saveBtn: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A2B9',
  },
  saveText: { color: '#fff', fontWeight: '700' },
});