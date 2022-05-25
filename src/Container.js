import { useCallback, useState } from "react";
import { Card } from "./Card";
import { Column } from "./Column";
import { columns as dataColumns } from './columns'

import './Container.css';

export const Container = () => {
  {
    const [columns, setColumns] = useState(dataColumns);

    const getCards = (column, item, dragIndex, hoverIndex, columnDestId) => {
      const {id, cards} = column
      // console.log(cards.inclides(carditem.id))
      const cardsBase = cards.filter(card => card.id != item.id)
console.log('item', item.id, cardsBase)
      const resultCards = (id === columnDestId)
        ? [...cardsBase.slice(0, hoverIndex), item, ...cardsBase.slice(hoverIndex)]
        : cardsBase

      return resultCards
    }

    const moveCard = useCallback((dragIndex, hoverIndex, columnDestId, item) => {
      // console.log("move", dragIndex, item);
      // console.log("item", item.text);
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          cards: getCards(column, item, dragIndex, hoverIndex, columnDestId),
        }))
      );
    }, []);

    const renderCard = useCallback(
      (card, cardIndex, columnId) => {
        return (
          <Card
            key={card.id}
            index={cardIndex}
            id={card.id}
            text={card.text}
            columnId={columnId}
            moveCard={moveCard}
          />
        );
      },
      []
    );

    const renderColumn = useCallback(
      (column, columnIndex) => {
        return (
          <Column
            key={column.id}
            index={columnIndex}
            id={column.id}
            title={`Column № ${columnIndex + 1}`}
          >
            {column.cards.map((card, cardIndex) => renderCard(card, cardIndex, column.id))}
          </Column>
        );
      },
      []
    );

    return (
      <>
        <div className="container">{columns.map((column, i) => renderColumn(column, i))}</div>
      </>
    );
  }
};
