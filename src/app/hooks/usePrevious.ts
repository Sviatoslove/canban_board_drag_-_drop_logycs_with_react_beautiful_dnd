import { useEffect, useRef } from 'react';

const usePrevious = (props: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = props;
  });
  return ref.current;
};

export default usePrevious;
