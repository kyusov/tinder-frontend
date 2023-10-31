import { CSSProperties, FC, MutableRefObject, useEffect, useState } from 'react'
import { KeenSliderHooks, KeenSliderInstance, useKeenSlider } from 'keen-slider/react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { User } from '@types'

import { LeftArrowIcon, RigthArrowIcon } from '@components'
import styleClasses from './Card.module.scss'

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

	const bgNopeButtonColor = useTransform(
		x,
		[0, -275],
		['linear-gradient(#ffffff00 0%, #fd267a00 100%)', 'linear-gradient(#ffffff00 0%, #fd267a 100%)']
	)

	const bgLikeButtonColor = useTransform(
		x,
		[0, 275],
		['linear-gradient(#ffffff00 0%, #129e6800 100%)', 'linear-gradient(#ffffff00 0%, #129e68 100%)']
	)

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
			className={styleClasses.tinderCard}
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
			<div ref={sliderRef} className={`${styleClasses.tinderCardGallery} keen-slider`}>
				<motion.div className={styleClasses.tinderCardMarkerNope} style={{ opacity: opacityNopeValue }}>
					Nope
				</motion.div>
				<motion.div className={styleClasses.tinderCardMarkerLike} style={{ opacity: opacityLikeValue }}>
					like
				</motion.div>
				{user.photos.map((picture, index) => (
					<div key={picture} className={`${styleClasses.tinderCardGalleryLazyPicture} keen-slider__slide`}>
						<img
							loading="lazy"
							className={styleClasses.tinderCardGalleryPicture}
							src={loadedSlides[index] ? picture : '/b.png'}
						/>
					</div>
				))}
			</div>
			<div className={styleClasses.tinderCardContent}>
				<div className={styleClasses.tinderCardContentWrap}>
					<div>
						<div className={styleClasses.tinderCardOptionsMain}>
							<span className={styleClasses.tinderCardOptionsName}>{user.name}</span>
							<span className={styleClasses.tinderCardOptionsAge}>{user.age}</span>
						</div>
						{user.residence && (
							<span className={styleClasses.tinderCardOptionsResidence}>{user.residence}</span>
						)}
					</div>
					<div className={styleClasses.tinderCardContentMore}>
						<svg viewBox="0 0 24 24">
							<path
								fill="#fff"
								d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
							/>
						</svg>
					</div>
				</div>
				<div className={styleClasses.tinderCardDecision}>
					<button
						className={`${styleClasses.tinderCardControlsButton} ${
							true
								? styleClasses.tinderCardControlsButtonDisableColor
								: styleClasses.tinderCardControlsButtonRewindColor
						}`}
					>
						<svg viewBox="0 0 24 24">
							<defs>
								<linearGradient id="gradient--backgroundRewind" spreadMethod="pad">
									<stop offset="0%" stopColor="#f8a81f" />
									<stop offset="100%" stopColor="#ffdd6b" />
								</linearGradient>
							</defs>
							<path
								d="M12.119 4.599V3.307c0-1.216-.76-1.672-1.824-.988l-.608.304L6.04 5.13l-.456.304c-1.064.76-1.064 1.748 0 2.28l.38.38c.987.76 2.66 1.824 3.647 2.432l.532.304c.912.76 1.748.228 1.748-.912V8.246a5.125 5.125 0 0 1 5.167 5.167c0 2.888-2.28 5.092-5.167 5.092-3.04 0-5.32-2.28-5.32-5.168 0-.912-.76-1.671-1.747-1.671-1.064 0-1.824.76-1.824 1.671C3 18.125 6.951 22 11.815 22c4.787 0 8.738-3.8 8.738-8.663.076-4.711-3.875-8.51-8.662-8.51l.228-.228z"
								fill={`${true ? '#b9bfc8' : 'url(#gradient--backgroundRewind)'}`}
							/>
						</svg>
					</button>

					<motion.button
						className={`${styleClasses.tinderCardControlsButton} ${styleClasses.tinderCardControlsButtonDislikeColor}`}
						style={{
							background: bgNopeButtonColor,
						}}
					>
						<svg viewBox="0 0 24 24">
							<defs>
								<linearGradient id="gradient--backgroundNope" spreadMethod="pad">
									<stop offset="0%" stopColor="#fd267a" />
									<stop offset="100%" stopColor="#ff6036" />
								</linearGradient>
							</defs>
							<path
								d="m15.44 12 4.768 4.708c1.056.977 1.056 2.441 0 3.499-.813 1.057-2.438 1.057-3.413 0L12 15.52l-4.713 4.605c-.975 1.058-2.438 1.058-3.495 0-1.056-.813-1.056-2.44 0-3.417L8.47 12 3.874 7.271c-1.138-.976-1.138-2.44 0-3.417a1.973 1.973 0 0 1 3.25 0L12 8.421l4.713-4.567c.975-1.139 2.438-1.139 3.413 0 1.057.814 1.057 2.44 0 3.417L15.44 12Z"
								fill="url(#gradient--backgroundNope)"
							/>
						</svg>
					</motion.button>

					<button
						className={`${styleClasses.tinderCardControlsButton} ${styleClasses.tinderCardControlsButtonSuperLikeColor}`}
					>
						<svg viewBox="0 0 24 24">
							<defs>
								<linearGradient id="gradient--backgroundSuperLike" spreadMethod="pad">
									<stop offset="0%" stopColor="#47a1ff" />
									<stop offset="100%" stopColor="#30f3ef" />
								</linearGradient>
							</defs>
							<path
								d="M21.06 9.06l-5.47-.66c-.15 0-.39-.25-.47-.41l-2.34-5.25c-.47-.99-1.17-.99-1.56 0L8.87 7.99c0 .16-.23.4-.47.4l-5.47.66c-1.01 0-1.25.83-.46 1.65l4.06 3.77c.15.16.23.5.15.66L5.6 20.87c-.16.98.4 1.48 1.33.82l4.69-2.79h.78l4.69 2.87c.78.58 1.56 0 1.25-.98l-1.02-5.75s0-.4.23-.57l3.91-3.86c.78-.82.78-1.64-.39-1.64v.08z"
								fill="url(#gradient--backgroundSuperLike)"
							></path>
						</svg>
					</button>

					<motion.button
						className={`${styleClasses.tinderCardControlsButton} ${styleClasses.tinderCardControlsButtonLikeColor}`}
						style={{
							background: bgLikeButtonColor,
						}}
					>
						<svg viewBox="0 0 24 24">
							<defs>
								<linearGradient id="gradient--backgroundLike" spreadMethod="pad">
									<stop offset="0%" stopColor="#21d07c" />
									<stop offset="100%" stopColor="#30f3ef" />
								</linearGradient>
							</defs>
							<path
								d="M21.994 10.225c0-3.598-2.395-6.212-5.72-6.212-1.78 0-2.737.647-4.27 2.135C10.463 4.66 9.505 4 7.732 4 4.407 4 2 6.62 2 10.231c0 1.52.537 2.95 1.533 4.076l8.024 7.357c.246.22.647.22.886 0l7.247-6.58.44-.401.162-.182.168-.174a6.152 6.152 0 0 0 1.54-4.09"
								fill="url(#gradient--backgroundLike)"
							/>
						</svg>
					</motion.button>

					<button
						className={`${styleClasses.tinderCardControlsButton} ${styleClasses.tinderCardControlsButtonBoostColor}`}
					>
						<svg viewBox="0 0 24 24">
							<defs>
								<linearGradient id="gradient--backgroundBoost" spreadMethod="pad">
									<stop offset="0%" stopColor="#a11aeb" />
									<stop offset="100%" stopColor="#cc7afb" />
								</linearGradient>
							</defs>
							<path
								d="M15.979 14.018c.637-.638.51-1.275-.192-1.722l-1.275-.765c-.638-.383-1.148-1.275-.956-2.104L15.15 2.73c.191-.765-.128-.956-.765-.446L6.414 9.937c-.638.638-.51 1.275.19 1.722l1.276.765c.638.382 1.148 1.275.957 2.168l-1.658 6.632c-.191.829.191 1.02.765.446l8.035-7.652z"
								fill="url(#gradient--backgroundBoost)"
							/>
						</svg>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

const CardArrowControls: FC<CardControlProps> = ({ currentSlide, instanceRef, isDrag }) => {
	return (
		<div className={`${styleClasses.tinderCardControls}`}>
			<div
				className={styleClasses.tinderCardLeftControl}
				onClick={() => {
					!isDrag && instanceRef.current?.prev()
				}}
			>
				<LeftArrowIcon style={{ left: 0, margin: '0 10px' }} disabled={currentSlide === 0} />
			</div>
			<div
				className={styleClasses.tinderCardRightControl}
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
		<div className={styleClasses.tinderCardDots}>
			{[...Array(instanceRef.current?.track.details.slides.length).keys()].map((idx) => {
				return (
					<button
						key={idx}
						onClick={() => {
							instanceRef.current?.moveToIdx(idx)
						}}
						className={`${styleClasses.tinderCardDot} ${
							currentSlide === idx ? styleClasses.tinderCardDotActive : ''
						}`}
					></button>
				)
			})}
		</div>
	)
}

export default Card
