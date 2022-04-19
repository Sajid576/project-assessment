const faker = require('faker');
const bcrypt = require('bcrypt');

const admin_user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
  raw_password: 'password',
  verifiedAt: '2020-10-01T04:07:29.000Z',
  phone: faker.phone.phoneNumber(),
  RoleId: 1,
};

const normal_user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
  raw_password: 'password',
  verifiedAt: '2020-10-01T04:07:29.000Z',
  phone: faker.phone.phoneNumber(),
  RoleId: 3,
};

const vendor = {
  name: faker.name.findName(),
  address: faker.name.findName(),
};
const product = {
  name: faker.commerce.productName(),
  types: faker.commerce.product().toUpperCase(),
};
const productList = {
  name: faker.commerce.productName(),
  ProductId: 1,
  UserId: 1,
  description: faker.lorem.paragraph(),
  price: faker.commerce.price(),
  unit: 'rm',
  VendorId: 2,
};
const event = {
  subject: faker.name.findName(),
  details: faker.lorem.paragraph(),
  UserId: 1,
};
const community = {
  subject: faker.name.findName(),
  details: faker.lorem.paragraph(),
  UserId: 1,
};
module.exports = {
  admin_user,
  normal_user,
  vendor,
  product,
  productList,
  event,
  community,
};
