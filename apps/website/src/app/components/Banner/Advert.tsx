import React, { Component } from 'react'
import { Image } from '@clubgo/website/components'
import './Banner.scss'

interface AdvertProps {
  image: string
  id?: string
  link?: string
}

export function Advert(props:AdvertProps) {
  return (
    <div id={props.id} className="advert">
      <a href={props.link}></a>
      <img src={props.image} alt="advert"/>
    </div>
  )
}

export default Advert