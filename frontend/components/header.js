import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fptMini = require('../assets/images/fpt.png');

/**
 * @param {object} props 
 * @param {string} [props.activeTab='ePush'] 
 * @param {() => void} [props.onPressAccount] 
 * @param {() => void} [props.onPressLang] 
 */
export default function TopHeader({
  activeTab = 'ePush',
  onPressAccount,
  onNotifications,
  onPressLang,
}) {
  return (
    <View style={s.root}>
      <View style={s.left}>
        <Image source={fptMini} style={s.logo} resizeMode="contain" />
        <Text style={s.brand}>Information{'\n'}System</Text>
      </View>

      <View style={s.tabWrapper}>
        <Text style={s.tabActive}>{activeTab}</Text>
      </View>

      <View style={s.spacer} />

        <TouchableOpacity style={s.langSwitchTrack} onPress={onPressLang}>
          <View style={s.langSwitchThumb}>
             <Ionicons name="star" size={8} color="#FFFF00" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={s.accountBtn} onPress={onPressAccount}>
          <View style={s.avatarCircle}>
            <Ionicons name="image-outline" size={22} color="#a0aec0" />
          </View>
          <Text style={s.accountText}>Account</Text>
          <Ionicons name="chevron-down" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
  );
}

const s = StyleSheet.create({
  root: {
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 42,
    height: 34,
    marginRight: 12,
  },
  brand: {
    color: '#1268B1',
    fontSize: 9,
    lineHeight: 14,
    fontWeight: '600',
  },
  tabWrapper: {
    marginLeft: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A2B9',
    paddingBottom: 2,
    borderBottomWidth: 3,
    borderColor: '#00A2B9',
  },
  spacer: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24, 
  },

  iconButton: {
    position: 'relative',
  },
 
  
  langSwitchTrack: {
    width: 40,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#e2e8f0', 
    justifyContent: 'center',
    paddingHorizontal: 2, 
    marginRight: 16,
  },

  langSwitchThumb: {
    width: 20,
    height: 20,
    borderRadius: 13,
    backgroundColor: '#DA251D', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },


  accountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF2F5', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    marginLeft: 12, 
    marginRight: 6,
    color: '#2d3748', 
    fontSize: 16,
    fontWeight: '500',
  },
});