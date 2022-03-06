import React from "react";
import { APIResponse } from "../api";
import ErrorFetching from "./ErrorFetching";

type NetworkViewProps = {
  isLoading: boolean,
  skeleton: JSX.Element,
  data: APIResponse<any> | undefined,
  errorTitle: string,
  refetch: Function,
  render: JSX.Element
}

function NetworkView({ isLoading, skeleton, data, errorTitle, refetch, render } : NetworkViewProps) {
  return (
    <>
      {
        isLoading ? (
          skeleton
        ) : (data === undefined || data.error) ? (
          <ErrorFetching
            title={errorTitle}
            error={data?.error}
            refetch={refetch}
          />
        ) : (
          render
        )
      }
    </>
  )
}

export default NetworkView