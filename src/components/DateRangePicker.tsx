import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { RNView, RNText } from './Custom';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure this is installed or swap for another icon library
import useTheme from '@/theme/hooks';
import { TouchRect } from './Touch';

type DateRangePickerProps = {
  select_date: number;
  onDateRangeSelected: (selectedRange: { start: string; end: string }) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ select_date, onDateRangeSelected }) => {
  const { layout, fonts, colors, spacing } = useTheme();
  const [selectedRange, setSelectedRange] = useState<number>(select_date); // Use prop to initialize state
  const [startDate, setStartDate] = useState<string | null>(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string | null>(moment().format('YYYY-MM-DD'));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Effect to update date range based on selectedRange
  useEffect(() => {
    if (selectedRange === 1) {
      const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (selectedRange === 2) {
      const start = moment().subtract(1, 'month').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    }
  }, [selectedRange]);

  const handleRangeSelect = (range: number) => {
    setSelectedRange(range);
    if (range === 1) {
      const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (range === 2) {
      const start = moment().subtract(1, 'month').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (range === 3) {
      setShowStartPicker(true); // Open start date picker for custom range
    }
  };

  const onStartDateChange = (event: any, date?: Date) => {
    setShowStartPicker(false);
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setStartDate(formattedDate);
      setShowEndPicker(true); // Automatically open end date picker after selecting start
    }
  };

  const onEndDateChange = (event: any, date?: Date) => {
    setShowEndPicker(false);
    if (date && startDate) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setEndDate(formattedDate);
      onDateRangeSelected({ start: startDate, end: formattedDate });
    }
  };

  return (
    <RNView style={[spacing.p_16, { backgroundColor: '#002D70' }]}>
      {/* Range Selector Buttons */}
      <RNView style={[layout.row, layout.justifyAround, spacing.mb_16]}>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 1 && styles.selectedButton]}
          onPress={() => handleRangeSelect(1)}
        >
          <RNText style={styles.buttonRNText}>7일</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 2 && styles.selectedButton]}
          onPress={() => handleRangeSelect(2)}
        >
          <RNText style={styles.buttonRNText}>한달</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 3 && styles.selectedButton]}
          onPress={() => setShowStartPicker(true)} // For custom date range
        >
          <RNText style={styles.buttonRNText}>직접</RNText>
        </TouchableOpacity>
      </RNView>

      {/* Date Range Inputs */}
      <RNView style={[layout.row, layout.alignCenter, layout.justifyCenter, spacing.mb_20, spacing.gap_10]}>
        <TouchRect onPress={() => selectedRange === 3 && setShowStartPicker(true)} style={[layout.flex_1]}>
          <TextInput
            style={[colors.text, fonts.alignCenter, spacing.pt_14, { width: 150, backgroundColor: '#333', borderRadius: 5 }]}
            value={startDate || 'YYYY.MM.DD'}
            editable={false}
          />
        </TouchRect>
        <RNText style={[fonts.size_16, fonts.w600]}>~</RNText>
        <TouchRect onPress={() => selectedRange === 3 && setShowEndPicker(true)} style={[layout.flex_1]}>
          <TextInput
            style={[colors.text, fonts.alignCenter, spacing.pt_14, { width: 150, backgroundColor: '#333', borderRadius: 5 }]}
            value={endDate || 'YYYY.MM.DD'}
            editable={false}
          />
        </TouchRect>
       
        <TouchRect onPress={() => setShowStartPicker(true)}>
          <Icon name="calendar-outline" size={36} color="white" />
        </TouchRect>
      </RNView>

      {/* Date Pickers */}
      {showStartPicker && (
        <DateTimePicker
          value={new Date(startDate || Date.now())}
          mode="date"
          display="default"
          onChange={onStartDateChange}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={new Date(endDate || Date.now())}
          mode="date"
          display="default"
          onChange={onEndDateChange}
        />
      )}
    </RNView>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  rangeButton: {
    padding: 14,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    width: 120,
  },
  selectedButton: {
    backgroundColor: '#FF3D3D',
    borderColor: 'transparent',
  },
  buttonRNText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
