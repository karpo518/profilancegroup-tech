import { useApolloClient } from '@apollo/client';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { M_CREATE_SHORT_URL } from '../../../api/graphql/createShortUrl';
import { addMyLink } from '../../../state/slices/shorLinksSlice';
import s from './AddLinkForm.module.scss';

export const AddLinkForm = React.memo(() => {
  
  const links = useSelector((state) => state.shortLinks.myLinks.nodes)
  
  const isNotDublicate = (url) => links.every(l => l.url !== url) || 'У этой страницы уже есть короткая ссылка!'
  
  const dispatch = useDispatch()
  
  const { register, 
          handleSubmit, 
          setError, 
          clearErrors, 
          reset, 
          formState } = useForm();
  const {errors, isSubmitting} = formState

  const client = useApolloClient();

  const [
    isSuccessfullySubmitted,
    setIsSuccessfullySubmitted,
  ] = React.useState(false);


  const onSubmit = async (formData) => { 

    const response = await client.mutate({ mutation: M_CREATE_SHORT_URL, variables: {url: formData.url } } )

    if(response.data.shorten_url.operation_status.status !== 'success' ) {
      const message = 'Не удалось создать короткую ссылку. Попробуйте позже или обратитесь в службу поддержки клиентов.';
      setError('url', {type: 'server', message: message});
    }
    else {
      // Добавляем
      const link = response.data.shorten_url.short_url;
      clearErrors()
      reset()
      setIsSuccessfullySubmitted(true)
      const {id, url, short_url} = link
      const clicks = link.clicks || 0
      dispatch(addMyLink({id, url, short_url, clicks}))
    }
  }

  const urlPattern = /(?:http\:\/\/[^\s]{4,2041}|https\:\/\/[^\s]{4,2040})/

  const urlValidators = {
    required: {value: true, message: 'Укажите ссылку, которую нужно сократить!'},
    pattern: {value: urlPattern, message: 'Указанная строка не является правильной ссылкой!'},
    validate: {isNotDublicate: isNotDublicate}
  }


  // 3 секунды показываем сообщение об успешной отправке
  useEffect(() => {
    if(isSuccessfullySubmitted) {
      setTimeout(() => { setIsSuccessfullySubmitted(false) }, 3000)
    }
  }, [isSuccessfullySubmitted])
  
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.form__description}>Введите ссылку</div>
      <div className={s.form__items}>
          <div className={clsx(s.form__item, s['form__item-left'])}>
              <div className={s['form__item-field']}>
                  <input className={clsx(s.form__input, s['form__input-text'])} 
                    {...register("url", urlValidators)} />
              </div>
              {errors.url && <div className={s['form__item-error']}>
                  {errors.url.message} 
              </div>}
          </div>
          <div className={clsx(s.form__item, s['form__item-right'])}>
              <input className={clsx(s.form__input, s['form__input-submit'])} 
                     type="submit"  
                     disabled={isSubmitting || isSuccessfullySubmitted} 
                     value="Сократить" />
          </div>
      </div>
      { isSuccessfullySubmitted && <div className={s.form__success}>Короткая ссылка создана!</div> }
    </form>
  )
})