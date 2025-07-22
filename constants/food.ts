
export interface Order {
  date: string;
  restaurant: string;
  person: string;
  amount: number;
  category?: string;
}

export const sampleData: Order[] = 
  // Domino
[
  {
    "date": "2025-03-18",
    "restaurant": "Kebab na Bronxie",
    "person": "Domino",
    "amount": 24.8,
    "category": "Kebab"
  },
  {
    "date": "2025-03-24",
    "restaurant": "Vegab",
    "person": "Domino",
    "amount": 26.93,
    "category": "Wege"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Domino",
    "amount": 41.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-03-27",
    "restaurant": "Kebab Spoko",
    "person": "Domino",
    "amount": 39.6,
    "category": "Kebab"
  },
  {
    "date": "2025-04-08",
    "restaurant": "Filthy",
    "person": "Domino",
    "amount": 37.5,
    "category": "Burgery"
  },
  {
    "date": "2025-04-10",
    "restaurant": "Filthy",
    "person": "Domino",
    "amount": 28.2,
    "category": "Burgery"
  },
  {
    "date": "2025-04-11",
    "restaurant": "Filthy",
    "person": "Domino",
    "amount": 28.2,
    "category": "Burgery"
  },
  {
    "date": "2025-04-14",
    "restaurant": "Filthy",
    "person": "Domino",
    "amount": 21.3,
    "category": "Burgery"
  },
  {
    "date": "2025-04-24",
    "restaurant": "Łoś",
    "person": "Domino",
    "amount": 28.5,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-05-16",
    "restaurant": "Kebab",
    "person": "Domino",
    "amount": 27.68,
    "category": "Inne"
  },
  {
    "date": "2025-05-20",
    "restaurant": "Vegab",
    "person": "Domino",
    "amount": 25.5,
    "category": "Wege"
  },
  {
    "date": "2025-05-14",
    "restaurant": "Arabia",
    "person": "Domino",
    "amount": 38.4,
    "category": "Kebab"
  },
  {
    "date": "2025-05-21",
    "restaurant": "Piri Piri",
    "person": "Domino",
    "amount": 25.5,
    "category": "Kebab"
  },
  {
    "date": "2025-05-02",
    "restaurant": "Arabia",
    "person": "Domino",
    "amount": 41.25,
    "category": "Kebab"
  },
  {
    "date": "2025-06-10",
    "restaurant": "Arabia",
    "person": "Domino",
    "amount": 56.0,
    "category": "Kebab"
  },
  {
    "date": "2025-06-11",
    "restaurant": "Corner",
    "person": "Domino",
    "amount": 38.24,
    "category": "Burgery"
  },
  {
    "date": "2025-06-20",
    "restaurant": "Vegab",
    "person": "Domino",
    "amount": 37.7,
    "category": "Wege"
  },
  {
    "date": "2025-06-03",
    "restaurant": "Piri Piri",
    "person": "Domino",
    "amount": 48.0,
    "category": "Kebab"
  },
  {
    "date": "2025-06-17",
    "restaurant": "Piri Piri",
    "person": "Domino",
    "amount": 48.0,
    "category": "Kebab"
  },
  {
    "date": "2025-07-01",
    "restaurant": "Arabia",
    "person": "Domino",
    "amount": 31.0,
    "category": "Kebab"
  },
  {
    "date": "2025-07-02",
    "restaurant": "Corner Burger",
    "person": "Domino",
    "amount": 25.2,
    "category": "Burgery"
  },
  {
    "date": "2025-07-10",
    "restaurant": "Vegab",
    "person": "Domino",
    "amount": 43.44,
    "category": "Wege"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Nat",
    "amount": 14.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-05-20",
    "restaurant": "Vegab",
    "person": "Nat",
    "amount": 22.5,
    "category": "Wege"
  },
  {
    "date": "2025-06-11",
    "restaurant": "Corner",
    "person": "Nat",
    "amount": 24.9,
    "category": "Burgery"
  },
  {
    "date": "2025-06-17",
    "restaurant": "Piri Piri",
    "person": "Nat",
    "amount": 43.0,
    "category": "Kebab"
  },
  {
    "date": "2025-05-20",
    "restaurant": "Arabia",
    "person": "Nat",
    "amount": 36.0,
    "category": "Kebab"
  },
  {
    "date": "2025-06-13",
    "restaurant": "Son Anh",
    "person": "Nat",
    "amount": 43.0,
    "category": "Chinol"
  },
  {
    "date": "2025-07-01",
    "restaurant": "Arabia",
    "person": "Nat",
    "amount": 16.0,
    "category": "Kebab"
  },
  {
    "date": "2025-07-02",
    "restaurant": "Corner Burger",
    "person": "Nat",
    "amount": 25.2,
    "category": "Burgery"
  },
  {
    "date": "2025-07-04",
    "restaurant": "Corner Burger",
    "person": "Nat",
    "amount": 25.2,
    "category": "Burgery"
  },
  {
    "date": "2025-07-10",
    "restaurant": "Vegab",
    "person": "Nat",
    "amount": 11.9,
    "category": "Wege"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Lex",
    "amount": 13.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-04-10",
    "restaurant": "Filthy",
    "person": "Lex",
    "amount": 28.2,
    "category": "Burgery"
  },
  {
    "date": "2025-03-18",
    "restaurant": "Kebab na Bronxie",
    "person": "Hohi",
    "amount": 32.8,
    "category": "Kebab"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Hohi",
    "amount": 38.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-04-08",
    "restaurant": "Filthy",
    "person": "Hohi",
    "amount": 28.2,
    "category": "Burgery"
  },
  {
    "date": "2025-04-10",
    "restaurant": "Filthy",
    "person": "Hohi",
    "amount": 32.0,
    "category": "Burgery"
  },
  {
    "date": "2025-04-11",
    "restaurant": "Filthy",
    "person": "Hohi",
    "amount": 32.0,
    "category": "Burgery"
  },
  {
    "date": "2025-04-14",
    "restaurant": "Filthy",
    "person": "Hohi",
    "amount": 25.4,
    "category": "Burgery"
  },
  {
    "date": "2025-04-24",
    "restaurant": "Łoś",
    "person": "Hohi",
    "amount": 25.5,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-05-15",
    "restaurant": "Aarabia",
    "person": "Hohi",
    "amount": 28.0,
    "category": "Kebab"
  },
  {
    "date": "2025-03-18",
    "restaurant": "Kebab na Bronxie",
    "person": "Adrian",
    "amount": 16.0,
    "category": "Kebab"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Adrian",
    "amount": 29.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-04-07",
    "restaurant": "Taco",
    "person": "Adrian",
    "amount": 28.2,
    "category": "Inne"
  },
  {
    "date": "2025-04-14",
    "restaurant": "Filthy",
    "person": "Adrian",
    "amount": 25.0,
    "category": "Burgery"
  },
  {
    "date": "2025-05-15",
    "restaurant": "Aarabia",
    "person": "Adrian",
    "amount": 12.75,
    "category": "Kebab"
  },
  {
    "date": "2025-05-20",
    "restaurant": "Vegab",
    "person": "Adrian",
    "amount": 12.75,
    "category": "Wege"
  },
  {
    "date": "2025-06-10",
    "restaurant": "Arabia",
    "person": "Adrian",
    "amount": 28.72,
    "category": "Kebab"
  },
  {
    "date": "2025-06-20",
    "restaurant": "Vegab",
    "person": "Adrian",
    "amount": 48.0,
    "category": "Wege"
  },
  {
    "date": "2025-06-13",
    "restaurant": "Son Anh",
    "person": "Adrian",
    "amount": 30.0,
    "category": "Chinol"
  },
  {
    "date": "2025-07-01",
    "restaurant": "Arabia",
    "person": "Adrian",
    "amount": 16.0,
    "category": "Kebab"
  },
  {
    "date": "2025-07-02",
    "restaurant": "Corner Burger",
    "person": "Adrian",
    "amount": 25.2,
    "category": "Burgery"
  },
  {
    "date": "2025-07-07",
    "restaurant": "Corner Burger",
    "person": "Adrian",
    "amount": 25.2,
    "category": "Burgery"
  },
  {
    "date": "2025-03-18",
    "restaurant": "Kebab na Bronxie",
    "person": "Michał",
    "amount": 24.8,
    "category": "Kebab"
  },
  {
    "date": "2025-04-11",
    "restaurant": "Filthy",
    "person": "Michał",
    "amount": 21.75,
    "category": "Burgery"
  },
  {
    "date": "2025-04-14",
    "restaurant": "Filthy",
    "person": "Michał",
    "amount": 29.0,
    "category": "Burgery"
  },
  {
    "date": "2025-03-18",
    "restaurant": "Kebab na Bronxie",
    "person": "Piotrek",
    "amount": 34.4,
    "category": "Kebab"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Piotrek",
    "amount": 35.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-04-11",
    "restaurant": "Filthy",
    "person": "Piotrek",
    "amount": 27.75,
    "category": "Burgery"
  },
  {
    "date": "2025-04-14",
    "restaurant": "Filthy",
    "person": "Piotrek",
    "amount": 38.0,
    "category": "Burgery"
  },
  {
    "date": "2025-06-03",
    "restaurant": "Piri Piri",
    "person": "Piotrek",
    "amount": 40.0,
    "category": "Kebab"
  },
  {
    "date": "2025-07-10",
    "restaurant": "Vegab",
    "person": "Piotrek",
    "amount": 43.44,
    "category": "Wege"
  },
  {
    "date": "2025-03-25",
    "restaurant": "Łoś",
    "person": "Bartek",
    "amount": 13.0,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-04-24",
    "restaurant": "Łoś",
    "person": "Bartek",
    "amount": 26.93,
    "category": "Wykwintne podniebienie"
  },
  {
    "date": "2025-05-15",
    "restaurant": "Aarabia",
    "person": "Bartek",
    "amount": 12.75,
    "category": "Kebab"
  },
  {
    "date": "2025-05-20",
    "restaurant": "Vegab",
    "person": "Bartek",
    "amount": 12.75,
    "category": "Wege"
  },
  {
    "date": "2025-06-17",
    "restaurant": "Piri Piri",
    "person": "Bartek",
    "amount": 29.0,
    "category": "Kebab"
  },
  {
    "date": "2025-06-13",
    "restaurant": "Son Anh",
    "person": "Bartek",
    "amount": 27.0,
    "category": "Chinol"
  },
  {
    "date": "2025-07-10",
    "restaurant": "Vegab",
    "person": "Bartek",
    "amount": 28.72,
    "category": "Wege"
  }
]