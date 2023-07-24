import { FC, useState } from 'react'
import { Card } from '@components'
import { tinderDeck } from './Deck.module.scss'
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
	// {
	// 	id: 1,
	// 	name: 'John',
	// 	age: 25,
	// 	bio: {
	// 		description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	// 	},
	// 	gender: 1,
	// 	position: '42 km from you',
	// 	recentlyActive: true,
	// 	photos: [
	// 		'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1500389723459-ca24a5564899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1482849737880-498de71dda8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80',
	// 	],
	// },
	// {
	// 	id: 3,
	// 	name: 'Alex',
	// 	bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	// 	profilePictures: [
	// 		'https://images.unsplash.com/photo-1504199367641-aba8151af406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80',
	// 		'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=795&q=80',
	// 	],
	// },
	// {
	// 	id: 4,
	// 	name: 'John',
	// 	bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	// 	profilePictures: [
	// 		'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1500389723459-ca24a5564899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1482849737880-498de71dda8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80',
	// 	],
	// },
	// {
	// 	id: 5,
	// 	name: 'Mary',
	// 	bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	// 	profilePictures: [
	// 		'https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80',
	// 		'https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=80',
	// 		'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=80',
	// 	],
	// },
	// {
	// 	id: 6,
	// 	name: 'Alex',
	// 	bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	// 	profilePictures: [
	// 		'https://images.unsplash.com/photo-1504199367641-aba8151af406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
	// 		'https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80',
	// 		'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=795&q=80',
	// 	],
	// },
]

const Deck: FC = () => {
	const [activeCardIndex, setActiveCardIndex] = useState(0)
	const [likedUsers, setLikedUsers] = useState<number[]>([])
	const [dislikedUsers, setDislikedUsers] = useState<number[]>([])

	console.log('likedUsers', likedUsers)
	console.log('dislikedUsers', dislikedUsers)

	return (
		<div className={tinderDeck}>
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
		</div>
	)
}

export default Deck
