import { useRef, useState } from 'react'
import { Helper } from '../helper';
import cls from './Email.module.css'

const Email = () => {
    const url = [
        {
            key: 'g',
            dom: ['g', 'm' , 'a' , 'i' , 'l' , '.' , 'c' , 'o' , 'm']
        }
    ]

    const errors = [",", ":", ";", "!", "#", "%", "*", "(", ")", "=", "+", "{", "}", "[", "]/", "'", "/" , ' ']
    const [email , setEmail] = useState('')
    const [warning , setWarning] = useState('')
    const code = useRef('')
    const [valid , setValid] = useState(false)
    const [showWarning , setShowWarning] = useState(false)
    const symbol = email.indexOf("@");
    let result

    url.forEach(({key , dom}) => {
        if(email.toLowerCase().includes(key.toLowerCase())){
            const res = email.split('')
            const filter = res.filter(item => item !== key)
            result = filter.concat(dom)
        }
    })

    useRef(code.current = result)

    const submitEmailBtn = e => {
        e.preventDefault()
        setShowWarning(true)

        errors.forEach(item => {
            if(email.toLowerCase().includes(item)){
                setValid(false)
                setShowWarning(true)
                setWarning('Адрес не должен содержать не понятные символы !')
            }
        })

        if(email == ''){
            setValid(false)
            setShowWarning(true)
            setWarning('Введите адрес электронной почты !')
        }else if(email.indexOf('.') === -1){
            setShowWarning(true)
            setValid(false)
            setWarning('Отсутствуюет символ .')
        }else if(symbol == -1){
            setShowWarning(true)
            setValid(false)
            setWarning('Отсутствуюет символ @')
        }else if((symbol < 1) || (symbol > email.length - 5)){
            setShowWarning(true)
            setValid(false)
            setWarning('Адрес электронной почты Неверный')
        }else{
            setShowWarning(true)
            setValid(true)
            setWarning('Адрес электронной почты был веден ВЕРНО')
        }
    }
    
    return (
        <section className={cls.email}>
            <h2 className={cls.email_title}>Введите свой адрес электронной почты</h2>
            <form action="address">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
                <p onClick={() => setEmail(code.current)}>{code.current}</p>
                <Helper valid={valid} appear={showWarning} text={warning}/>
                <button onClick={submitEmailBtn} type='submit'>ПОДТВЕРДИТЬ</button>
            </form>
        </section>
    )
}

export default Email