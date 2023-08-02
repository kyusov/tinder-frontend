import { FC } from 'react'
import { motion } from 'framer-motion'
import { sidebarContent, sidebarHeader, sidebarHeaderName, sidebarHeaderPicture } from './Sidebar.module.scss'

const Sidebar: FC = () => {
	return (
		<aside className={sidebarContent}>
			<motion.div
				className={sidebarHeader}
				animate={{
					background: [
						'linear-gradient(45deg, #fd267a, #ff6036)',
						'linear-gradient(90deg, #fd267a, #ff6036)',
						'linear-gradient(180deg, #fd267a, #ff6036)',	
						'linear-gradient(270deg, #fd267a, #ff6036)',
						'linear-gradient(360deg, #fd267a, #ff6036)',
					],
				}}
                transition={{
                    duration: 60,
                    easings: ['easeInOut'],
                    repeat: Infinity,
                    repeatType: 'mirror'
                }}
			>
				<img
					className={sidebarHeaderPicture}
					width={52}
					height={52}
					src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80"
					alt="Profile"
				/>
				<h4 className={sidebarHeaderName}>Мария</h4>
			</motion.div>
		</aside>
	)
}

export default Sidebar
