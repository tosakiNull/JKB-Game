import { useRef, useEffect } from 'react';

/**
 * 取上一次render前的值
 * @param {any} value 
 * @returns 上一次的值
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;