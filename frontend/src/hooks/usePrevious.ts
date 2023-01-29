import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    //assign the value of ref to the argument
    ref.current = value;
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current;
}
