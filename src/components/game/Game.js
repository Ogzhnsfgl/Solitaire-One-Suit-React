import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import {
  populateOneSuitCards,
  selectCard,
  dealingStockCards,
} from '../../logic/oneSuitLogic';
import Card from '../card/Card';
import CardHolder from '../cardHolder/CardHolder';
import './game.scss';
import '../cardHolder/cardHolder.scss';
const gameInitialState = {
  cards: [],
  decks: [],
  selectedCard: '',
  selectedDeck: '',
  selected: [],
  hands: 0,
  highlightedDeck: '',
  highlightedCard: '',
};

const Game = () => {
  const [cards, setCards] = useState({});
  const [game, setGame] = useState(gameInitialState);

  useEffect(() => {
    const { decks, cards } = populateOneSuitCards();
    setCards({ decks, cards });
    setGame((prev) => ({ ...prev, cards, decks }));
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="game">
        <div className="game__top">
          {cards.hasOwnProperty('decks') && game.decks[10].length === 0 && (
            <div className="card card__stockcards card__stockcards-empty"></div>
          )}
          {cards.hasOwnProperty('decks') && game.decks[10].length > 0 && (
            <div
              className="card card__stockcards"
              onClick={() => dealingStockCards(game, setGame)}
            ></div>
          )}
          <div className="game__top-foundation">
            {Array(8 - game.hands)
              .fill(0)
              .map((item, index) => (
                <CardHolder key={index} />
              ))}
            {game.hands !== 0 &&
              Array(game.hands)
                .fill(0)
                .map((item, index) => (
                  <Card
                    card={{
                      suit: 'spade',
                      rank: 'A',
                      isDown: false,
                      isSelected: false,
                      isHighlighted: false,
                    }}
                    isDown={false}
                    isSelected={false}
                    isHighlighted={false}
                  />
                ))}
          </div>
        </div>
        <div className="game__bottom">
          {cards.hasOwnProperty('decks') &&
            game.decks.slice(0, 10).map((deck, index) => (
              <>
                {deck.length === 0 ? (
                  <div
                    onClick={() => {
                      ('click');
                      selectCard(game.selectedCard, deck, true, game, setGame);
                    }}
                  >
                    <CardHolder isHighligted={false} key={index} />
                  </div>
                ) : (
                  <div className="card__wrapper" key={'deck-' + index}>
                    {deck.map((card, key) => (
                      <div
                        className="card__stack"
                        key={`stack ${card.rank} ${card.suit} ${
                          card.deck
                        } ${key} ${index + 10}`}
                        onClick={() =>
                          selectCard(card, deck, null, game, setGame)
                        }
                      >
                        <Card
                          card={card}
                          isSelected={card.isSelected}
                          isDown={card.isDown}
                          isHighlighted={false}
                          key={`${index} ${key} ${card.rank} ${card.suit} ${card.deck}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Game;