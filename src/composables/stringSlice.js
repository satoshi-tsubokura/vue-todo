export function useStringSlice(target, maxCharLen, suffixStr = ' .....') {
  if (target.length > maxCharLen) {
    return target.slice(0, maxCharLen) + suffixStr;
  }
}
