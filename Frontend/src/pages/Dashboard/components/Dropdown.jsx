import React, { useState, Fragment } from 'react'

const list = ['1', '2']
export default function Dropdown(props) {
  const [selected, setSelected] = useState('')
  

  props.handleOptionShowHide = () => {
    props.setDropdown_item(!props.dropdown_item)
  }
  const handleOptionClick = (label) => {
    setSelected(label)
    props.setDropdown_item(!props.dropdown_item)
  }
  return (
    <Fragment>
      <div className="dropdown">
        <div>
          <input
            type="text"
            placeholder={props.emptyOption}
            className="dropdown-input"
            value={selected}
            readOnly
            onClick={() => props.handleOptionShowHide()}
          />
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            onClick={() => props.handleOptionShowHide()}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              {' '}
              <rect x="0" fill="none" width="24" height="24" />{' '}
              <g>
                {' '}
                <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586" />{' '}
              </g>{' '}
            </g>
          </svg>
        </div>

        <div className={props.dropdown_item ? 'dropdown-item-hide' : 'dropdown-item-show'}>
          {list &&
            list.map((item, index) => (
              <div className="dropdown-item" key={index} onClick={() => handleOptionClick(item)}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  )
}
