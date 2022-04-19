const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { community } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Community', () => {
  beforeEach(async () => {
    await db.Community.destroy({ truncate: true });
    await db.Community.bulkCreate([community, community, community]);
  });
  afterEach(async () => {
    await db.Community.destroy({ truncate: true });
  });
  it('List Community', async () => {
    const res = await authenticated_get('/api/community');

    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Community', async () => {
    const events = await db.Community.create(community);
    const res = await authenticated_get(`/api/community/${events.id}`);
    console.log('data: ', res.body);
    res.status.should.equal(200);
    res.body.data.subject.should.equal(events.subject);
  });
  it('Create Community', async () => {
    const res = await authenticated_post('/api/community', {
      data: community,
    });
    res.status.should.equal(200);
    const events = await db.Community.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.subject.should.equal(events.subject);
  });
  it('Update Community', async () => {
    const events = await db.Community.create(community);
    const res = await authenticated_post(`/api/community/${events.id}`, {
      data: { subject: 'testing Community' },
    });
    res.status.should.equal(200);
    await events.reload();
    events.subject.should.equal('testing Community');
  });
  it('Delete Community', async () => {
    const events = await db.Community.create(community);
    const res = await authenticated_delete(`/api/community/${events.id}`);
    res.status.should.equal(200);
  });
});
