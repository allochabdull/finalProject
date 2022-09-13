export default class User {
  constructor(
    firstName,
    lastName,
    streetAndNumber,
    postalCode,
    city,
    country,
    sports,
    gender,
    age,
    activity_class,
    id
  ) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.address = {
        streetAndNumber,
        postalCode,
        city,
        country,
      }),
      (this.sports = sports),
      (this.gender = gender),
      (this.age = age),
      (this.activity_class = activity_class),
      (this.id = id);
  }
}
