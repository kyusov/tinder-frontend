import { FC, useState } from 'react'
import { Card } from '@components'
import styleClasses from './Deck.module.scss'
import { User } from '@types'

const users: User[] = [
	{
		id: 2,
		name: 'Мария',
		photos: [
			'https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80',
			'https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80',
			'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=80',
		],
		about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat inventore impedit voluptate magnam beatae perspiciatis consequuntur vel quam quisquam, eveniet nam quibusdam natus ducimus dolorum, quis aliquid cupiditate, fugit alias',
		gender: 'f',
		interests: ['K-pop', 'Феминизм', 'Тату'],
		lifestyle: {},
		more: {},
		sexualOrientation: 'Гетеро',
		age: 25,
		residence: 'Москва',
		fromYou: 11,
	},
	{
		id: 3,
		name: 'Анна',
		photos: [
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			'https://images.unsplash.com/photo-1548361403-cb0c785eea54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		],
		about: 'Nothing',
		age: 20,
		gender: 'f',
		interests: [],
		lifestyle: {},
		more: {},
	},
]

const Deck: FC = () => {
	const [activeCardIndex, setActiveCardIndex] = useState(0)
	const [likedUsers, setLikedUsers] = useState<number[]>([])
	const [dislikedUsers, setDislikedUsers] = useState<number[]>([])

	return (
		<div className={styleClasses.tinderDeck}>
			{users.map((user, index) => (
				<Card
					styles={{ zIndex: users.length - index }}
					onLike={(userId) => {
						setLikedUsers([...likedUsers, userId])
						setActiveCardIndex(activeCardIndex + 1)
					}}
					onDislike={(userId) => {
						setDislikedUsers([...dislikedUsers, userId])
						setActiveCardIndex(activeCardIndex + 1)
					}}
					key={user.id}
					user={user}
					// isActive={index <= activeCardIndex + 1}
				/>
			))}
			{activeCardIndex > users.length - 1 && (
				<div className={styleClasses.tinderDeckEmpty}>
					<div>
						<video poster="https://www.emojiall.com/images/120/telegram/1f9d0.gif"></video>
						<video poster="https://www.emojiall.com/images/120/telegram/1f9d0.gif"></video>
						<video poster="https://www.emojiall.com/images/120/telegram/1f9d0.gif"></video>
					</div>
					<h4>Подбираем новые пары</h4>
				</div>
			)}
		</div>
	)
}

export default Deck
