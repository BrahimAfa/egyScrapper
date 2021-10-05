export const PORT = process.env.PORT || 3030;
export const HOST = 'https://gose.egybest.xyz';
export const IsPROD = process.env.NODE_ENV === 'production';
export const ProdLogFormate = ':id :remote-addr - :remote-user [:date [web]] " :method :url HTTP/:http-version"  :status  :res[content-length]';
