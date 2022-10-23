import { gql } from "@apollo/client";

export const Q_GET_SHORT_URLS = gql`

  query getShortUrls($page: Int, $pageSize: Int) { 
    short_urls(page: $page, first: $pageSize) {
      data {
        id, url, short_url, clicks
      }
      paginatorInfo {
        total
        perPage
        lastPage
      }
    }
  }
`;