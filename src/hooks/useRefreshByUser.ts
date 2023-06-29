import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";

export function useRefreshByUser<Key extends QueryKey>(queryKey: Key) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);
  const queryClient = useQueryClient();

  const refetchByUser = useCallback(async () => {
    setIsRefetchingByUser(true);
    try {
      await queryClient.refetchQueries({ queryKey, exact: true });
    } finally {
      setIsRefetchingByUser(false);
    }
  }, [queryKey]);

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
