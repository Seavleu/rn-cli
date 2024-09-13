import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useTheme from '@/theme/hooks';
import { RNText, RNView } from '@/components/Custom';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';

const Status = () => {
  const { layout, fonts, colors, components, spacing } = useTheme();

  const [tableHead] = useState(['지역', '일출', '날씨', '기온', '강수/적설', '확률', '강수량', '적설량', '습도', '풍속', '풍향', '일몰']);
  const [widthArr] = useState([40, 60, 80, 100, 120]);

  const tableData = [];
  for (let i = 0; i < 3; i += 1) {
    const rowData = [];
    for (let j = 0; j < 5; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <SafeAreaScreen style={{ backgroundColor: colors.background }}>
      <RNView style={[components.header, { borderBottomWidth: 1, borderColor: colors.rgba010 }]}>
        <TouchRect style={[layout.row, layout.alignCenter, spacing.gap_4, spacing.p_4]}>
          <RNText style={[fonts.w700, fonts.size_18]}>Status</RNText>
          <Icon name="chevron-down" size={20} color={colors.text} />
        </TouchRect>
        <View>
          <TouchCircle style={[spacing.p_4]}>
            <Icon name="menu" size={25} color={colors.text} />
          </TouchCircle>
        </View>
      </RNView>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* Content */}
        <RNView style={[layout.flex_1, spacing.p_16, spacing.py_30, spacing.gap_14]}>
          <RNView style={[spacing.gap_10]}>
            <RNText style={[fonts.size_24, fonts.w700]}>장치 현황</RNText>
            <RNText style={[fonts.size_14, { color: "#FEC022" }]}>
              2024년 9월 13일(오늘){' '}
              <RNText>실시간 장치 현황을 확인할 수 있습니다. {'\n'}</RNText>
              <RNText style={[fonts.size_14]}>
                * 오류발생 시 문제알람 이력을 통해 내용을 확인할 수 있습니다.
              </RNText>
            </RNText>
          </RNView>

          <RNView>
            <RNView style={[layout.row, layout.justifyBetween]}>
              <RNText style={[fonts.size_20, fonts.w700]}>기상환경 현황</RNText>
              <RNText style={[fonts.size_14]}>측정시간 : 09 : 00</RNText>
            </RNView>

            {/* Table */}
            <RNView style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: colors.rgba010 }}>
              <ScrollView horizontal={true}>
                <View>
                  <Table borderStyle={{ borderWidth: 1, borderColor: colors.text }}>
                    <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: colors.text }}>
                      {tableData.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={widthArr}
                          style={[styles.row, index % 2 && { backgroundColor: 'gray' }]}
                          textStyle={styles.text}
                        />
                      ))}

                      <TableWrapper style={{flexDirection: 'row'}}>
                        <Col data={['H1','H1' ]} style={{flex: 2}} heightArr={[60,60, 60,60]} textStyle={styles.text} /> 
                      </TableWrapper>
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </RNView>

          </RNView>
        </RNView>
      </ScrollView>
    </SafeAreaScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  header: { height: 50, },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40 },
});

export default Status;
