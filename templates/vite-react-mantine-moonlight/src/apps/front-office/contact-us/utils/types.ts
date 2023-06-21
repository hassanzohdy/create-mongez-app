export type Branch = {
  id: number;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
};
