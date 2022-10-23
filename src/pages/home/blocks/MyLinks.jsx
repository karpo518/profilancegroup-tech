import React from 'react'
import { useSelector } from 'react-redux'
import { LinkList } from '../../../widgets/shortLinks/LinkList'
import s from './MyLinks.module.scss'

export const MyLinks = React.memo(() => {
  
  const links = useSelector((state) => state.shortLinks.myLinks.nodes)

  return (
    <div className={s.c}>
      <div className={s.c__title}>Мои ссылки</div>
      <div className={s.c__content}>
        {links.length ? <LinkList links={links} /> : <div className={s['c__no-links']} >У вас пока нет ссылок</div> }
      </div>
    </div>
  )
})