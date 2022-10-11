
import moment from 'moment';

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

  console.log(data);

  return {
    ...data,
    qualification: qualification,
    date_certificate_renew: moment(date_certificate_renew),
    date_certificate_start: moment(date_certificate_start),
    date_certificate_stop: moment(date_certificate_stop),
    date_insurance_from: moment(date_insurance_from),
    date_insurance_stop: moment(date_insurance_stop),
    date_membership_exclusion: moment(date_membership_exclusion),
    date_membership_start: moment(date_membership_start),
    date_membership_stop: moment(date_membership_stop),
    entrepreneurs_services: moment(entrepreneurs_services),
    period_insurance_stop: moment(period_insurance_stop),
    period_insurance_start: [moment(period_insurance_start[0]), moment(period_insurance_start[1])],
    date_insurance_start: [moment(date_insurance_start[0]), moment(date_insurance_start[1])],
  };
};

export default normalizeValue;