import dayjs from 'dayjs';
import config from 'config';

export const dataFormater = (val) => (val ? dayjs(val).format(config.dateFormat) : '');

export const dateToStringFormater = (val) => {
  if (val?.length > 1 && !val.includes(null)) {
    return val?.map((d) => dayjs(d).format(config.dateFormat));
  }

  return null;
};

const formater = (field) => {
  if (!field.includes(null)) {
    return field.map((date) => dayjs(date));
  }

  return null;
};

export const normalizeValue = (data) => {
  const {
    qualification,
    date_certificate_renew,
    date_certificate_start,
    date_certificate_stop,
    date_insurance_from,
    date_insurance_stop,
    date_membership_exclusion,
    date_membership_start,
    date_membership_stop,

    date_insurance_start,
    period_insurance_start,
  } = data;

  return {
    ...data,
    qualification,
    date_certificate_renew: date_certificate_renew ? dayjs(date_certificate_renew) : '',
    date_certificate_start: date_certificate_start ? dayjs(date_certificate_start) : '',
    date_certificate_stop: date_certificate_stop ? dayjs(date_certificate_stop) : '',
    date_insurance_from: date_insurance_from ? dayjs(date_insurance_from) : '',
    date_insurance_stop: date_insurance_stop ? dayjs(date_insurance_stop) : '',
    date_membership_exclusion: date_membership_exclusion ? dayjs(date_membership_exclusion) : '',
    date_membership_start: date_membership_start ? dayjs(date_membership_start) : '',
    date_membership_stop: date_membership_stop ? dayjs(date_membership_stop) : '',

    date_insurance_start: formater(date_insurance_start),
    period_insurance_start: formater(period_insurance_start),
  };
};
