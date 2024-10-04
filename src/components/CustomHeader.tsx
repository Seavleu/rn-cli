import React, { useState, useRef } from 'react';
import { View, Text, Animated, ScrollView, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'; 
import { TouchCircle, TouchRect } from './Touch'; 
import useTheme from '@/theme/hooks';

const CustomHeader = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<AppStackNavigatorProps>();
  const [dropdownHeight] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const logoImgSrc = 
    theme === 'dark'
      ? require('@assets/images/logo_dark.png')
      : require('@assets/images/logo_light.png');

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropdownHeight, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: '전력계통도 - History', route: 'History', submenu: ['Submenu 1', 'Submenu 2'] },
    { label: '전력발전 - Elec', route: 'History', submenu: ['Submenu 1', 'Submenu 2'] },
    { label: '전력저장 - Detail', route: 'Detail', params: { id: 1 }, submenu: ['Submenu A', 'Submenu B'] },
    { label: '전력송전 - AddBoard', route: 'AddBoard', params: { data: {} }, submenu: [] },
    { label: '장치관리 - UserInfo', route: 'UserInfo', submenu: ['User 1', 'User 2'] },
    { label: '이상징후 - Error', route: 'Error', submenu: [] },
    { label: '보고서 - AlarmHistory', route: 'AlarmHistory', submenu: [] },
    { label: '설정 - Setting', route: 'Setting', submenu: ['장비알람설정', '알림수신자설정', '담당자설정', '로그아웃' ] },
  ];

  // To store animated values for each menu item
  const animatedHeights = useRef(menuItems.map(() => new Animated.Value(0))).current;
  const animatedRotations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  const toggleExpandItem = (index: number) => {
    if (expandedItems.includes(index)) {
      // Collapse submenu
      Animated.timing(animatedHeights[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(animatedRotations[index], {
        toValue: 0, 
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      Animated.timing(animatedHeights[index], {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(animatedRotations[index], {
        toValue: 1, 
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedItems([...expandedItems, index]);
    }
  };

  const rotateAnimation = (index: number) => {
    return animatedRotations[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  return (
    <View style={{ backgroundColor: '#162E72', width: '100%', position: 'relative', zIndex: 1000 }}>
      {/* Header */}
      <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, zIndex: 1000 }}>
        <Image source={logoImgSrc} style={{ width: 140, height: 24 }} /> 
        <TouchCircle onPress={toggleDropdown}>
          <Icon name={isOpen ? 'close' : 'menu'} size={28} color="white" />
        </TouchCircle>
      </View>

      {/* Dropdown Menu */}
      <Animated.View style={{ position: 'absolute', top: 70, left: 0, right: 0, zIndex: 999, backgroundColor: '#002D70', overflow: 'hidden', height: dropdownHeight }}>
        {isOpen && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <View key={index}>
                <TouchRect style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 }} onPress={() => toggleExpandItem(index)}>
                  <Text style={{ color: 'white', fontSize: 18 }}>{item.label}</Text>
                  <Animated.View style={{ transform: [{ rotate: rotateAnimation(index) }] }}>
                    <Icon name="chevron-down" size={20} color="white" />
                  </Animated.View>
                </TouchRect>

                {/* Submenu */}
                <Animated.View style={{ overflow: 'hidden', backgroundColor: '#003B89', paddingLeft: 40, height: animatedHeights[index] }}>
                  {item.submenu.length > 0 && item.submenu.map((submenuItem, subIndex) => (
                    <TouchRect key={subIndex} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                      <Text style={{ color: 'lightgray', fontSize: 16 }}>{submenuItem}</Text>
                    </TouchRect>
                  ))}
                </Animated.View>
              </View>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

export default CustomHeader;
