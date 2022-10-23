import clsx from 'clsx'
import React from 'react'
import s from './LinkList.module.scss'
export const LinkList = ({links}) => {
  
  const linkList = links.map(l => <LinkItem key={l.id} link={l} />)
  
  return (
    <div className={s.c}>
      {linkList}
    </div>
  )
}

export const LinkItem = React.memo(({link}) => {
  return (
    <div className={s.c__item}>
        <div className={ clsx(s['c__item-call'], s['c__item-id']) }>{link.id}</div>
        <div className={ clsx(s['c__item-call'], s['c__item-source-link']) }>
          <span className={s['c__item-label']}>Исходная ссылка:</span> <a href={link.url} className={s['c__item-link']} target="_blank" >{link.url}</a>
        </div>

      <div className={ clsx(s['c__item-call'], s['c__item-short-link']) }>
        <span className={s['c__item-label']}>Короткая ссылка:</span> <a href={link.short_url} className={s['c__item-link']} target="_blank" >{link.short_url}</a>
      </div>
      <div className={ clsx(s['c__item-call'], s['c__item-click-count']) }>
        <span className={ clsx(s['c__item-label'], s['click-count__label']) }>Количество кликов:</span> 
        <div className={ clsx(s['click-count__value'], s['c__item-round']) } > {link.clicks} </div>
      </div>
    </div>
  )
})