import { ProjectionResponse } from "./projectionResponse";
import { RegisterResponse } from "./registerResponse";

export interface ReservationResponse{

    id:number;
    userResponseDTO: RegisterResponse;
    projectionResponseDTO:ProjectionResponse;
    numberOfTickets:number;
}