import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Q_GET_SHORT_URLS } from '../../../api/graphql/getShortUrls';
import { setAllLinksCurrentPage, setAllLinksNodes, setAllLinksTotal } from '../../../state/slices/shorLinksSlice';
import { Paginator } from '../../../widgets/common/Paginator';
import { LinkList } from '../../../widgets/shortLinks/LinkList';
import s from './AllLinks.module.scss';

export const AllLinks = React.memo(() => {
  
  const client = useApolloClient()
  const {allLinks: {nodes, pagination: {total, currentPage} }, wereNewClicks } = useSelector((state) => state.shortLinks)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate= useNavigate()
  
  const page = params.page ? parseInt(params.page) : currentPage
  const pageSize = 10

  useEffect(() => {
    dispatch(setAllLinksCurrentPage(page))
  }, [page])


  useEffect(() => {
    
    const fetchData = async () => {
      
      let queryOptions = { query: Q_GET_SHORT_URLS, variables: {page: page, pageSize: pageSize} }

      if(wereNewClicks) {
        queryOptions.fetchPolicy = "no-cache"
      }

      const response =  await client.query(queryOptions)
      
      const links = response?.data?.short_urls?.data.map(u =>  {
        return {id: u.id, url: u.url, short_url: u.short_url, clicks: u.clicks} 
      })
  
      if(links) {
        const {total} = response.data.short_urls.paginatorInfo
        dispatch(setAllLinksNodes(links))
        dispatch(setAllLinksTotal(total))
      }
    }

    fetchData()

  },[page])

  const handlePageClick = (current) => {
    navigate(`/${current}`)
  }

  return (
    <div className={s.c} >
      <div className={s.c__title}>Список ссылок</div>
      <div className={s.c__content}>
        {nodes.length ? <LinkList links={nodes} /> : <div className={s['c__no-links']} >Список пуст</div> }
      </div>

      <Paginator current={page} pageSize={pageSize} total={total} onChange={handlePageClick} />

    </div>
  )
})
