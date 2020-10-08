import { rejects } from 'assert';
import Tasks from '../data';



export function readData(){
    return Tasks


}


export function writeData(newData){


    Tasks.push(newData)

}

