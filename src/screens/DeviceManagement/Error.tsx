import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNText, RNView } from '@/components/Custom';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import { AppStackNavigatorProps } from '@/navigation/AppNavigator';
import { fetcher } from '@/services';
import { useUserStore } from '@/stores';
import { useCategoryStore } from '@/stores/category';
import useTheme from '@/theme/hooks';
import useSWR from 'swr';
import CustomModal from '@/components/CustomModal';
import { ErrorFix, Inspection } from '@/components/HistoryList';
import SearchBox from './Search';

type HistoryProps = {
  navigation: AppStackNavigatorProps;
};

const Error = ({ navigation }: HistoryProps) => {
  const { layout, fonts, colors, components, spacing } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState({
    query_search: 'title',  
    query_value: '', 
  });

  const { category, setCategory } = useCategoryStore();
  const { userInfo } = useUserStore();

  const plantSeq = userInfo?.plant_seq;

  const queryString = `plant_seq=${plantSeq}&query_search=${searchData.query_search}&query_value=${searchData.query_value}&page=${page}`;
  const { data, isLoading, mutate } = useSWR(
    `/api/device/${category}/list?${queryString}`,
    fetcher
  );
  const getMoreData = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      await mutate();
      setLoadingMore(false);
    }
  };

  // Fetch data when switching categories or performing search
  const getData = async () => {
    setPage(1); // Reset page when re-fetching
    await mutate();
  };

  const onPressCategory = (newCategory: string) => {
    setModalVisible(false);
    if (newCategory !== category) {
      // Reset search when switching categories
      setSearchQuery('');
      setSearchData({ query_search: 'title', query_value: '' });
      setSearchPerformed(false);
      setCategory(newCategory);
      getData();
    }
  };
 
  const performSearch = () => {
    if (searchQuery.length < 2) {
      Alert.alert("알림", "검색어를 최소 2자 이상 입력해 주세요.");
      return;
    }
    setSearchData((prev) => ({ ...prev, query_value: searchQuery }));
    setSearchPerformed(true);
    getData();
  };
 
  const clearSearch = () => {
    setSearchQuery('');
    setSearchData({ query_search: 'title', query_value: '' });
    setSearchPerformed(false);
    setPage(1);
    getData();
  };
 
  const searchNotFound = () => {
    return (
      <RNView style={[layout.alignCenter, layout.justifyCenter, { height: 200 }]}>
        <RNText style={[fonts.size_16, fonts.w500, { color: colors.text }]}>
          검색 결과가 없습니다.
        </RNText>
      </RNView>
    );
  };
  if (isLoading && !data) {
    return (
      <RNView
        style={[
          layout.fullHeight,
          layout.fullWidth,
          layout.alignCenter,
          layout.justifyCenter,
        ]}
      >
        <ActivityIndicator size={'large'} />
      </RNView>
    );
  }

  return (
    <SafeAreaScreen>
      <RNView
        style={[components.header, { borderBottomWidth: 1, borderColor: colors.rgba010 }]}
      >
        <TouchRect
          style={[layout.row, layout.alignCenter, spacing.gap_4, spacing.p_4]}
          onPress={() => setModalVisible(true)}
        >
          <RNText style={[fonts.w700, fonts.size_18]}>
            {category === 'inspection' ? '정기점검' : '문제조치'}
          </RNText>
          <Icon name="chevron-down" size={20} color={colors.text} />
        </TouchRect>
        <View style={[layout.row, layout.alignCenter, spacing.gap_6]}>
          <TouchCircle style={[spacing.p_4]} onPress={() => setModalVisible(true)}>
            <Icon name="search" size={25} color={colors.text} />
          </TouchCircle>
          <TouchCircle style={[spacing.p_4]}>
            <Icon
              name="person-circle"
              size={28}
              color={colors.text}
              onPress={() => navigation.navigate('UserInfo')}
            />
          </TouchCircle>
        </View>
      </RNView>

      {/* TODO: Find Undefined On the Combo box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          data={data?.data.list}
          keyExtractor={(item) =>
            category === 'inspection'
              ? item.inspection_seq.toString()
              : item.device_error_fix_seq.toString()
          }
          renderItem={({ item }) =>
            category === 'inspection' ? (
              <Inspection V={item} navigation={navigation} />
            ) : (
              <ErrorFix V={item} navigation={navigation} />
            )
          }
          ListHeaderComponent={
            <SearchBox 
              searchData={searchData}
              setSearchData={setSearchData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              performSearch={performSearch}
              clearSearch={clearSearch}
              searchPerformed={searchPerformed}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await mutate();
                setRefreshing(false)
              }}
              />
            }
            ListEmptyComponent={searchNotFound}
            contentContainerStyle={[spacing.p_14]}
          />
        </KeyboardAvoidingView>
        <TouchCircle
          onPress={() => navigation.navigate('AddBoard', { data: undefined })}
          style={[
            layout.absolute,
            spacing.p_10,
            { bottom: 40, right: 20, backgroundColor: colors.primary },
          ]}
        >
          <Icon name="add" size={40} color={'#fff'} />
        </TouchCircle>
  
        <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <RNView
            style={[
              layout.absolute,
              {
                width: 150,
                top: 85,
                left: 10,
                borderRadius: 10,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => onPressCategory('inspection')}
              style={[spacing.p_16]}
            >
              <RNText>정기점검</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressCategory('error_fix')}
              style={[spacing.p_16]}
            >
              <RNText>문제조치</RNText>
            </TouchableOpacity>
          </RNView>
        </CustomModal>
      </SafeAreaScreen>
    );
  };
  
  export default Error;
  
