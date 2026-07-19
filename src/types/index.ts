/**
 * Shared Type Definitions for the Wedding Invitation Template.
 */

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl?: string;
  dressCode?: string;
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  isAttending?: boolean;
  dietaryRequirements?: string;
  plusOne?: boolean;
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  iconName?: string;
}
