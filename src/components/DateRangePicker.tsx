import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { RNText, RNView } from './Custom';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, subDays, subMonths } from 'date-fns'
import Icon from 'react-native-vector-icons/Ionicons';  
import useTheme from '@/theme/hooks';
import { TouchRect } from './Touch';

type DateRangePickerProps = {
  select_date: number;
  onDateRangeSelected: (selectedRange: { start: string; end: string }) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ select_date, onDateRangeSelected }) => {
  const { layout, fonts, colors, spacing } = useTheme()
  const [selectedRange, setSelectedRange] = useState<number>(select_date)
  const [startDate, setStartDate] = useState<string | null>(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string | null>(format(new Date(), 'yyyy-MM-dd'));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Effect to update date range based on selectedRange
  useEffect(() => {
    if (selectedRange === 1) {
      const start = format(subDays(new Date(), 7), 'yyyy-MM-dd')
      const end = format(new Date(), 'yyyy-MM-dd')
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (selectedRange === 2) {
      const start = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
      const end = format(new Date(), 'yyyy-MM-dd')
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    }
  }, [selectedRange]);

  const handleRangeSelect = (range: number) => {
    setSelectedRange(range);
    if (range === 1) {
      const start = format(subDays(new Date(), 7), 'yyyy-MM-dd')
      const end = format(new Date(), 'yyyy-MM-dd')
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (range === 2) {
      const start = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
      const end = format(new Date(), 'yyyy-MM-dd')
      setStartDate(start);
      setEndDate(end);
      onDateRangeSelected({ start, end });
    } else if (range === 3) {
      setShowStartPicker(true); 
    }
  };

  const onStartDateChange = (event: any, date?: Date) => {
    setShowStartPicker(false);
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      setShowEndPicker(true);  
    }
  };

  const onEndDateChange = (event: any, date?: Date) => {
    setShowEndPicker(false);
    if (date && startDate) {
      const formattedDate = format(date,'yyyy-MM-dd');
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
            style={[  fonts.alignCenter, spacing.pt_14, {color: 'white', width: 150, backgroundColor: '#333', borderRadius: 5 }]}
            value={startDate || 'YYYY.MM.DD'}
            editable={false}
          />
        </TouchRect>
        <RNText style={[fonts.size_16, fonts.w600]}>~</RNText>
        <TouchRect onPress={() => selectedRange === 3 && setShowEndPicker(true)} style={[layout.flex_1]}>
          <TextInput
            style={[  fonts.alignCenter, spacing.pt_14, { color: 'white', width: 150, backgroundColor: '#333', borderRadius: 5 }]}
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
