export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const BELT_ID = parseInt(process.env.NEXT_PUBLIC_BELT_ID, 10);
export const SHOW_LOADER_COUNT =
  parseInt(process.env.NEXT_PUBLIC_SHOW_LOADER_COUNT, 10) === 1;
export const CONFIGURE_PRINTING_BELT =
  process.env.NEXT_PUBLIC_CONFIGURE_PRINTING_BELT === '1';
