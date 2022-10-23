import { gql } from "@apollo/client";

export const M_CREATE_SHORT_URL = gql`
  mutation getShortUrl($url: String!) {
    shorten_url(url: $url) {
      short_url { id, url, short_url, clicks }
      operation_status { status }
    }
  }
`;