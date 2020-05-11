import pf from "petfinder-client";

// Common API used to fetch data from Petfinder

const petfinder = pf({
  key: process.env.PET_FINDER_KEY,
  secret: process.env.PET_FINDER_SECRECT
});

export default petfinder;