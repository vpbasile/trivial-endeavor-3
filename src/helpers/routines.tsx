import { category } from "../gameReducer";
// import SameButton from "./sameButton";

/**
* Shuffles an array of four strings
*/
export function shuffleArray(array: string[]): string[] {
    let curId: number = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        const randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        const tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

export function ordinal(number: number): "First" | "Second" | "Third" | "Last" {
    switch (number) {
        case 1: return "First";
        case 2: return "Second";
        case 3: return "Third";
        default: return "Last";
    }
}

export function winnerColor(place: number) {
    switch (place) {
        case 1: return "gold";
        case 2: return "silver";
        case 3: return "bronze";
    }
}

/**
* Returns a promise and sleeps
*/
export function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

//Return the category object given its queryTag
export function getCategory(categoryList: category[], tag: string): category {
    const filteredList: category[] = categoryList.filter((categoryTemp) => {
        return categoryTemp.queryTag === tag;
    });
    return filteredList[0];
}