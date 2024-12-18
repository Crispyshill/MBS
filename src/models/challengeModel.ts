export interface Challenge {
  externalid: string; // Unique identifier for the challenge
  name: string; // Name of the challenge
  description: string; // Description of the challenge
  points: number; // Points awarded for completing the challenge
  startdate?: string; // Optional: Start date for the challenge (ISO string)
  enddate?: string; // Optional: End date for the challenge (ISO string)
}
  
  