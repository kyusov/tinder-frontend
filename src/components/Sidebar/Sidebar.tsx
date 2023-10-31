import { FC } from 'react'
import { motion } from 'framer-motion'
import styleClasses from './Sidebar.module.scss'

const matches = [
	{
		img: 'https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80',
		id: 1,
		name: 'Марина',
	},
	{
		img: 'https://procyber.me/wp-content/uploads/2023/09/wp8776891.jpg',
		id: 2,
		name: 'Анна',
	},
]

const newMatches = [
	{
		img: 'https://cs14.pikabu.ru/post_img/big/2022/05/05/3/1651716779170925137.jpg',
		id: 213,
		name: 'Карина',
	},
]

const Sidebar: FC = () => {
	return (
		<aside className={styleClasses.sidebarContent}>
			<SidebarHeader />
			<SidebarNavigation />
			<SidebarContent matches={matches} newMatches={newMatches} />
		</aside>
	)
}

const SidebarHeader: FC = () => (
	<motion.header
		className={styleClasses.sidebarHeader}
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
			duration: 120,
			easings: ['easeInOut'],
			repeat: Infinity,
			repeatType: 'mirror',
		}}
	>
		<img
			className={styleClasses.sidebarHeaderPicture}
			width={52}
			height={52}
			src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80"
			alt="Profile"
		/>
		<h4 className={styleClasses.sidebarHeaderName}>Мария</h4>
	</motion.header>
)

const SidebarNavigation: FC = () => (
	<nav className={styleClasses.sidebarDeckNav}>
		<div className={styleClasses.sidebarDeckNavItem}>Пары</div>
		<div className={styleClasses.sidebarDeckNavItem}>Чаты</div>
	</nav>
)

const SidebarContent: FC<{
	matches: { id: number; name: string; img: string }[]
	newMatches: { id: number; name: string; img: string }[]
}> = ({ matches }) => (
	<div className={styleClasses.sidebarDeck}>
		<div className={`${styleClasses.sidebarDeckItemCount} ${styleClasses.sidebarDeckItem}`}>
			<img
				width={170}
				height={240}
				className={`${styleClasses.sidebarDeckItemCountPicture} ${
					newMatches.length > 0 ? styleClasses.sidebarDeckItemCountPictureBlurred : ''
				}`}
				loading="lazy"
				src={newMatches[0].img}
				alt="match"
			/>
			<h6 className={styleClasses.sidebarDeckCount}>{newMatches.length}</h6>
			<span className={styleClasses.sidebarDeckItemCountText}>{newMatches.length} лайка</span>
		</div>
		{matches.map((match) => (
			<div key={match.id} className={styleClasses.sidebarDeckItem}>
				<img
					width={170}
					height={240}
					className={styleClasses.sidebarDeckPicture}
					loading="lazy"
					src={match.img}
					alt="match"
				/>
				<h6 className={styleClasses.sidebarDeckText}>{match.name}</h6>
			</div>
		))}
	</div>
)

export default Sidebar
