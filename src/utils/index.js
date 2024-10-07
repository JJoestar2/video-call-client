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

export const generateRoomName = (alphabet = 'abcdefghijklmnopqrstuvwxyz') => {
  let result = '';

  const alphabetLength = alphabet.length;

  while (result.length < 11) {
    if (result.length > 0 && result.length % 4 === 3) result+= '-';

    result+= alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  return result;
}