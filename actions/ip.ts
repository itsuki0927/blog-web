'use server';

import { get } from '@vercel/edge-config';
import type { NextRequest } from 'next/server';
import countries from '@/constants/countries.json';
import { ENV } from '@/constants/env';
import { getMessageFromNormalError } from '@/utils/error';
import { IPLocation } from '@/types/database';
import { ipAddress } from '@vercel/functions';

export const getIP = async (request: NextRequest) => {
  if (ENV.isDev) {
    return '221.194.171.227'; // mock
  }
  if (request) {
    return ipAddress(request);
  }
  return null;
  // const FALLBACK_IP_ADDRESS = '0.0.0.0';
  // const forwardedFor = request?.headers.get('x-forwarded-for');
  // if (forwardedFor) {
  //   return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  // }
  // return request?.headers.get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
};

export const checkIPIsBlocked = async (request: NextRequest) => {
  const blockedIPs = (await get<string[]>('blockedIPs')) || [];
  const ip = await getIP(request);
  if (!ip) {
    return false;
  }
  return blockedIPs.includes(ip);
};

const mockIPLocation: IPLocation = {
  ip: '221.194.171.227',
  city: 'Langfang',
  flag: '🇨🇳',
  region: 'Hebei',
  regionCode: 'HE',
  country: '中国',
  countryCode: 'CN',
  zip: '',
};

// query by https://ip-api.com/docs/api:json
const queryLocationByIpApi = async (ip: string): Promise<IPLocation> => {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,query`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();
    return data?.status !== 'success'
      ? Promise.reject(data.message)
      : Promise.resolve({
          country: data.country,
          countryCode: data.countryCode,
          region: data.regionName,
          regionCode: data.region,
          city: data.city,
          zip: data.zip,
          ip: data.query,
          flag: '',
        });
  } catch (error) {
    const message = getMessageFromNormalError(error);
    console.warn('queryLocationByIpApi failed!', `"${ip}"`, message);
    return Promise.reject(message);
  }
};

// query by https://ipapi.co/api/#introduction
const queryLocationByApiCo = async (ip: string): Promise<IPLocation> => {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data?.error
      ? Promise.reject(data.reason)
      : Promise.resolve({
          country: data.country_name,
          countryCode: data.country_code,
          region: data.region,
          regionCode: data.region_code,
          city: data.city,
          zip: data.postal,
          ip: data.ip,
          flag: '',
        });
  } catch (error) {
    const message = getMessageFromNormalError(error);
    console.warn('queryLocationByApiCo failed!', `"${ip}"`, message);
    return Promise.reject(message);
  }
};

const queryLocation = (ip: string) => {
  return queryLocationByIpApi(ip)
    .catch(() => queryLocationByApiCo(ip))
    .catch(() => null);
};

export const getLocationByIP = async (
  ip: string
): Promise<IPLocation | null> => {
  try {
    if (ENV.isDev) {
      return { ...mockIPLocation };
    }

    const data = await queryLocation(ip);
    if (data) {
      const countryInfo = countries.find(
        (x) => x.cca2 === data?.countryCode.toUpperCase()
      );
      const flag = countryInfo?.flag || '';
      return { ...data, flag };
    }

    return null;
  } catch (err) {
    console.error('getGeoByIP error', err);
  }

  return { ...mockIPLocation };
};
