import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useTheme from '@/theme/hooks';
import { RNText, RNView } from '@/components/Custom';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Cell } from 'react-native-table-component';

const Status = () => {
  const { layout, fonts, colors, components, spacing } = useTheme();
  const [selectedOption, setSelectedOption] = useState('0');

  return (
    <SafeAreaScreen style={{ backgroundColor: colors.background }}>
      {/* Header */}
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
        {/* Content Section */}
        <RNView style={[layout.flex_1, spacing.p_16, spacing.py_30, spacing.gap_14]}>
          {/* Section Header */}
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

          {/* Weather Information Section */}
          <RNView>
            <RNView style={[layout.row, layout.justifyBetween]}>
              <RNText style={[fonts.size_18, fonts.w700]}>기상환경 현황</RNText>
              <RNText style={[fonts.size_14]}>측정시간 : 09 : 00</RNText>
            </RNView>

            {/* Scrollable Weather Table */}
            <View style={[spacing.mt_20]}>
              <ScrollView horizontal={true}>
                <View>
                  {/* Table Header */}
                  <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <TableWrapper style={{ flexDirection: 'row' }}>
                      <Cell data="지역" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="일출" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="시 : 분" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <Cell data="날씨" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="기온" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="강수/적설 확률" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="강수량" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="mm" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="적설량" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="cm" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="습도" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="풍속" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="m/s" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                      <Cell data="풍향" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                      <TableWrapper style={{ flexDirection: 'column' }}>
                        <Cell data="일몰" style={[styles.header, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                        <Cell data="시 : 분" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                      </TableWrapper>
                    </TableWrapper>
                  </Table>

                  {/* Table Body */}
                  <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <TableWrapper style={{ flexDirection: 'row' }}>
                      <Cell data="파주시 파평면" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="06 : 19" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="흐림" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="20%" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="0 mm" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="0 cm" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="85%" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="0.5 m/s" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="남서" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      <Cell data="18 : 34" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                    </TableWrapper>
                  </Table>
                </View>
              </ScrollView>
            </View>

            {/* Radio Buttons */}
            <View style={[styles.radioBox, spacing.gap_10]}>
              <TouchableOpacity
                style={styles.radioLabel}
                onPress={() => setSelectedOption('0')}
              >
                <View style={[styles.radio, selectedOption === '0' && styles.checkedRadio]}>
                  {selectedOption === '0' && <View style={styles.radioSelected} />}
                </View>
                <Text style={[styles.radioText, fonts.size_18]}>전력발전과 송전</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioLabel}
                onPress={() => setSelectedOption('1')}
              >
                <View style={[styles.radio, selectedOption === '1' && styles.checkedRadio]}>
                  {selectedOption === '1' && <View style={styles.radioSelected} />}
                </View>
                <Text style={[styles.radioText, fonts.size_18]}>전력저장</Text>
              </TouchableOpacity>
            </View>
            {selectedOption === '0' && ( 
            <>
              <RNView style={[spacing.mt_14]}>
                <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                  <RNText style={[fonts.size_18, fonts.w700]}>PV(태양광전지) 동작 현황</RNText>
                  <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                    <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                    <RNText style={[fonts.size_14]}>정상</RNText>
                    <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                    <RNText style={[fonts.size_14]}>오류</RNText>
                  </View>
                </RNView>
                <RNView style={[spacing.mt_20]}>
                  <ScrollView horizontal={true}>
                    <View>
                      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="h" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="DC 입력" style={[styles.header, { width: 500, height: 40 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전력" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                            </TableWrapper>
                          </TableWrapper>
                        </Table>
                      </View>
                      <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                          <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="-" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="101,520" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        </TableWrapper>
                      </Table>
                    </View>
                  </ScrollView>
                </RNView>
              </RNView>
              
              <RNView style={[spacing.mt_14]}>
                <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                  <RNText style={[fonts.size_18, fonts.w700]}>인버터 동작 현황</RNText>
                  <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                    <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                    <RNText style={[fonts.size_14]}>정상</RNText>
                    <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                    <RNText style={[fonts.size_14]}>오류</RNText>
                  </View>
                </RNView>
                <View style={[spacing.mt_20]}>
                  <ScrollView horizontal={true} >
                    <View>
                      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="h" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="DC 입력" style={[styles.header, { width: 500, height: 40 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                            </TableWrapper>
                          </TableWrapper>
                        </Table>
                      </View>
                      <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                          <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="-" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="101,520" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        </TableWrapper>
                      </Table>
                    </View>
                  </ScrollView>
                </View>
              </RNView>
              
              <RNView style={[spacing.mt_14]}>
                <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                  <RNText style={[fonts.size_18, fonts.w700]}>계통 동작 현황</RNText>
                  <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                    <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                    <RNText style={[fonts.size_14]}>정상</RNText>
                    <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                    <RNText style={[fonts.size_14]}>오류</RNText>
                  </View>
                </RNView>
                <View style={[spacing.mt_20]}>
                  <ScrollView horizontal={true} >
                    <View>
                      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                              <Cell data="h" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                            </TableWrapper>
                            <TableWrapper style={{ flexDirection: 'column' }}>
                              <Cell data="DC 입력" style={[styles.header, { width: 500, height: 40 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'row' }}>
                                <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                            </TableWrapper>
                          </TableWrapper>
                        </Table>
                      </View>
                      <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                          <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="-" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                          <Cell data="101,520" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        </TableWrapper>
                      </Table>
                    </View>
                  </ScrollView>
                </View>
              </RNView>
            </>
            )}

            {selectedOption === '1' && (
              <>
                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>PCS 전력출력 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="PCS 온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="PCS 위험온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="전력입력" style={[styles.header, { width: 400, height: 40 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전력" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>PCS 전력출력 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="PCS 온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="PCS 위험온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="모듈온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kWh/m²" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="전력입력" style={[styles.header, { width: 400, height: 40 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전력" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>배터리 전력충전 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="렉온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="렉 위험온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="충전율" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="충전시간" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="h" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="전력입력" style={[styles.header, { width: 400, height: 40 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전력" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                            <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>배터리 전력충전 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="렉온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="렉 위험온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="충전율" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="충전시간" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="h" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="전력입력" style={[styles.header, { width: 400, height: 40 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전류" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전력" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} /> 
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="485" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="2" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="1" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>쿨링 시스템 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="ESS장치 실내온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="에어컨 설정온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="사용전력" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="누적 사용전력량" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kWh" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                <RNView style={[spacing.mt_14]}>
                  <RNView style={[layout.row, layout.justifyBetween, spacing.mt_14]}>
                    <RNText style={[fonts.size_18, fonts.w700]}>쿨링 시스템 동작 현황</RNText>
                    <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                      <View style={[styles.circle, { backgroundColor: '#80ff44' }]} />
                      <RNText style={[fonts.size_14]}>정상</RNText>
                      <View style={[styles.circle, { backgroundColor: '#E83830' }]} />
                      <RNText style={[fonts.size_14]}>오류</RNText>
                      <View style={[styles.circle, { backgroundColor: '#00D1FF' }]} />
                      <RNText style={[fonts.size_14]}>작동</RNText>
                    </View>
                  </RNView>
                  <RNView style={[spacing.mt_20]}>
                    <ScrollView horizontal={true}>
                      <View>
                        <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="ESS장치 실내온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="렉온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="℃" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="실내습도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="%" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="화재예상 렉온도" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper> 
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="화재감지" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            <Cell data="인버터1" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25.4" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="26.5" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="25" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="55" style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                            <Cell data="0.01" style={[styles.body, { width: 100 }]} textStyle={styles.text} /> 
                          </TableWrapper>
                        </Table>
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>
                 
              </>
            )}
          </RNView>
        </RNView>
      </ScrollView>
    </SafeAreaScreen>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6, // Makes the circle
    marginRight: 6,  // Space between the circle and the text
  },
  header: { backgroundColor: 'rgba(0, 12, 101, 0.25)', height: 40, justifyContent: 'center' },
  subHeader: { backgroundColor: 'rgba(0, 12, 101, 0.25)', height: 40, justifyContent: 'center' },
  headerText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '100' },
  body: { height: 40, justifyContent: 'center' },
  error: {
    backgroundColor: '#e83830',
  },
  radioBox: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 30,
  },
  radioLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'grey',
    borderColor: 'white',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedRadio: {
    backgroundColor: '#E83830',
  },
  radioSelected: {
    backgroundColor: 'white',
  },
  radioText: {
    marginLeft: 10,
  },
});

export default Status;
