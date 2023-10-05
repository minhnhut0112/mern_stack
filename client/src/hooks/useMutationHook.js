import { useMutation } from "react-query";

export const useMutationHook = (callback) => {
  const mutation = useMutation({
    mutationFn: callback,
  });
  return mutation;
};
