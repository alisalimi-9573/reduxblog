import { faker } from "@faker-js/faker";
export default function generateData() {
  const data = { users: [], posts: [] };
  for (let i = 0; i < 5; i++) {
    data.users.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });
  }
  for (let i = 0; i < 10; i++) {
    data.posts.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      date: faker.date.past(),
      reactions: { eyes: 0, heart: 0, hooray: 0, rocket: 0, thumbsUp: 0 },
      user: faker.helpers.arrayElement(data.users).id,
    });
  }
  return data;
}
