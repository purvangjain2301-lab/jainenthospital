

export const CLINIC = {
  name: "Jain ENT Hospital",
  tagline: "Ear • Nose • Throat • Face Surgery • Head & Neck Cancer Care",
  doctor: {
    name: "Prof. Dr. Devendra M. Jain",
    short: "Dr. Devendra Jain",
    creds: "MBBS, MS (ENT)",
    title: "ENT & Head Neck Surgeon with Cancer Care",
    experience: "18+ years of experience",
    bio: "Senior ENT Surgeon with 18+ years of experience in clinical and surgical practice. Ex-BJ Medical College, Pune. Dr. Jain is a practising ENT Surgeon who also specializes in face surgery (cosmetic & reconstructive) and head-neck cancer care, and provides in-clinic and telemedicine consultations for patients across India and worldwide.",
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
    facebook: "https://www.facebook.com/share/18i7Pnt2BH/",
    instagram: "https://www.instagram.com/dr_devendra_jain?igsh=aHg0NHE5dm53cTV5",
    maps: "https://maps.app.goo.gl/UGd5DbgeySUoC2wp6?g_st=ac",
  },
} as const;

export const telPrimary = CLINIC.phones.primary.replace(/\s/g, "");
export const waLink = (msg: string) =>
  `https://wa.me/${CLINIC.whatsapp.primary}?text=${encodeURIComponent(msg)}`;
