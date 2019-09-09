import React, { Component } from 'react'
import { Image } from '@clubgo/website/components'
import './Banner.scss'

interface BannerProps {
  image: string
  id?: string
  link?: string
  onClick?: Function
}

export function Banner(props:BannerProps) {
  return (
    <div id={props.id} className="banner">
      <img src={props.image} alt="banner" onClick={()=>{
        if(props.onClick!==undefined)
          props.onClick()
      }}/>
    </div>
  )
}

export default Banner