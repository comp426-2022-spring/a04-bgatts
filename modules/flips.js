// Import the coinFlip function from your coin.mjs file
import { coinFlips } from './coin.mjs';


export function multFlips(num){



                let flip =1

                let flipNum = num;

                if(flipNum>flip){
                    flip = flipNum 
                }

                let flipRes = coinFlips(flip);

                let h_count=0
                let t_count=0
                for(let i=0; i<flipRes.length; i++){
                    if(flipRes[i]=="heads"){
                        h_count++
                    }
                    else{
                        t_count++
                    }
                }






                let resObj = {
                    "heads":h_count,
                    "tails":t_count
                }

                //delete tails aspect if none were flipped
                if(h_count + t_count == 1 && t_count==0){
                    delete resObj.tails
                }
                if(h_count + t_count == 1 && h_count==0){
                    delete resObj.heads
                }


                return [flipRes, resObj];



}
