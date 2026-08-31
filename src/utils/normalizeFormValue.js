import dayjs from 'dayjs';
import config from 'config';

export const dataFormatter = (val) => (val ? dayjs(val).format(config.dateFormat) : '');

export const dateToStringFormater = (val) => {
  if (val?.length > 1 && !val.includes(null)) {
    return val?.map((d) => dayjs(d).format(config.dateFormat));
  }

  return null;
};

const parseDateArray = (field) => {
  if (!field.includes(null)) {
    return field.map((date) => dayjs(date));
  }

  return null;
};

const normalizeDate = (val) => (val ? dayjs(val) : '');

export const normalizeValue = (data) => {
  const {
    qualification,
    date_certificate_renew,
    date_course,
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
    date_certificate_renew: normalizeDate(date_certificate_renew),
    date_course: normalizeDate(date_course),
    date_certificate_start: normalizeDate(date_certificate_start),
    date_certificate_stop: normalizeDate(date_certificate_stop),
    date_insurance_from: normalizeDate(date_insurance_from),
    date_insurance_stop: normalizeDate(date_insurance_stop),
    date_membership_exclusion: normalizeDate(date_membership_exclusion),
    date_membership_start: normalizeDate(date_membership_start),
    date_membership_stop: normalizeDate(date_membership_stop),
    date_insurance_start: parseDateArray(date_insurance_start),
    period_insurance_start: parseDateArray(period_insurance_start),
  };
};
