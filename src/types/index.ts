type Zodiac =
	| 'Козерог'
	| 'Водолей'
	| 'Рыбы'
	| 'Овен'
	| 'Телец'
	| 'Близнецы'
	| 'Рак'
	| 'Лев'
	| 'Дева'
	| 'Весы'
	| 'Скорпион'
	| 'Стрелец'

type Education =
	| 'Бакалавриат'
	| 'Учусь в колледже'
	| 'Средняя школа'
	| 'Доктор наук'
	| 'Аспирантура'
	| 'Магистратура'
	| 'Техникум'

type Children = 'Я хочу детей' | 'Я не хочу детей' | 'У меня есть дети, и хочу еще' | 'У меня есть дети, но больше не хочу' | 'Пока не знаю'
type Communication = 'Много переписываюсь' | 'Общаюсь по телефону' | 'Люблю видеочаты' | 'Не люблю чатиться' | 'Лучше встречусь лично'
type Manifestations = 'Жесты внимания' | 'Подарки' | 'Прикосновения' | 'Комплименты' | 'Время вместе'
type Pet = 'Собака' | 'Кошка' | 'Рептилия' | 'Амфибия' | 'Птица' | 'Рыбки' | 'Нет, но хочу' | 'Другое' | 'Черепаха' | 'Хомяк' | 'Кролик' | 'Нет питомцев' | 'Все перечисленные' | 'Хочу питомца' | 'У меня аллергия'
type Drink = 'Это не для меня' | 'Я не пью' | 'Я за трезвость' | 'По особым случаям' | 'В компании по выходным' | 'Почти каждый вечер'
type Smoke = 'Курю за компанию' | 'Курю, когда выпью' | 'Не курю' | 'Курю' | 'Бросаю'
type Sport = 'Каждый день' | 'Часто' | 'Иногда' | 'Никогда'
type Eat = 'Веганство' | 'Вегетарианство' | 'Пескетарианство' | 'Кошерная еда' | 'Халяль' | 'Люблю мясо' | 'Ем всё' | 'Другое'
type Social = 'Инфлюенсер' | 'Активный пользователь' | 'Меня там нет' | 'Просто смотрю'
type SexualOrientation = 'Гетеро' | 'Гей' | 'Лесбиянка' | 'Бисексуал(ка)' | 'Асексуал(ка)' | 'Демисексуал(ка)' | 'Пансексуал(ка)' | 'Квир' | 'Не определился(лась)'

export interface User {
	id: number
	photos: string[]
	about: string
	interests: string[]
	age: number
	name: string
	more: {
		zodiac?: Zodiac
		education?: Education
		children?: Children
		communication?: Communication
		manifestationsOfLove?: Manifestations
	}
	lifestyle: {
		pet?: Pet
		drink?: Drink
		smoke?: Smoke
		sport?: Sport
		eat?: Eat
		social?: Social
	}
	workPosition?: string
	company?: string
	education?: string
	residence?: string
	fromYou?: number
	gender: 'm' | 'f'
	sexualOrientation?: SexualOrientation
}