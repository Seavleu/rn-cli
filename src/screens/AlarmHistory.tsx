import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, LayoutAnimation, ActivityIndicator, Alert, FlatList } from 'react-native';
import DateRangePicker from '@/components/DateRangePicker';
import useTheme from '@/theme/hooks';
import moment from 'moment';
import { RNText, RNView } from '@/components/Custom';
import { returnToday } from '@/utils/format';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import { useUserStore } from '@/stores';
import { fetcher } from '@/services';
import Animated from 'react-native-reanimated';

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
  const [selectedDate, setSelectedDate] = useState<number>(1); // 1 for default 7 days, 2 for a month, 3 for custom
  const [dateRange, setDateRange] = useState<DateRange>({
    start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  });
  const [page, setPage] = useState<number>(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { userInfo } = useUserStore(); // User store
  const [deviceCheck, setDeviceCheck] = useState<boolean>(false);

  // Plant sequence ID
  const plantSeq = userInfo?.plant_seq;

  // Query string for API request
  const queryString = `plant_seq=${plantSeq}&start_date=${moment(dateRange.start).format('YYYYMMDD')}&end_date=${moment(dateRange.end).format('YYYYMMDD')}&page=${page}`;

  // Fetch data using SWR
  const { data: resData, error, isLoading, mutate } = useSWR<{ message: string, result: string, data: { list: AlarmHistoryData[] } }>(
    `/api/device/error/list?${queryString}`,
    fetcher
  );

  // Function to handle date range selection from DateRangePicker
  const onDateRangeSelected = (selectedRange: DateRange) => {
    setDateRange({
      start: selectedRange.start,
      end: selectedRange.end,
    });
    setPage(1);
    mutate(); // Refetch data
  };

  // Function to handle preset date ranges (7 days, 1 month, custom)
  const onSelectDateChange = (newValue: number) => {
    setSelectedDate(newValue);
    if (newValue === 1) {
      setDateRange({
        start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      });
    } else if (newValue === 2) {
      setDateRange({
        start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      });
    }
    setPage(1);
    mutate(); // Refetch data
  };

  // Handle expand/collapse of cards
  const togglePanel = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
  };

  // Device Check - if not mobile, show Excel Download button
  useEffect(() => {
    setDeviceCheck(userInfo?.device !== 'mobile');
  }, [userInfo]);

  // Function to render each card item
  const renderCard = ({ item, index }) => {
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
        {/* Container for the Title and Icon */}
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

  // Loading state
  if (isLoading && !resData) {
    return (
      <RNView style={[layout.alignCenter, layout.justifyCenter, { height: '100%' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </RNView>
    );
  }

  // Error state
  if (error) {
    return (
      <RNView style={[layout.alignCenter, layout.justifyCenter, { height: '100%' }]}>
        <RNText style={[fonts.size_18, fonts.w700, { color: 'red' }]}>Error fetching data</RNText>
      </RNView>
    );
  }

  // Render alarm history based on the API response
  return (
    <SafeAreaScreen>
      <RNView style={[components.header, { borderBottomWidth: 1, borderColor: colors.rgba010 }]}>
        <TouchRect style={[layout.row, layout.alignCenter, spacing.gap_4, spacing.p_4]}>
          <RNText style={[fonts.w700, fonts.size_18]}>Status</RNText>
          <Icon name="chevron-down" size={20} color={colors.text} />
        </TouchRect>
        <RNView>
          <TouchCircle style={[spacing.p_4]}>
            <Icon name="menu" size={25} color={colors.text} />
          </TouchCircle>
        </RNView>
      </RNView>

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

        {/* Render Cards */}
        <RNView style={[spacing.mt_10, spacing.p_10]}>
          <FlatList
            data={resData?.data?.list}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            // onEndReached={() => {
            //   setPage(prev => prev + 1);
            //   mutate();
            // }}
            // onEndReachedThreshold={0.5}
          />
        </RNView>
      </ScrollView>
    </SafeAreaScreen>
  );
};

export default AlarmHistory;
