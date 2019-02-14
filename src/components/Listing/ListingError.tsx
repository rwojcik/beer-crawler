import React from "react";
import { ErrorSnackbar } from "./ErrorSnackbar";

type ListingErrorProps = {
  errors: string | undefined;
  onRetry: () => void;
};

export const ListingError: React.FunctionComponent<ListingErrorProps> = ({errors, onRetry}) => {
  if (errors) {
    return (
      <ErrorSnackbar
        error={errors}
        onRetry={onRetry}
      />
    );
  }

  return null;
};
