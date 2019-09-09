import React, { Component, ReactChild, ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'
import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactChild | ReactNode | HTMLElement,
  style?: CSSProperties,
  color?: 'secondary' | 'default',
  size?: 'small' | 'medium' | 'large'
}
export function Button(props:ButtonProps) {
  var buttonStyle = "button"
  
  if(props.size!==undefined)
    buttonStyle += " " + props.size

  if(props.color!==undefined)
    buttonStyle += " " + props.color

  return (
    <button { ...props } style={props.style} className={buttonStyle}>
      {
        props.children
      }
    </button>
  )
}

export default Button
