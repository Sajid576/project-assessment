const chai = require('chai');
const chaiHttp = require('chai-http');
const { authenticated_get, authenticated_post, authenticated_delete } = require('./chai-passport-user');
const db = require('../../models');
const { vendor } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Vendor', () => {
  beforeEach(async () => {
    await db.Vendor.destroy({ truncate: true });
    await db.Vendor.bulkCreate([
      vendor,
      vendor,
      vendor,
    ]);
  });
  afterEach(async () => {
    await db.Vendor.destroy({ truncate: true });
  });
  it('List Vendor', async () => {
    const res = await authenticated_get('/api/vendor');
    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Vendor', async () => {
    const vendors = await db.Vendor.create(vendor);
    const res = await authenticated_get(`/api/vendor/${vendors.id}`);
    res.status.should.equal(200);
    res.body.data.name.should.equal(vendors.name);
  });
  it('Create Vendor', async () => {
    const res = await authenticated_post('/api/vendor', { data: vendor });
    res.status.should.equal(200);
    const vendors = await db.Vendor.findOne({ where: { id: res.body.data.id } });
    res.body.data.name.should.equal(vendors.name);
  });
  it('Update Vendor', async () => {
    const vendors = await db.Vendor.create(vendor);
    const res = await authenticated_post(`/api/vendor/${vendors.id}`, { data: { name: 'testing Vendor' } });
    res.status.should.equal(200);
    await vendors.reload();
    vendors.name.should.equal('testing Vendor');
  });
  it('Delete Vendor', async () => {
    const vendors = await db.Vendor.create(vendor);
    const res = await authenticated_delete(`/api/vendor/${vendors.id}`);
    res.status.should.equal(200);
  });
});
