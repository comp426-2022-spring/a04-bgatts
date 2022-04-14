// Import the coinFlip function from your coin.mjs file
import { coinFlip } from './coin.mjs';

// Call the coinFlip function and put the return into STDOUT

//process.stdout.write(coinFlip());
export function flipper(){
    let flip = {
        flip:coinFlip()
    }
    return flip
}
