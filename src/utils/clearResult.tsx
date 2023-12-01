import { useEffect, useState } from "react";

export const useClearDisplayResult = () => {
  const [clearDisplayResult, setClearDisplayResult] = useState<boolean>(false);

  useEffect(() => {



  }, []);

  return { clearDisplayResult, setClearDisplayResult };
};
