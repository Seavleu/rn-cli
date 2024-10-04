import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, LayoutAnimation, ActivityIndicator, FlatList } from 'react-native';
import DateRangePicker from '@/components/DateRangePicker';
import useTheme from '@/theme/hooks';
import { format, subDays, subMonths } from 'date-fns';  
import { RNText, RNView } from '@/components/Custom';
import { returnToday } from '@/utils/format';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import { useUserStore } from '@/stores';
import { fetcher } from '@/services'; 
import CustomHeader from '@/components/CustomHeader';

type DateRange = {
  start: string;
  end: string;
};

type AlarmDetails = {
  error_name: string;
  error_message: string;
  error_type: string;
  reg_datetime: string;
};

type AlarmHistoryData = {
  [key: string]: AlarmDetails[];
};

const AlarmHistory = () => {
  const { layout, fonts, colors, spacing, components } = useTheme();
  const [selectedDate, setSelectedDate] = useState<number>(1);  
  const [dateRange, setDateRange] = useState<DateRange>({
    start: format(subDays(new Date(), 7),'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd'),
  });
  const [page, setPage] = useState<number>(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { userInfo } = useUserStore(); 

  // Generate query string with date-fns formatting
  const plantSeq = userInfo?.plant_seq;
  const queryString = `plant_seq=${plantSeq}&start_date=${format(new Date(dateRange.start), 'yyyyMMdd')}&end_date=${format(new Date(dateRange.end), 'yyyyMMdd')}&page=${page}`;
  
  // Fetch data with SWR
  const { data: resData, error, isLoading, mutate } = useSWR<{ message: string, result: string, data: { list: AlarmHistoryData[] } }>(
    `/api/device/error/list?${queryString}`,
    fetcher
  );

  const onDateRangeSelected = (selectedRange: DateRange) => {
    setDateRange({
      start: selectedRange.start,
      end: selectedRange.end,
    });
    setPage(1);
    mutate();  
  };

  const onSelectDateChange = (newValue: number) => {
    setSelectedDate(newValue);
    if (newValue === 1) {
      setDateRange({
        start: format(subDays(new Date(), 7), 'yyyy-MM-dd'),  
        end: format(new Date(), 'yyyy-MM-dd'),
      });
    } else if (newValue === 2) {
      setDateRange({
        start: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),  
        end: format(new Date(), 'yyyy-MM-dd'),
      });
    }
    setPage(1);
    mutate();
  }; 

  const togglePanel = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);  
  };

  const renderCard = ({ item, index }: { item: AlarmHistoryData; index: number }) => {
    const firstKey = Object.keys(item)[0];
    const alarms = item[firstKey];

    return (
      <TouchRect
        key={index}
        onPress={() => togglePanel(index)}
        style={[
          {
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 20,
            padding: 15,
            backgroundColor: expandedIndex === index ? '#fff' : colors.background,
          },
        ]}
      >
        <RNView style={[layout.row, layout.justifyBetween, layout.alignCenter]}>
          <RNText
            style={[
              fonts.size_16,
              fonts.w600,
              { color: expandedIndex === index ? '#666' : '#fff' },
            ]}
          >
            {firstKey} 문제알람 내용
          </RNText>
          <Icon
            name={expandedIndex === index ? "chevron-up" : "chevron-down"}
            size={20}
            color={expandedIndex === index ? '#666' : '#fff'}
          />
        </RNView>

        {expandedIndex === index && (
          <RNView style={{ marginTop: 10 }}>
            {alarms.map((alarm: AlarmDetails, idx: number) => (
              <RNView
                key={idx}
                style={[
                  layout.col,
                  spacing.p_10,
                  {
                    borderTopWidth: idx === 0 ? 0 : 1,
                    borderTopColor: '#ddd',
                    backgroundColor: '#fff',
                  },
                ]}
              >
                <RNText style={[fonts.size_14, fonts.w600, { marginBottom: 4, color: '#111' }]}>
                  • {alarm.error_name}
                </RNText>
                <RNText style={[fonts.size_14, { marginBottom: 8, color: '#111' }]}>
                  {alarm.error_message}
                </RNText>
                <RNView
                  style={[
                    layout.row,
                    layout.justifyBetween,
                    spacing.pt_4,
                    spacing.pb_4,
                    { backgroundColor: '#fff' },
                  ]}
                >
                  <RNText
                    style={[
                      fonts.w700,
                      fonts.size_18,
                      {
                        color: alarm.error_type === 'Warning' ? '#e83830' : '#111',
                      },
                    ]}
                  >
                    {alarm.error_type}
                  </RNText>
                  <RNText style={[fonts.size_14, { color: '#111' }]}>
                    {alarm.reg_datetime.slice(10, 19)}
                  </RNText>
                </RNView>
              </RNView>
            ))}
          </RNView>
        )}
      </TouchRect>
    );
  };

  if (isLoading && !resData) {
    return (
      <RNView style={[layout.alignCenter, layout.justifyCenter, { height: '100%' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </RNView>
    );
  }

  if (error) {
    return (
      <RNView style={[layout.alignCenter, layout.justifyCenter, { height: '100%' }]}>
        <RNText style={[fonts.size_18, fonts.w700, { color: 'red' }]}>Error fetching data</RNText>
      </RNView>
    );
  }

  return (
    <SafeAreaScreen>
      {/* <RNView style={[ components.header,{ borderBottomWidth: 1, borderColor: colors.rgba010 }]}> */}
        <CustomHeader/>
      {/* </RNView> */}

      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <RNView style={[spacing.p_10]}>
          <RNText style={[fonts.size_24, fonts.w700]}>문제알람 이력</RNText>
          <RNText style={[fonts.size_14, { color: "#FEC022" }]}>
            {returnToday()}{' '}
            <RNText style={[fonts.size_14]}>
              까지의 발전장치 문제알람 이력을 확인할 수 있습니다.
            </RNText>
          </RNText>
        </RNView>

        <DateRangePicker select_date={selectedDate} onDateRangeSelected={onDateRangeSelected} />

        <RNView style={[spacing.mt_10, spacing.p_10]}>
          <FlatList
            data={resData?.data?.list}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
          />
        </RNView>
      </ScrollView>
    </SafeAreaScreen>
  );
};

export default AlarmHistory;
