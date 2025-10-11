import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { useTranslation } from './LocalizationProvider';
import { useCatch } from '../../reactHelper';
import fetchOrThrow from '../util/fetchOrThrow';

const AddressValue = ({ latitude, longitude, originalAddress }) => {
  const t = useTranslation();

  const addressEnabled = useSelector((state) => state.session.server.geocoderEnabled);

  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress(originalAddress);
  }, [latitude, longitude, originalAddress]);

  const showAddress = useCatch(async (event) => {
    event.preventDefault();
    const response = await fetchOrThrow(`https://server.atrack.com.pk/geocode?lat=${latitude}&lon=${longitude}`);
    setAddress(await response.text());
  });

  if (address) {
    return address;
  }
  if (addressEnabled) {
    return (<Link href="#" onClick={showAddress}>{t('sharedShowAddress')}</Link>);
  }
  return '';
};

export default AddressValue;
