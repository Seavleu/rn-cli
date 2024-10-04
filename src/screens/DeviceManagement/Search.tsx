import React, { useMemo } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RNText } from '@/components/Custom';
import useTheme from '@/theme/hooks';

type SearchProps = {
  searchData: { query_search: string; query_value: string };
  setSearchData: (data: { query_search: string; query_value: string }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: () => void;
  clearSearch: () => void;
  searchPerformed: boolean;
};

const SearchBox = ({
  searchData,
  setSearchData,
  searchQuery,
  setSearchQuery,
  performSearch,
  clearSearch,
  searchPerformed,
}: SearchProps) => {
  const { layout, fonts, colors, components, spacing } = useTheme();

  return useMemo(() => {
    return (
      <View style={[layout.col, spacing.p_14, spacing.mt_14]}>
        {/* Picker and Input Row */}
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
                width: 120,
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
                <Picker.Item />
                <Picker.Item label="제목" value="title" />
                <Picker.Item label="내용" value="content" />
              </Picker>
            </View>
          </View>

          <View style={[layout.flex_1]}>
            <RNText style={[fonts.size_14]} />
            <TextInput
              style={[
                components.input,
                { borderColor: colors.text, borderWidth: 1, borderRadius: 8 },
                spacing.pl_10,
              ]}
              placeholder={
                searchData.query_search === 'title' ? '검색어를 입력해 주세요.' : '내용 검색'
              }
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>

        {/* Search Button */}
        <View style={[layout.row, spacing.mt_14]}>
          <TouchableOpacity
            onPress={performSearch}
            style={[layout.flex_1,layout.alignCenter,layout.justifyCenter,
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

          {/* Clear Search Button */}
          {searchPerformed && (
            <TouchableOpacity
              onPress={clearSearch}
              style={[layout.flex_1,layout.alignCenter,layout.justifyCenter,
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
};

export default SearchBox;
