import cls from './style.module.sass'

export const Header = () => {
    return (
        <div className={cls.main}>
            <h2>Comment Tracker MVP</h2>
            <span>Track and manage comments for your design</span>
        </div>
    )
}
