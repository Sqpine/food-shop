import React, {useEffect, useState} from "react";
import sushi from '../../images/sushi.png'
import burgers from '../../images/burgers.png'
import pizza from '../../images/pizza.png'
import arrowLeft from '../../images/arrowLeft.png'
import arrowRight from '../../images/arrowRight.png'
import s from './homePage.module.scss'
import {Link} from "react-router-dom";

const content: ContentType[] = [
    {
        img: burgers,
        name: 'Burgers',
        slug: 'burgers'
    },
    {
        img: pizza,
        name: 'Pizza',
        slug: 'pizza'
    },
    {
        img: sushi,
        name: 'Sushi',
        slug: 'sushi'
    }
]
type ContentType = {
    img: string,
    name: string
    slug: string
}
export const HomePage = () => {
    const [activeIdContent, setActiveIdContent] = useState<number>(0)

    useEffect(() => {
        let timerId: NodeJS.Timeout
        timerId = setTimeout(() => {
            toRightSide()
        }, 3000)
        return () => {
            clearTimeout(timerId)
        }
    }, [activeIdContent])

    const toRightSide = () => {
        if (activeIdContent < content.length - 1) {
            setActiveIdContent(prevState => (prevState + 1))
        } else setActiveIdContent(0)
    }
    const toLeftSide = () => {
        if (activeIdContent > -1) {
            setActiveIdContent(prevState => prevState - 1)
        } else setActiveIdContent(content.length - 1)
    }

    return (
        <div className={s.slider}>
            <img width={70}
                 className={s.leftSlideArrow}
                 onClick={() => toLeftSide()}
                 src={arrowLeft}
                 alt="To slide"
            />
            <SliderContent content={content[activeIdContent]}/>
            <img width={70}
                 className={s.rightSlideArrow}
                 onClick={() => toRightSide()}
                 src={arrowRight}
                 alt="To slide"
            />
        </div>
    )
}

const SliderContent = (props: PropsType) => {
    return (
        <div className={s.content} style={{backgroundImage: `url(${props.content.img})`}}>
            <Link to={`${props.content.slug}`}>
                <h1 className={s.heroText}>{props.content.name}</h1>
            </Link>
        </div>
    )
}

type PropsType = {
    content: ContentType
}