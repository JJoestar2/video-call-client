export const append = (appendant) => {
    return (target) => {
      if (target instanceof Array) return target.concat(appendant);
  
      return { ...target, ...appendant };
    };
}

export function formatTimeHHMM(milliseconds) {
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}