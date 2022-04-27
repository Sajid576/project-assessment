const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { grade } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Grade', () => {
  beforeEach(async () => {
    await db.Grade.destroy({ truncate: true });
    await db.Grade.bulkCreate([grade, grade, grade]);
  });
  afterEach(async () => {
    await db.Grade.destroy({ truncate: true });
  });
  it('List Grade', async () => {
    const res = await authenticated_get('/api/grade', 'mentor');
    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Grade', async () => {
    const grades = await db.Grade.create(grade);
    const res = await authenticated_get(`/api/grade/${grades.id}`);
    res.status.should.equal(200);
    res.body.data.marks.should.equal(grades.marks);
  });
  it('Create Grade', async () => {
    const res = await authenticated_post('/api/grade', {
      data: grade,
    });
    res.status.should.equal(200);
    const grades = await db.Grade.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.remarks.should.equal(grades.remarks);
  });
  it('Update Grade', async () => {
    const grades = await db.Grade.create(grade);
    const res = await authenticated_post(`/api/grade/${grades.id}`, {
      data: { marks: 100 },
    }, 'mentor');
    res.status.should.equal(200);
    await grades.reload();
    grades.marks.should.equal(100);
  });
  it('Delete Grade', async () => {
    const grades = await db.Grade.create(grade);
    const res = await authenticated_delete(`/api/grade/${grades.id}`);
    res.status.should.equal(200);
  });
});
