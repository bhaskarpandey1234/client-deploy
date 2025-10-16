import * as Astronomy from 'astronomy-engine';
import { DateTime } from 'luxon';

export type Geo = { lat: number; lon: number };

const degNorm = (x: number) => {
  let d = x % 360;
  if (d < 0) d += 360;
  return d;
};

function eclipticLongitude(body: 'Sun' | 'Moon', date: Date): number {
  const b = body === 'Sun' ? Astronomy.Body.Sun : Astronomy.Body.Moon;
  const vec = Astronomy.GeoVector(b, date, true);
  const ecl = Astronomy.Ecliptic(vec);
  return degNorm(ecl.elon);
}

function lahiriAyanamsa(date: Date): number {
  const year = DateTime.fromJSDate(date, { zone: 'utc' }).year;
  const yearsSince2000 = year - 2000;
  return 23.856 + yearsSince2000 * (50.290966 / 3600);
}

export const NAKSHATRA_NAMES = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
  'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha',
  'Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha',
  'Purva Bhadrapada','Uttara Bhadrapada','Revati'
] as const;

export function nakshatraAt(date: Date) {
  const moonTrop = eclipticLongitude('Moon', date);
  const moonSid = degNorm(moonTrop - lahiriAyanamsa(date));
  const idx = Math.floor(moonSid / (360 / 27));
  return { index: idx + 1, name: NAKSHATRA_NAMES[idx] };
}

const GANA_MAP: Record<string, 'Deva'|'Manushya'|'Rakshasa'> = {
  Ashwini:'Deva', Mrigashira:'Deva', Punarvasu:'Deva', Pushya:'Deva', Hasta:'Deva', Swati:'Deva', Anuradha:'Deva', Shravana:'Deva', Revati:'Deva',
  Bharani:'Manushya', Rohini:'Manushya', Ardra:'Manushya', 'Purva Phalguni':'Manushya', 'Uttara Phalguni':'Manushya', 'Purva Ashadha':'Manushya', 'Uttara Ashadha':'Manushya', 'Purva Bhadrapada':'Manushya', 'Uttara Bhadrapada':'Manushya',
  Krittika:'Rakshasa', Ashlesha:'Rakshasa', Magha:'Rakshasa', Chitra:'Rakshasa', Vishakha:'Rakshasa', Jyeshtha:'Rakshasa', Mula:'Rakshasa', Dhanishta:'Rakshasa', Shatabhisha:'Rakshasa'
};

const NADI_MAP: Record<string, 'Adi'|'Madhya'|'Antya'> = {
  Ashwini:'Adi', Ardra:'Adi', Punarvasu:'Adi', 'Uttara Phalguni':'Adi', Hasta:'Adi', Jyeshtha:'Adi', Mula:'Adi', Shatabhisha:'Adi', 'Purva Bhadrapada':'Adi',
  Bharani:'Madhya', Rohini:'Madhya', Pushya:'Madhya', 'Purva Phalguni':'Madhya', Chitra:'Madhya', Anuradha:'Madhya', 'Uttara Ashadha':'Madhya', Dhanishta:'Madhya', 'Uttara Bhadrapada':'Madhya',
  Krittika:'Antya', Mrigashira:'Antya', Ashlesha:'Antya', Magha:'Antya', Swati:'Antya', Vishakha:'Antya', 'Purva Ashadha':'Antya', Shravana:'Antya', Revati:'Antya'
};

export type CompatibilityResult = {
  girl: { nakshatra: string };
  boy: { nakshatra: string };
  gana: 'match'|'partial'|'mismatch';
  nadi: 'match'|'mismatch';
  score: number;
};

export function checkCompatibility(girlDate: Date, boyDate: Date): CompatibilityResult {
  const gNak = nakshatraAt(girlDate);
  const bNak = nakshatraAt(boyDate);
  
  const gG = GANA_MAP[gNak.name];
  const bG = GANA_MAP[bNak.name];
  let gana: 'match'|'partial'|'mismatch' = 'mismatch';
  if (gG === bG && (gG === 'Deva' || gG === 'Manushya')) gana = 'match';
  else if ((gG === 'Deva' && bG === 'Manushya') || (gG === 'Manushya' && bG === 'Deva')) gana = 'partial';
  
  const nadi = NADI_MAP[gNak.name] === NADI_MAP[bNak.name] ? 'mismatch' : 'match';
  
  const score = (gana === 'match' ? 6 : gana === 'partial' ? 3 : 0) + (nadi === 'match' ? 8 : 0);
  
  return {
    girl: { nakshatra: gNak.name },
    boy: { nakshatra: bNak.name },
    gana,
    nadi,
    score
  };
}
