import * as _ from "lodash";
import {MAX_CARDS_IN_HAND} from "./const";
import {Card} from "./card";

export class Deck {
    cards: Card[] = []

    add(c: Card) {
        this.cards.push(c)
    }

    copy() {
        return _.cloneDeep(this.cards)
    }
}

export class GameDeck {
    private discardPile: Card[] = []
    private hand: Card[] = []

    constructor(private drawPile: Card[]) {
    }

    draw(count: number) {

        for (let i = 0; i < count; i++) {
            if (this.hand.length >= MAX_CARDS_IN_HAND) {
                console.log('hand is full')
                return
            }

            if (this.drawPile.length == 0) {
                this.drawPile = this.discardPile
                this.discardPile = []
                this.shuffle()
                return
            }

            // Move card from draw pile to hand
            let c = this.drawPile.pop()
            if (!c) {
                throw new Error("unexpected state of draw pile")
            }
            this.hand.push(c)
        }
    }

    print() {
        console.log('STATE')
        console.log(`drawPile    [${this.drawPile}]`)
        console.log(`hand        [${this.hand}]`)
        console.log(`discardPile [${this.discardPile}]`)
    }

    play(i: number) {
        if (i >= this.hand.length) {
            console.log('invalid index', i)
            return
        }
        let c = this.hand[i]
        this.hand.splice(i, 1);

        this.discardPile.push(c)
    }

    shuffle() {
        _.shuffle(this.drawPile)
    }
}
