import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { ErrorFix, Inspection } from '@/components/HistoryList';

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
  const [searchQuery, setSearchQuery] = useState(''); // Separate state for input
  const [searchData, setSearchData] = useState({
    query_search: 'title', // Default search type
    query_value: '', // User input for search
  });

  const { category, setCategory } = useCategoryStore();
  const { userInfo } = useUserStore();

  const plantSeq = userInfo?.plant_seq || ''; // Fallback if userInfo is null or undefined

  // Build query string
  const queryString = `plant_seq=${plantSeq}&query_search=${searchData.query_search}&query_value=${searchData.query_value}&page=${page}`;
  
  // Log the query string to debug
  console.log('Query String:', queryString);

  const { data, isLoading, mutate } = useSWR(
    `/api/device/${category}/list?${queryString}`,
    fetcher
  );

  useEffect(() => {
    console.log('Fetched Data:', data);
  }, [data]);

  // Fetch more data on scroll
  const getMoreData = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      await mutate();
      setLoadingMore(false);
    }
  };

  // Fetch data initially or when category changes
  const getData = async () => {
    setPage(1); // Reset the page when re-fetching the entire dataset
    await mutate();
  };

  const onPressCategory = (category: string) => {
    setModalVisible(false);
    setCategory(category);
  };

  const performSearch = () => {
    console.log("Search initiated with query value: ", searchQuery); // Debug the search value
    setSearchData((prev) => ({ ...prev, query_value: searchQuery }));
    setSearchPerformed(true);
    getData();
  };

  const clearSearch = () => {
    setSearchQuery(''); // Clear the input field separately
    setSearchData({ query_search: 'title', query_value: '' });
    setSearchPerformed(false);
    setPage(1);
    getData();
  };

  const SearchBox = useMemo(() => {
    return (
      <View style={[layout.col, spacing.p_14, spacing.mt_14]}> 
        <View style={[layout.row, layout.alignCenter, spacing.gap_14]}>
          <View>
            <RNText style={[fonts.size_14]}></RNText>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.text,
                borderRadius: 8,
                height: 50,
                justifyContent: 'center', 
                width: 120
              }}
            >
              <Picker
                selectedValue={searchData.query_search}
                onValueChange={(itemValue) =>
                  setSearchData((prev) => ({
                    ...prev,
                    query_search: itemValue,
                  }))
                }
              >
                <Picker.Item label="제목" value="title" />
                <Picker.Item label="내용" value="content" />
              </Picker>
            </View>
          </View>

          <View style={[layout.flex_1]}>
            <RNText style={[fonts.size_14]}>
              {searchData.query_search === 'title' }
            </RNText>
            <TextInput
              style={[
                components.input,
                { borderColor: colors.text, borderWidth: 1, borderRadius: 8 },
                spacing.pl_10,
              ]}
              placeholder={
                searchData.query_search === 'title' ? '제목 검색' : '내용 검색'
              }
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)} // Only update input state
            />
          </View>
        </View>

        {/* Search Button */}
        <View style={[layout.row, spacing.mt_14]}>
          <TouchableOpacity
            onPress={performSearch}
            style={[
              layout.flex_1,
              layout.alignCenter,
              layout.justifyCenter,
              {
                borderWidth: 1,
                borderColor: colors.text,
                borderRadius: 10,
                paddingVertical: 10,
              },
            ]}
          >
            <RNText style={[fonts.w700]}>검색</RNText>
          </TouchableOpacity>

          {/* Clear Search Button - only visible after search is performed */}
          {searchPerformed && (
            <TouchableOpacity
              onPress={clearSearch}
              style={[
                layout.flex_1,
                layout.alignCenter,
                layout.justifyCenter,
                {
                  marginLeft: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  paddingVertical: 10,
                },
              ]}
            >
              <RNText style={[fonts.w700, { color: '#fff' }]}>검색 초기화</RNText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, [searchData, searchQuery]);

  const searchNotFound = () => {
    return (
      <RNView
        style={[
          layout.alignCenter,
          layout.justifyCenter,
          { height: 200 }, 
        ]}
      >
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
        style={[
          components.header,
          { borderBottomWidth: 1, borderColor: colors.rgba010 },
        ]}
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
          <TouchCircle
            style={[spacing.p_4]}
            onPress={() => setModalVisible(true)}
          >
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
          ListHeaderComponent={SearchBox}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await mutate();
                setRefreshing(false);
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
