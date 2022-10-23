import React from 'react'
import locale from 'rc-pagination/es/locale/ru_RU';
import clsx from 'clsx'
import './Paginator.scss'
import Pagination from 'rc-pagination';

/*
  Обертка для rc-pagination c предопределнными пропсами.
  Достаточно передать в компонент current, pageSize, total и функцию onChange
*/

export const Paginator = React.memo((props) => {
  
  const defaultProps = {
    className: 'c__pagination',
    showPrevNextJumpers: true,
    jumpPrevIcon: <span className={clsx('c__pagination-jumper', 'c__pagination-jumper-prev')}>...</span>,
    jumpNextIcon: <span className={clsx('c__pagination-jumper', 'c__pagination-jumper-next')}>...</span>,
    locale: locale,
    hideOnSinglePage: true
  }

  const finalProps = {...defaultProps, ...props}
  
  return (
    <Pagination {...finalProps} />
  )
})

