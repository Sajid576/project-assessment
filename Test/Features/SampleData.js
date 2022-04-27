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

const mentor_user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
  raw_password: 'password',
  verifiedAt: '2020-10-01T04:07:29.000Z',
  phone: faker.phone.phoneNumber(),
  RoleId: 2,
};
const student_user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
  raw_password: 'password',
  verifiedAt: '2020-10-01T04:07:29.000Z',
  phone: faker.phone.phoneNumber(),
  RoleId: 3,
};

const assessment = {
  title: faker.name.findName(),
  description: faker.lorem.paragraph(),
  mentor: faker.name.findName(),
  deadline: faker.date.between('01-01-2022', '01-05-2022'),
  UserId: 112,
};
const assessmentSubmit = {
  files: faker.name.findName(),
  submissionDate: faker.date.between('01-01-2022', '01-05-2022'),
  AssessmentId: 1,
  UserId: 2,
};

const grade = {
  marks: 70,
  remarks: 50,
  AssessmentId: 2,
  AssessmentSubmitId: 2,
};

module.exports = {
  admin_user,
  mentor_user,
  student_user,
  assessment,
  assessmentSubmit,
  grade,
};
