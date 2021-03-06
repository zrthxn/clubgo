import React, { Component, ReactChild, ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'default'
  size?: 'small' | 'medium' | 'large'
  variant?: 'outlined' | 'contained' | 'text' | 'unconstrained'
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
    <button { ...props } className={buttonStyle} style={props.style}>
      {
        props.children
      }
    </button>
  )
}

export default Button
