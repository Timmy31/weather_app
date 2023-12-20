export const formatTime = (time: number): string => {
  const date = new Date(time * 1000);
  return date.toLocaleTimeString();
};

export const getHourFromTime = (time: number): number => {
  const hour = new Date(time * 1000).getHours();
  return hour;
};
