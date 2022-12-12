import dayjs from 'dayjs';

const normalizeValue = (data) => {
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
    entrepreneurs_services,
    period_insurance_stop,
    // array
    period_insurance_start,
    date_insurance_start,
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
    entrepreneurs_services: entrepreneurs_services ? dayjs(entrepreneurs_services) : '',
    period_insurance_stop: period_insurance_stop ? dayjs(period_insurance_stop) : '',

    period_insurance_start: period_insurance_start[0] !== null ? [
      dayjs(period_insurance_start[0]),
      dayjs(period_insurance_start[1]),
    ] : [],
    date_insurance_start: date_insurance_start[0] !== null ? [
      dayjs(date_insurance_start[0]),
      dayjs(date_insurance_start[1]),
    ] : [],
  };
};

export default normalizeValue;
