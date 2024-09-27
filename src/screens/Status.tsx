import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import useTheme from '@/theme/hooks';
import { RNText, RNView } from '@/components/Custom';
import { SafeAreaScreen } from '@/components/SafeAreaScreen';
import { TouchCircle, TouchRect } from '@/components/Touch';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Cell, Row } from 'react-native-table-component';
import { useUserStore } from '@/stores';
import useSWR from 'swr';
import { fetcher } from '@/services';
import moment from 'moment';
import { returnToday, returnToLocaleStrings } from '@/utils/format';
import { SunPvDataItem, SunPvDataTotal, InverterDataItem, InverterDataTotal, PvDataList, PvDataTotal, WeatherData } from '@/types/scheme';

const Status = () => {
  const { layout, fonts, colors, components, spacing } = useTheme();
  const [selectedOption, setSelectedOption] = useState('0');
  const { userInfo } = useUserStore()

  const plantSeq = userInfo?.plant_seq

  const { data: resData, error, isLoading } = useSWR(
    `/api/device/inveter/stats?plant_seq=${plantSeq}`,
    fetcher
  )
  console.log('API Response Data:', JSON.stringify(resData, null, 2));

  const sunPvDataList = resData?.data?.data?.sun_pv_data_list;
  const sunPvDataTotal = resData?.data?.data?.sun_pv_data_total;
  const inverterDataList = resData?.data?.data?.inverter_data_list;
  const inverterDataTotal = resData?.data?.data?.inverter_data_total;
  const pvDataList = resData?.data?.data?.pv_data_list;
  const pvDataTotal = resData?.data?.data?.pv_data_total;
  const weatherData = resData?.data?.data?.weather_data;

  if (error) {
    return (
      <SafeAreaScreen style={{ backgroundColor: colors.background }}>
        <RNText style={[fonts.size_18, { color: 'red' }]}>
          Error fetching data
        </RNText>
      </SafeAreaScreen>
    )
  }

  return (
    <SafeAreaScreen style={{ backgroundColor: colors.background }}>
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <RNView style={[layout.flex_1, spacing.p_16, spacing.py_30, spacing.gap_14]}>
          <RNView style={[spacing.gap_10]}>
            <RNText style={[fonts.size_24, fonts.w700]}>장치 현황</RNText>
            <RNText style={[fonts.size_14, { color: "#FEC022" }]}>
                {returnToday()}{' '}
              <RNText>실시간 장치 현황을 확인할 수 있습니다. {'\n'}</RNText>
              <RNText style={[fonts.size_14]}>
                * 오류발생 시 문제알람 이력을 통해 내용을 확인할 수 있습니다.
              </RNText>
              <RNText>오류발생 시 문제알람 이력을 통해 내용을 확인할 수 있습니다. </RNText>
            </RNText>
          </RNView>

          {/* Weather Information Section */}
          <RNView>
            <RNView style={[layout.row, layout.justifyBetween]}>
              <RNText style={[fonts.size_18, fonts.w700]}>
                기상환경 현황
              </RNText>
              {weatherData && (
                <RNText style={[fonts.size_14]}>
                  측정시간 : {moment(weatherData.base_time, 'HHmm').format('HH : mm')}
                </RNText>
              )}
            </RNView>

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

                      {/* {moment(resData.weather_data.base_time, 'HHmm').format('HH : mm')} */}
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
                  {!isLoading && resData && resData.data && resData.data.data ? (
                    <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                      <TableWrapper style={{ flexDirection: 'row' }}>
                        <Cell data={resData.data.data.weather_data.area_name} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={moment(resData.data.data.weather_data.sunrise, 'HHmm').format('HH : mm')} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={resData.data.data.weather_data.sky_desc} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={`${resData.data.data.weather_data.t1h}℃`} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={`${resData.data.data.weather_data.pop}%`} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={`${resData.data.data.weather_data.pcp}`} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={resData.data.data.weather_data.sno} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={`${resData.data.data.weather_data.reh}%`} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={`${resData.data.data.weather_data.wsd} m/s`} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={resData.data.data.weather_data.vec_name} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                        <Cell data={moment(resData.data.data.weather_data.sunset, 'HHmm').format('HH : mm')} style={[styles.body, { width: 100 }]} textStyle={styles.text} />
                      </TableWrapper>
                    </Table>
                  ) : (
                    <ActivityIndicator size="large" color={colors.primary} />
                  )}
                </View>
              </ScrollView>
            </View>

            {/* Radio Buttons */}
            <View style={[layout.row, layout.justifyCenter, layout.alignCenter, spacing.p_30, spacing.gap_10, spacing.mt_14, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}>
              <TouchableOpacity
                style={[layout.row, layout.justifyCenter, spacing.mr_30]}
                onPress={() => setSelectedOption('0')}
              >
                <View style={[styles.radio, selectedOption === '0' && { backgroundColor: '#E83830' }]}>
                  {selectedOption === '0' && <View style={{ backgroundColor: colors.background }} />}
                </View>
                <Text style={[fonts.size_18, spacing.ml_10]}>전력발전과 송전</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[layout.row, layout.justifyCenter, spacing.mr_30]}
                onPress={() => setSelectedOption('1')}
              >
                <View style={[styles.radio, selectedOption === '1' && { backgroundColor: '#E83830' }]}>
                  {selectedOption === '1' && <View style={{ backgroundColor: colors.background }} />}
                </View>
                <Text style={[fonts.size_18, spacing.ml_10]}>전력저장</Text>
              </TouchableOpacity>
            </View>


            {selectedOption === '0' && (
              <>
                {/* Table 1 */}
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

                                {/* First Row with headerLess style, adding top border */}
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="전압" style={[styles.headerLessWithTopBorder, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전류" style={[styles.headerLessWithTopBorder, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="전력" style={[styles.headerLessWithTopBorder, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="발전량" style={[styles.headerLessWithTopBorder, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.headerLessWithTopBorder, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                </TableWrapper>

                                {/* Second Row with headerLess style */}
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.headerLess, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.headerLess, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.headerLess, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.headerLess, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.headerLess, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                </TableWrapper>
                              </TableWrapper>

                            </TableWrapper>
                          </Table>
                        </View>

                        {/* Table Body - Dynamically rendering data */}
                        {sunPvDataList && sunPvDataList.length > 0 ? (
                          <>
                            {sunPvDataList.map((item: SunPvDataItem, index: number) => (
                              <Table
                                key={index}
                                borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                                style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
                              >
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data={item.device_name} style={{ width: 100 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell
                                    data={
                                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={[styles.circle, { backgroundColor: item.device_status === 'Normal' ? '#80ff44' : '#E83830' }]} />
                                      </View>
                                    }
                                    style={{ width: 100 }}
                                    textStyle={{ textAlign: 'center' }}
                                  />
                                  <Cell data={returnToLocaleStrings(item.t_m)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.t_o)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.solar_h)} style={{ width: 100 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.dc_v)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.gen_hour)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.dc_v)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.dc_a)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.dc_kw)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.dc_kwh)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.kwh_t ?? '0')} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                </TableWrapper>
                              </Table>
                            ))}

                            {/* 합계/평균 Row */}
                            {sunPvDataTotal && (
                              <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="합계/평균" style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data="-" style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.t_m)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.t_o)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.solar_h)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.solar_v)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.gen_hour)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.dc_v)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.dc_a)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.dc_kw)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.dc_kwh)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(sunPvDataTotal.kwh)} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                </TableWrapper>
                              </Table>
                            )}
                          </>
                        ) : (
                          <Text>
                            No data
                          </Text>
                        )}
                      </View>
                    </ScrollView>
                  </RNView>
                </RNView>

                {/* Table 2 */}
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
                          <Table
                            borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                              <Cell data="구분" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="동작상태" style={[styles.header, { width: 100, height: 120 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="용량" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="kW" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="AC 출력" style={[styles.header, { width: 600 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="R상 전류" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="S상 전류" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="T상 전류" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="출력전력" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="누적 발전량" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="계통 주파수" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="A" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="A" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="kW" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="kWh" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                  <Cell data="Hz" style={[styles.subHeader, { width: 100 }]} textStyle={styles.headerText} />
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>
                        {inverterDataList && inverterDataList.length > 0 ? (
                          <>
                            {inverterDataList.map((item: InverterDataItem, index: number) => (
                              <Table
                                key={index}
                                borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                                style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
                              >
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data={item.device_name} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                      <View style={[styles.circle, { backgroundColor: item.device_status === 'Normal' ? '#80ff44' : '#E83830' }]} />
                                    </View>
                                  } style={{ width: 100 }} />
                                  <Cell data={returnToLocaleStrings(item.c_info === null ? 50 : item.c_info)} style={{ width: 100 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.ac_a_r)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.ac_a_s)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.ac_a_t)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.ac_kw)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.ac_kwh)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.hz)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                </TableWrapper>
                              </Table>
                            ))}

                            {/* 합계/평균 Row */}
                            {inverterDataTotal && (
                              <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="합계/평균" style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data="-" style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.c_info === null ? '50' : '50')} style={{ width: 100 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.ac_a_r)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.ac_a_s)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.ac_a_t)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.ac_kw)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.ac_kwh)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(inverterDataTotal.hz)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />

                                </TableWrapper>
                              </Table>
                            )}
                          </>
                        ) : (
                          <View>
                            <Text>No Data Available</Text>
                          </View>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                </RNView>

                {/* Table 3 */}
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
                                <Cell data="계통전압" style={[styles.header, { width: 100, height: 80 }]} textStyle={styles.headerText} />
                                <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                              </TableWrapper>
                              <TableWrapper style={{ flexDirection: 'column' }}>
                                <Cell data="선간전압" style={[styles.header, { width: 300, height: 40 }]} textStyle={styles.headerText} />
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="RS 전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="ST 전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="TR 전압" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                </TableWrapper>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                  <Cell data="V" style={[styles.subHeader, { width: 100, height: 40 }]} textStyle={styles.headerText} />
                                </TableWrapper>
                              </TableWrapper>
                            </TableWrapper>
                          </Table>
                        </View>

                        {pvDataList && pvDataList.length > 0 ? (
                          <>
                            {pvDataList.map((item: PvDataList, index: number) => (
                              <Table
                                key={index}
                                borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                                style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
                              >
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data={item.device_name} style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                      <View style={[styles.circle, { backgroundColor: item.device_status === 'Normal' ? '#80ff44' : '#E83830' }]} />
                                    </View>
                                  } style={{ width: 100 }} />
                                  <Cell data={returnToLocaleStrings(item.p_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center' }} />
                                  <Cell data={returnToLocaleStrings(item.p_rs_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.p_st_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                  <Cell data={returnToLocaleStrings(item.p_tr_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', color: '#00D1FF' }} />
                                </TableWrapper>
                              </Table>
                            ))}

                            {/* 합계/평균 Row */}
                            {pvDataTotal && (
                              <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                                <TableWrapper style={{ flexDirection: 'row' }}>
                                  <Cell data="합계/평균" style={{ width: 100, height: 40 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data="-" style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(pvDataTotal.p_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(pvDataTotal.p_rs_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(pvDataTotal.p_st_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                  <Cell data={returnToLocaleStrings(pvDataTotal.p_tr_v)} style={{ width: 100 }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />

                                </TableWrapper>
                              </Table>
                            )}
                          </>
                        ) : (
                          <View>
                            <Text>No Data Available</Text>
                          </View>
                        )}

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
    borderRadius: 6,
    marginRight: 6,
  },
  header: { backgroundColor: 'rgba(0, 12, 101, 0.25)', height: 40, justifyContent: 'center' },
  subHeader: { backgroundColor: 'rgba(0, 12, 101, 0.25)', height: 40, justifyContent: 'center' },
  headerText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  text: { color: '#fff', textAlign: 'center', fontWeight: '100' },
  body: { height: 40, justifyContent: 'center' },
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
  headerLess: {
    backgroundColor: 'rgba(0, 12, 101, 0.25)', // Set background color as in the image
    borderBottomWidth: 1,  // Ensure there is a border between rows
    borderColor: 'rgba(255, 255, 255, 0.2)',  // Border color similar to the image
    borderTopWidth: 0,  // No border on the top
    borderLeftWidth: 0, // No border on the left side
    borderRightWidth: 0, // No border on the right side
  },


  headerLessWithTopBorder: {
    backgroundColor: 'rgba(0, 12, 101, 0.25)',
    borderBottomWidth: 1,  // Bottom border to separate rows
    borderTopWidth: 1,  // Add top border for the first row
    borderColor: 'rgba(255, 255, 255, 0.2)',  // Set the border color for the top and bottom 
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },


});

export default Status;
