import React from 'react'
import { useDispatch } from 'react-redux'
import { setClicks } from '../../state/slices/shorLinksSlice'
import { AddLinkForm } from './blocks/AddLinkForm'
import { AllLinks } from './blocks/AllLinks'
import s from './HomePage.module.scss'
import { MyLinks } from './blocks/MyLinks'
import {useWebSocketEventHandler } from './useWebSocketEventHandler'

export const HomePage = React.memo(() => {
  
  const dispatch = useDispatch()

  const newClickHandler = (eventName, payload) => {
    
    const {short_url:{id, clicks}} = payload
    dispatch(setClicks({id, clicks}))

    console.log(eventName)
    console.log(id)
    console.log(clicks)
  }

  useWebSocketEventHandler('new_click', 'btti_database_short_urls', newClickHandler)

  return (
    <div className={s.page}>
        <div className={s.page__col}>
          <div className={s.page__form}><AddLinkForm /></div>
          <div className={s['page__my-links']}><MyLinks /></div>
        </div>
        <div className={s.page__col}>
            <AllLinks />
        </div>
    </div>
  )
})