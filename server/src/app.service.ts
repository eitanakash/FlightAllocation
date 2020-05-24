import { Injectable } from '@nestjs/common';
import { Fligts } from './flight.intefce';
import { PNR } from './flight.pnrs';

@Injectable()
export class AppService {

  public flights: Fligts[] = [
    { id: 'f1', origin: 'a', dest: 'b', capacity: 8 },
    { id: 'f2', origin: 'a', dest: 'b', capacity: 4 },
    { id: 'f4', origin: 'a', dest: 'c', capacity: 5 },
    { id: 'f5', origin: 'c', dest: 'b', capacity: 7 },
    { id: 'f6', origin: 'a', dest: 'c', capacity: 6 },
  ];

  public pnrs: PNR[] = [
    { id: '1', origin: 'a', dest: 'b', passengerInRes: 3 },
    { id: '2', origin: 'a', dest: 'c', passengerInRes: 4 },
    { id: '4', origin: 'a', dest: 'b', passengerInRes: 8 },
    { id: '5', origin: 'a', dest: 'c', passengerInRes: 1 },
    { id: '6', origin: 'a', dest: 'b', passengerInRes: 1 },
    { id: '7', origin: 'a', dest: 'b', passengerInRes: 2 },
    { id: '8', origin: 'a', dest: 'c', passengerInRes: 2 },
    { id: '9', origin: 'a', dest: 'c', passengerInRes: 2 },
    { id: '10', origin: 'c', dest: 'b', passengerInRes: 4 },
  ];

  // TODO: lock resources
  getFlightAllocations(): any {
    const newFlightAllocations = [];
    while (this.pnrs.length) {
      newFlightAllocations.push(this.resolvePnr());
    }
    return newFlightAllocations;
  }

  resolvePnr(): any {

    this.pnrs.sort((a, b) => (a.passengerInRes > b.passengerInRes) ? 1 : -1);
    const pnr = this.pnrs.pop();
    const sitsNeeded = pnr.passengerInRes;
    const flightsId = this.allocateFlight(pnr);

    this.deductFlightCapacity(flightsId, sitsNeeded);

    return [pnr, flightsId];
  }

  private allocateFlight(pnr) {
    for (const [i, flight] of this.flights.entries()) {
      if (flight.origin === pnr.origin && flight.dest === pnr.dest && flight.capacity >= pnr.passengerInRes) {
        return [flight.id];
      }
    }

    return this.findIndirectFlight(pnr);
  }

  private findIndirectFlight(pnr) {
    const suitOriginFlights = [];
    const suitDestFlights = [];

    for (const flight of this.flights) {
      if (flight.origin === pnr.origin && flight.capacity >= pnr.passengerInRes) {
        suitOriginFlights.push(flight);
      }

      if (flight.dest === pnr.dest && flight.capacity >= pnr.passengerInRes) {
        suitDestFlights.push(flight);
      }
    }

    for (const suitOriginFlight of suitOriginFlights) {
      for (const suitDestFlight of suitDestFlights) {
        if (suitOriginFlight.dest === suitDestFlight.origin) {
          return [suitOriginFlight.id, suitDestFlight.id];
        }
      }
    }

  }

  private deductFlightCapacity(flightsId, sitsNeeded) {
    try {
      for (const [i, flight] of this.flights.entries()) {

        if (flightsId.includes(flight.id)) {
          flight.capacity = flight.capacity - sitsNeeded;
        }
      }
      this.removeFlight(flightsId);
    } catch (e) {
      console.log(e.message);

    }
  }

  private removeFlight(flightsId) {
    for (const [i, flight] of this.flights.entries()) {
      if (flight.capacity === 0) {
        this.flights.splice(i, 1);
      }
    }

  }

}
