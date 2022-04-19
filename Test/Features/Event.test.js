const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { event } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Event', () => {
  beforeEach(async () => {
    await db.Event.destroy({ truncate: true });
    await db.Event.bulkCreate([event, event, event]);
  });
  afterEach(async () => {
    await db.Event.destroy({ truncate: true });
  });
  it('List Event', async () => {
    const res = await authenticated_get('/api/event');

    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Event', async () => {
    const events = await db.Event.create(event);
    const res = await authenticated_get(`/api/event/${events.id}`);
    console.log('data: ', res.body);
    res.status.should.equal(200);
    res.body.data.subject.should.equal(events.subject);
  });
  it('Create Event', async () => {
    const res = await authenticated_post('/api/event', {
      data: event,
    });
    res.status.should.equal(200);
    const events = await db.Event.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.subject.should.equal(events.subject);
  });
  it('Update Event', async () => {
    const events = await db.Event.create(event);
    const res = await authenticated_post(`/api/event/${events.id}`, {
      data: { subject: 'testing Event' },
    });
    res.status.should.equal(200);
    await events.reload();
    events.subject.should.equal('testing Event');
  });
  it('Delete Event', async () => {
    const events = await db.Event.create(event);
    const res = await authenticated_delete(`/api/event/${events.id}`);
    res.status.should.equal(200);
  });
});
