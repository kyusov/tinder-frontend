import { CSSProperties, FC, MutableRefObject, useEffect, useState } from 'react'
import { KeenSliderHooks, KeenSliderInstance, useKeenSlider } from 'keen-slider/react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { User } from '@types'

import { LeftArrowIcon, RigthArrowIcon } from '@components'
import {
	tinderCard,
	tinderCardContent,
	tinderCardContentMore,
	tinderCardContentWrap,
	tinderCardControls,
	tinderCardDecision,
	tinderCardDot,
	tinderCardDotActive,
	tinderCardDots,
	tinderCardGallery,
	tinderCardGalleryLazyPicture,
	tinderCardGalleryPicture,
	tinderCardLeftControl,
	tinderCardMarkerLike,
	tinderCardMarkerNope,
	tinderCardOptions,
	tinderCardOptionsAge,
	tinderCardOptionsInfo,
	tinderCardOptionsInterest,
	tinderCardOptionsItem,
	tinderCardOptionsItemActive,
	tinderCardOptionsMain,
	tinderCardOptionsName,
	tinderCardOptionsWrap,
	tinderCardRightControl,
} from './Card.module.scss'

import 'keen-slider/keen-slider.min.css'

interface CardProps {
	user: User
	styles?: CSSProperties
	onLike: (userId: number) => void
	onDislike: (userId: number) => void
}

interface CardControlProps {
	currentSlide: number
	instanceRef: MutableRefObject<KeenSliderInstance<{}, {}, KeenSliderHooks> | null>
	isDrag?: boolean
	className?: string
}

interface CardDotsProps extends CardControlProps {}

const Card: FC<CardProps> = ({ user, styles = {}, onLike, onDislike }) => {
	const x = useMotionValue(0)
	const rotate = useTransform(x, [-700, -500, 500, 700], [-60, -45, 45, 60])
	const opacityNopeValue = useTransform(x, [0, -150, -200], [0, 0.5, 1])
	const opacityLikeValue = useTransform(x, [0, 150, 200], [0, 0.5, 1])
	const controls = useAnimation()
	const [isDrag, setIsDrag] = useState(false)

	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [loadedSlides, setLoadedSlides] = useState<boolean[]>([])

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			const currentSlideIndex = slider.track.details.rel
			setCurrentSlide(currentSlideIndex)
		},
		created() {
			setLoaded(true)
		},
		rubberband: false,
		drag: false,
		defaultAnimation: {
			duration: 0,
		},
	})

	const handleLike = (userId: number) => onLike(userId)
	const handleDislike = (userId: number) => onDislike(userId)

	useEffect(() => {
		const new_loaded = [...loadedSlides]
		new_loaded[currentSlide] = true
		setLoadedSlides(new_loaded)
	}, [currentSlide])

	return (
		<motion.div
			drag
			dragConstraints={{ top: -100, left: -1000, right: 1000, bottom: -100 }}
			dragTransition={{ bounceStiffness: 185, bounceDamping: 12.5 }}
			dragSnapToOrigin
			onDragTransitionEnd={() => setIsDrag(false)}
			dragElastic={1}
			whileDrag={{ cursor: 'grab' }}
			className={tinderCard}
			style={{ rotate: rotate, x: x, ...styles }}
			animate={controls}
			onDragStart={() => setIsDrag(true)}
			onDragEnd={(_, info) => {
				if (Math.abs(info.offset.x) > 200) {
					controls.start({
						x: info.offset.x < 0 ? -2000 : 2000,
						y: info.offset.y,
						transition: { type: 'tween', duration: 0.65 },
					})

					if (info.offset.x < 0) {
						handleDislike(user.id)
					} else {
						handleLike(user.id)
					}
				}
			}}
			onPointerDownCapture={(e) => isDrag && e.stopPropagation()}
		>
			{loaded && instanceRef.current && (
				<>
					<CardArrowControls isDrag={isDrag} currentSlide={currentSlide} instanceRef={instanceRef} />
					<CardDots currentSlide={currentSlide} instanceRef={instanceRef} />
				</>
			)}
			<div ref={sliderRef} className={`${tinderCardGallery} keen-slider`}>
				<motion.div className={tinderCardMarkerNope} style={{ opacity: opacityNopeValue }}>
					Nope
				</motion.div>
				<motion.div className={tinderCardMarkerLike} style={{ opacity: opacityLikeValue }}>
					like
				</motion.div>
				{user.photos.map((picture, index) => (
					<div key={picture} className={`${tinderCardGalleryLazyPicture} keen-slider__slide`}>
						<img
							loading="lazy"
							className={tinderCardGalleryPicture}
							src={loadedSlides[index] ? picture : '/b.png'}
						/>
					</div>
				))}
			</div>
			<div className={tinderCardContent}>
				<div className={tinderCardContentWrap}>
					<div>
						<div className={tinderCardOptionsMain}>
							<span className={tinderCardOptionsName}>{user.name}</span>
							<span className={tinderCardOptionsAge}>{user.age}</span>
						</div>
						<div className={tinderCardOptions}>
							<div className={tinderCardOptionsWrap}>
								<CardOptions user={user} index={currentSlide} />
							</div>
						</div>
					</div>
					<div className={tinderCardContentMore}>
						<svg viewBox="0 0 24 24">
							<path
								fill="#fff"
								d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className={tinderCardDecision}>
					{/* hello */}
			</div>
		</motion.div>
	)
}

