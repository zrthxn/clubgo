import React, { Component, ReactChild, ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'
import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'default'
  size?: 'small' | 'medium' | 'large'
  variant?: 'outlined' | 'contained' | 'text'
}
export function Button(props:ButtonProps) {
  var buttonStyle = 'button'
  
  if(props.size!==undefined)
    buttonStyle += ' ' + props.size

  if(props.color!==undefined)
    buttonStyle += ' ' + props.color

  if(props.variant!==undefined)
    buttonStyle += ' ' + props.variant

  buttonStyle += ' ' + props.className

  return (
    <button { ...props }
      style={props.style}
      className={buttonStyle}
    >
      {
        props.children
      }
    </button>
  )
}

export default Button
