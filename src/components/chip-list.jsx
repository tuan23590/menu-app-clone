import React, { useCallback, useId, useImperativeHandle, useState } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useControlledValue } from '@/hooks/use-controlled-value'
import { clsx } from '@/utils/clsx'

import { Chip } from './chip'


export const ChipList = React.forwardRef((props, ref) => {
  const {
    value,
    onChange,
    defaultValue,
    options,
    className,
    selectedVariant = 'primary',
    defaultVariant = 'filled',
  } = props
  const [selected, setSelected] = useControlledValue({ value, defaultValue })
  const [swiper, setSwiper] = useState()

  const id = useId()

  const isAnimated = useCallback(() => {
    const gap = 8
    const offsetBeforeAndAfter = 16
    const slides = document.querySelectorAll(`.swiper-wrapper-${CSS.escape(id)} .swiper-slide`)
    const spaces = gap * (slides.length - 1) + offsetBeforeAndAfter
    const totalWidth = Array.from(slides).reduce((acc, slide) => acc + (slide).offsetWidth, spaces)
    return totalWidth > window.innerWidth
  }, [id])

  async function handleSelect(option) {
    setSelected(option)
    onChange?.(option)
  }

  useImperativeHandle(
    ref,
    () => ({
      setActive: (item) => {
        const selectOption = options.find((option) => option.value === item)
        if (!selectOption) return
        if (selected?.value === selectOption.value) return
        setSelected(selectOption)
        const index = options.findIndex((option) => option.value === item)
        if (isAnimated()) swiper?.slideTo(index)
      },
    }),
    [isAnimated, options, selected?.value, setSelected, swiper],
  )
  return (
    <div className={clsx(className)} id={id}>
      <Swiper
        onSwiper={setSwiper}
        modules={[FreeMode]}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode
        centeredSlides
        centeredSlidesBounds
        slidesOffsetAfter={8}
        slidesOffsetBefore={8}
        wrapperClass={`swiper-wrapper swiper-wrapper-${id}`}
      >
        {options.map((option, index) => (
          <SwiperSlide key={option.value} style={{ width: 'auto' }}>
            <Chip
              id={`${id}-${option.value}`}
              key={option.value}
              variant={option.value === selected?.value ? selectedVariant : defaultVariant}
              onClick={() => {
                handleSelect(option)
                if (isAnimated()) swiper?.slideTo(index)
              }}
            >
              {option.label}
            </Chip>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
})

export default ChipList
