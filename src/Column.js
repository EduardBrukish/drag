import React from 'react';

export function Column(props) {
  return (
    <div className="column">
      <div className="column__title">{props.title}</div>
      {props.children}
    </div>
  );
}
