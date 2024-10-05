export interface Schedule {
  id?: number;
  address: string;
  clientId: number;
  countyId: number;
  dateScheduling: Date;
  districtId: number;
  endTime: string;
  freelancerId: number;
  postalCode: string;
  scheduleDetails: any;
  startTime: string;
  typeServiceId?: number;
  clientFirstName: string;
  clientLastName: string;
  districtName: string;
  countyName: string;
  typeServiceName: string;
  freelancerFirstName: string;
  freelancerLastName: string;
  freelancerPhoneNumber: string;
  freelancerAddress: string;
  pricePerHour: string;
  clientPhoneNumber: string;
  clientAddress: string;
}
