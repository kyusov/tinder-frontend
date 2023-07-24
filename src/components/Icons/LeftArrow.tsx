import { FC, CSSProperties } from "react"
import { icon, iconDisbled } from './Icons.module.scss'

const LeftArrow: FC<{ style?: CSSProperties, className?: string, onClick?: (e: any) => void, disabled: boolean }> = ({ style, className, onClick, disabled }) => {
	return (
		<svg className={`${className || ''} ${icon} ${disabled ? iconDisbled : ''}`} style={style} onClick={onClick} viewBox="0 0 24 24" width="24px" height="24px">
			<path d="M13.98 20.717a1.79 1.79 0 0 0 2.685 0 1.79 1.79 0 0 0 0-2.684l-7.158-6.62 7.158-6.8a1.79 1.79 0 0 0 0-2.684 1.79 1.79 0 0 0-2.684 0L5.929 9.98a1.79 1.79 0 0 0 0 2.684l8.052 8.052z" />
		</svg>
	)
}

export default LeftArrow
