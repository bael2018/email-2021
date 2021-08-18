import cls from './Helper.module.css'

export const Helper = ({text , appear , valid}) => {
    return (
        <div style={{display: appear ? 'block' : 'none' , background: valid ? '#00ccff' : 'red'}} className={cls.help}>
            {text}
        </div>
    )
}