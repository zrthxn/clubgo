import React, { Component, ReactChild, ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'
import './Button.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactChild | ReactNode | HTMLElement,
  style?: CSSProperties,
  color?: 'secondary' | 'default',
  size?: 'small' | 'medium' | 'large'
}
export function Button(props:IButtonProps) {
  var buttonStyle = "button"
  
  if(props.size!==undefined)
    buttonStyle += " " + props.size

  if(props.color!==undefined)
    buttonStyle += " " + props.color

  return (
    <button style={props.style} className={buttonStyle} onClick={()=>{
      setTimeout(props.onClick, 250)
    }}>
      {
        props.children
      }
    </button>
  )
}

export default Button