const CardOptions: FC<{ user: User; index: number }> = ({ user, index }) => {
	return (
		<>
			<div
				className={`${tinderCardOptionsItem} ${tinderCardOptionsInfo} ${
					index === 0 && user.about ? tinderCardOptionsItemActive : ''
				}`}
			>
				{user.about}
			</div>
			<div
				className={`${tinderCardOptionsItem} ${
					user.residence && index === 1 || index > 2 ? tinderCardOptionsItemActive : ''
				}`}
			>
				{Boolean(user.residence) && <div>Живет в городе {user.residence}</div>}
				{Boolean(user.fromYou) && <div>{user.fromYou} км от вас</div>}
			</div>
			<div
				className={`${tinderCardOptionsItem} ${
					index === 2 && user.interests.length > 0 ? tinderCardOptionsItemActive : ''
				}`}
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '4px',
				}}
			>
				{user.interests.length > 0 && user.interests.map((el) => <CardOptionsInterest key={el} text={el} />)}
			</div>
		</>
	)
}

const CardOptionsInterest: FC<{ text: string }> = ({ text }) => {
	return <div className={tinderCardOptionsInterest}>{text}</div>
}

const CardArrowControls: FC<CardControlProps> = ({ currentSlide, instanceRef, isDrag }) => {
	return (
		<div className={`${tinderCardControls}`}>
			<div
				className={tinderCardLeftControl}
				onClick={() => {
					!isDrag && instanceRef.current?.prev()
				}}
			>
				<LeftArrowIcon style={{ left: 0, margin: '0 10px' }} disabled={currentSlide === 0} />
			</div>
			<div
				className={tinderCardRightControl}
				onClick={() => {
					!isDrag && instanceRef.current?.next()
				}}
			>
				<RigthArrowIcon
					style={{ right: 0, margin: '0 10px' }}
					disabled={
						currentSlide ===
						(instanceRef.current?.track.details.slides.length
							? instanceRef.current?.track.details.slides.length - 1
							: 0)
					}
				/>
			</div>
		</div>
	)
}

const CardDots: FC<CardDotsProps> = ({ currentSlide, instanceRef }) => {
	return (
		<div className={tinderCardDots}>
			{[...Array(instanceRef.current?.track.details.slides.length).keys()].map((idx) => {
				return (
					<button
						key={idx}
						onClick={() => {
							instanceRef.current?.moveToIdx(idx)
						}}
						className={`${tinderCardDot} ${currentSlide === idx ? tinderCardDotActive : ''}`}
					></button>
				)
			})}
		</div>
	)
}

export default Card
