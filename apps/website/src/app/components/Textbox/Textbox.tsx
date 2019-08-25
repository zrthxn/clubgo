import React, { Component, InputHTMLAttributes, CSSProperties } from 'react'
import './Textbox.scss'

export interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {  
  style?: CSSProperties,
  color?: 'dark' | 'light',
  variant?: 'outlined' | 'solid',
}
export function Textbox(props:TextboxProps) {  
  var textboxStyle = "textbox"
  
  if(props.variant!==undefined)
    textboxStyle += " " + props.variant

  if(props.color!==undefined)
    textboxStyle += " " + props.color

  return (
    <input className={textboxStyle} style={props.style} type={props.type} placeholder={props.placeholder}/>
  )
}

export default Textbox
