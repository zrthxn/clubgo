import React, { Component, InputHTMLAttributes, CSSProperties, ReactElement } from 'react'
import './Textbox.scss'

export interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'dark' | 'light'
  variant?: 'outlined' | 'solid'
  margins?: 'dense' | 'normal' | 'wide'
  unconstrained?: boolean

  InputAdornments?: Array<{
    position: 'start' | 'end'
    element: typeof React.Component | ReactElement
  }>
}

export class Textbox extends Component<TextboxProps> {  
  state = {
    focussed: false
  }

  textboxStyle = "textbox-container"
  
  render() {   
    if(this.props.variant!==undefined)
      this.textboxStyle += " " + this.props.variant

    if(this.props.color!==undefined)
      this.textboxStyle += " " + this.props.color

    if(this.props.margins!==undefined)
      this.textboxStyle += " " + this.props.margins

    if(this.props.unconstrained)
      this.textboxStyle += " " + "unconstrained"

    return (
      <div className={this.state.focussed ? this.textboxStyle + ' focussed' : this.textboxStyle}>
        {
          this.props.InputAdornments!==undefined ? (
            this.props.InputAdornments.map((item, index)=>{
              if(item.position==='start')
                return (
                  <div className="input-adornment">
                    { item.element }
                  </div>
                )
            })
          ) : null
        }

        <input className="textbox" type={this.props.type} 
          placeholder={this.props.placeholder}
          { ...this.props }
          onFocus={()=>{
            this.setState({
              focussed: true
            })
          }}
          onBlur={()=>{
            this.setState({
              focussed: false
            })
          }}
        />

        {
          this.props.InputAdornments!==undefined ? (
            this.props.InputAdornments.map((item, index)=>{
              if(item.position==='end')
                return (
                  <div className="input-adornment">
                    { item.element }
                  </div>
                )
            })
          ) : null
        }
      </div>
    )
  }
}

export default Textbox
