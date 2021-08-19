import { useEffect, useState } from 'react'
import { Helper } from '../helper';
import cls from './Email.module.css'
import {errors, url} from '../url'

const Email = () => {
    const [email , setEmail] = useState('')
    const [warning , setWarning] = useState('')
    const [valid , setValid] = useState(false)
    const [showWarning , setShowWarning] = useState(false)
    const symbol = email.indexOf("@");
    let elems

    const email_begin = email?.slice(0 , symbol)
    const email_key = email?.slice(symbol + 1 , symbol + 2) || 0;
    url.forEach(({key , dom}) => {
        if(email_key === key){
            elems = email_begin.concat(dom)
        }else{
            return
        }
    })
    
    useEffect(() => {
        if(email === ''){
            setValid(false)
            setShowWarning(true)
            setWarning('Введите адрес электронной почты !')
        }else if(email !== ''){
            if((email.indexOf('.') === -1) || (symbol === -1)){
                setShowWarning(true)
                setValid(false)
                setWarning('Отсутствуют символы . или @')
            }else if((symbol < 1) || (symbol > email.length - 10)){
                setShowWarning(true)
                setValid(false)
                setWarning('Адрес электронной почты Неверный')
            }else{
                setShowWarning(true)
                setValid(true)
                setWarning('Адрес электронной почты был веден ВЕРНО')
            }
            errors.forEach(item => {
                if(email.toLowerCase().includes(item.toLowerCase())){
                    setValid(false)
                    setShowWarning(true)
                    setWarning('Адрес не должен содержать не понятные символы !')
                }
            })
        }
    } , [email])

    const refresh = () => {
        setEmail(elems)
    }
    
    return (
        <section className={cls.email}>
            <h2 className={cls.email_title}>Введите свой адрес электронной почты !</h2>
            <form action="address">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
                <p style={{display: elems ? 'block' : 'none'}} onClick={refresh}>{elems}</p>
                <Helper valid={valid} appear={showWarning} text={warning}/>
            </form>
        </section>
    )
}

export default Email