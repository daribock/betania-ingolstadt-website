type ChurchtoolsApiConfig = {
  BASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
  TOKEN: string;
};

const churchtoolsApiConfig: ChurchtoolsApiConfig = {
  BASE_URL: process.env.BASE_URL || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  TOKEN: process.env.TOKEN || '',
};

export default churchtoolsApiConfig;
