import React, { useState, useRef } from 'react';
import { Animated, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'; 
import { TouchCircle, TouchRect } from './Touch'; 
import useTheme from '@/theme/hooks';
import { RNText, RNView } from './Custom';

const CustomHeader = () => {
  const { theme, colors, layout, spacing, components, fonts } = useTheme();
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
    { label: '전력계통도 - Power System', route: 'History'},
    { label: '전력발전 - Power Generation', route: 'History', submenu: ['생산전력량', '무효전력량','기상관측','발전량예측'] },
    { label: '전력저장 - Power Storage', route: 'Detail', params: { id: 1 }, submenu: ['전력입력','전력출력','전력충전','전력방전'] },
    { label: '전력송전 - Power Transmission', route: 'AddBoard', params: { data: {} }, submenu: ['SMP판매','REC판매','SMP/REC 동향'] },
    { label: '전력관리 - Power Management', route: 'Error', submenu: [] },
    { label: '장치관리 - Device Management', route: 'UserInfo', submenu: ['장치 현황', '문제알람 이력', '문제조치', '정기점검'] },
    { label: '이상징후 - Anomalies', route: 'Error'},
    { label: '보고서 - Report', route: 'AlarmHistory'},
    { label: '설정 - Setting', route: 'Setting', submenu: ['장비알람설정', '알림수신자설정', '담당자설정', '로그아웃' ] },
  ];

  const animatedHeights = useRef(menuItems.map(() => new Animated.Value(0))).current;
  const animatedRotations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  const toggleExpandItem = (index: number) => {
    if (expandedItems.includes(index)) { 
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
      // Expand submenu
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
    <RNView style={[colors.background, layout.relative, { width: '100%', zIndex: 1000 }]}> 
      <RNView style={[layout.row, layout.justifyBetween, layout.alignCenter, spacing.p_20, { height: 70, zIndex: 1000 }]}>
        <Image source={logoImgSrc} style={{ width: 140, height: 24 }} /> 
        <TouchCircle onPress={toggleDropdown}>
          <Icon name={isOpen ? 'close' : 'menu'} size={28} color="white" />
        </TouchCircle>
      </RNView>

      <Animated.View style={[layout.absolute, {top: 70, left: 0, right: 0, zIndex: 999, backgroundColor: '#002D70', overflow: 'hidden', height: dropdownHeight }]}>
        {isOpen && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <RNView key={index}>
                <TouchRect
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    backgroundColor: expandedItems.includes(index) ? '#002D70' : 'transparent',
                  }}
                  onPress={() => toggleExpandItem(index)}
                >
                  <RNText style={{ color: expandedItems.includes(index) ? '#F33028' : 'white', fontSize: 18 }}>{item.label}</RNText> 
                  {item.submenu && item.submenu.length > 0 && (
                    <Animated.View style={{ transform: [{ rotate: rotateAnimation(index) }] }}>
                      <Icon name="chevron-down" size={20} color="white" />
                    </Animated.View>
                  )}
                </TouchRect> 
                
                {item.submenu && item.submenu.length > 0 && (
                  <Animated.View style={[spacing.pl_40, {  backgroundColor: '#002D70', height: animatedHeights[index] }]}>
                    {item.submenu.map((submenuItem, subIndex) => (
                      <TouchableOpacity key={subIndex} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                        <RNText style={[fonts.size_16, { color: 'lightgray' }]}>{submenuItem}</RNText>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </RNView>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    </RNView>
  );
};

export default CustomHeader;
