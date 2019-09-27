import React, { Component, InputHTMLAttributes, CSSProperties } from 'react'
import './Textbox.scss'

export interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {  
  style?: CSSProperties
  color?: 'dark' | 'light'
  variant?: 'outlined' | 'solid'
  margins?: 'dense' | 'normal' | 'wide'
  unconstrained?: boolean
}
export function Textbox(props:TextboxProps) {  
  var textboxStyle = "textbox"
  
  if(props.variant!==undefined)
    textboxStyle += " " + props.variant

  if(props.color!==undefined)
    textboxStyle += " " + props.color

  if(props.margins!==undefined)
    textboxStyle += " " + props.margins

  if(props.unconstrained)
    textboxStyle += " unconstrained"

  return (
    <input className={textboxStyle} style={props.style} type={props.type} 
      placeholder={props.placeholder}
      { ...props }
    />
  )
}

export default Textbox
