export type IUser = {
  user_id: string
  user_seq: number
  plant_seq: number
  plant_name: string
}

export type SunPvDataItem = {
  device_status: string;
  t_m: string;
  dc_kw: string;
  device_id: string;
  t_o: string;
  kwh_t: string;
  solar_v: string;
  dc_a: string;
  device_name: string;
  dc_v: string;
  dc_kwh: number;
  solar_h: string;
  gen_hour: number;
  kwh: number;
};

export type SunPvDataTotal = {
  t_m: string;
  dc_kw: number;
  t_o: string;
  dc_v: number;
  dc_kwh: number;
  solar_h: string;
  gen_hour: number;
  kwh: number;
  solar_v: string;
  dc_a: number;
};

export type InverterDataItem = {
  device_status: string,
  c_info: null,
  device_name: string,
  ac_a_r: string,
  hz: string,
  device_id: string,
  ac_kwh: string,
  ac_a_t: string,
  ac_kw: string,
  ac_a_s: string
}

export type InverterDataTotal = {
  ac_a_r: number,
  hz: number,
  ac_kwh: number,
  ac_a_t: number,
  ac_kw: number,
  ac_a_s: number
}

export type PvDataList = {
  device_status: string;
  device_name: string;
  device_id: string;
  p_v: string,
  p_rs_v: string,
  p_st_v: string,
  p_tr_v: string
}

export type PvDataTotal = {
  p_v: string,
  p_rs_v: string,
  p_st_v: string,
  p_tr_v: string
}

export type StatusTableProps = {
  sunPvDataList: SunPvDataItem[];
  sunPvDataTotal: SunPvDataTotal;
  inverterDataList: InverterDataItem[];
  inverterDataTotal: InverterDataTotal;
  pvDataList: PvDataList[];
  pvDataTotal: PvDataTotal;
};