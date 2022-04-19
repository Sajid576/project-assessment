const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { assessment } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Assessment', () => {
  beforeEach(async () => {
    await db.Assessment.destroy({ truncate: true });
    await db.Assessment.bulkCreate([assessment, assessment, assessment]);
  });
  afterEach(async () => {
    await db.Assessment.destroy({ truncate: true });
  });
  it('List Assessment', async () => {
    const res = await authenticated_get('/api/assessment');
    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Assessment', async () => {
    const assessments = await db.Assessment.create(assessment);
    const res = await authenticated_get(`/api/assessment/${assessments.id}`);
    res.status.should.equal(200);
    res.body.data.title.should.equal(assessments.title);
  });
  it('Create Assessment', async () => {
    const res = await authenticated_post('/api/assessment', {
      data: assessment,
    });
    res.status.should.equal(200);
    const assessments = await db.Assessment.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.title.should.equal(assessments.title);
  });
  it('Update Assessment', async () => {
    const assessments = await db.Assessment.create(assessment);
    const res = await authenticated_post(`/api/assessment/${assessments.id}`, {
      data: { title: 'testing Assessment' },
    });
    res.status.should.equal(200);
    await assessments.reload();
    assessments.title.should.equal('testing Assessment');
  });
  it('Delete Assessment', async () => {
    const assessments = await db.Assessment.create(assessment);
    const res = await authenticated_delete(`/api/assessment/${assessments.id}`);
    res.status.should.equal(200);
  });
});
