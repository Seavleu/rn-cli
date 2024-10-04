import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'; 
import { TouchCircle, TouchRect } from './Touch';

const CustomHeader = () => {
  const navigation = useNavigation<AppStackNavigatorProps>();  
  const [dropdownHeight] = useState(new Animated.Value(0));  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) { 
      Animated.timing(dropdownHeight, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else { 
      Animated.timing(dropdownHeight, {
        toValue: Dimensions.get('window').height, // Set to full screen height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Sun-Q
        </Text>
        <TouchCircle onPress={toggleDropdown}>
          <Icon name={isOpen ? 'close' : 'menu'} size={28} color="white" />
        </TouchCircle>
      </View>

      {/* Dropdown Menu */}
      <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
        {isOpen && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('History')}>
              <Icon name="analytics-outline" size={20} color="white" />
              <Text style={styles.menuText}>전력계통도 History</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('Detail', {id:1})}>
              <Icon name="archive-outline" size={20} color="white" />
              <Text style={styles.menuText}>전력저장 Detail</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('AddBoard', {data: {}})}>
              <Icon name="construct-outline" size={20} color="white" />
              <Text style={styles.menuText}>전력발전 AddBoard</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('UserInfo')}>
              <Icon name="paper-plane-outline" size={20} color="white" />
              <Text style={styles.menuText}>전력송전 UserInfo</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('Error')}>
              <Icon name="warning-outline" size={20} color="white" />
              <Text style={styles.menuText}>이상징후 Error</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('AlarmHistory')}>
              <Icon name="document-outline" size={20} color="white" />
              <Text style={styles.menuText}>보고서 AlarmHistory</Text>
            </TouchRect>
            <TouchRect style={styles.menuItem} onPress={() => navigation.navigate('Setting')}>
              <Icon name="settings-outline" size={20} color="white" />
              <Text style={styles.menuText}>설정 Setting</Text> 
            </TouchRect>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#162E72',
    width: '100%',
    position: 'relative',
    zIndex: 1000, 
  },
  header: {
    height: 70, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
  }, 
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute', 
    top: 70,  // Push it below the header
    left: 0,
    right: 0,
    zIndex: 999,  // Ensure it's above other components
    backgroundColor: '#002D70',
    overflow: 'hidden',  // Hide contents while collapsing
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CustomHeader;
