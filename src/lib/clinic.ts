export const CLINIC = {
  name: "Jain ENT Hospital",
  tagline: "Ear • Nose • Throat • Head & Neck Cancer Care",
  doctor: {
    name: "Prof. Dr. Devendra M. Jain",
    short: "Dr. Devendra Jain",
    creds: "MBBS, MS (ENT)",
    title: "Otorhinolaryngologist & Head–Neck Cancer Surgeon",
    experience: "17+ years",
    bio: "Senior ENT Specialist with 17+ years of clinical and surgical experience. Ex-BJ Medical College, Pune. Currently Professor & Senior ENT Specialist at Banas Medical College, Palanpur. Specializes in advanced ear, nose, throat and head & neck oncology care.",
  },
  address: {
    line1: "First Floor, Iskcon Pride",
    line2: "Opp. JIO Petrol Pump, Deesa Highway",
    city: "Deesa",
    state: "Gujarat",
    pin: "385535",
    country: "India",
  },
  phones: {
    primary: "+91 93257 69599",
    secondary: "+91 63590 09719",
    tertiary: "+91 82377 05457",
  },
  whatsapp: {
    primary: "919325769599",
    secondary: "918237705457",
    tertiary: "916359009719",
  },
  email: "jainentdrdevendra@gmail.com",
  hours: {
    weekdays: "Mon – Sat · 10:00 AM – 7:00 PM",
    sunday: "Sunday Closed",
    emergency: "Emergency 24×7",
  },
  social: {
    facebook: "https://www.facebook.com/jainenthospitaldeesa",
    instagram: "https://www.instagram.com/dr_devendra_jain",
    maps: "https://maps.app.goo.gl/XWZ76VQYTcVqBwFd9",
  },
} as const;

export const telPrimary = CLINIC.phones.primary.replace(/\s/g, "");
export const waLink = (msg: string) =>
  `https://wa.me/${CLINIC.whatsapp.primary}?text=${encodeURIComponent(msg)}`;
