import { MovieResponse } from "./movieResponse";
import { TheaterResponse } from "./theaterResponse";

export interface ProjectionResponse{

    id:number;
    startTime: Date ;
    endTime: Date ;
    ticketPrice: number ;
    availableSeats:number ;

    movieResponse:MovieResponse ;
    theaterResponse:TheaterResponse ;
}