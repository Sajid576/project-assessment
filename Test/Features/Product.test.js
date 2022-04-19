const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { product } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing Product', () => {
  beforeEach(async () => {
    await db.Product.destroy({ truncate: true });
    await db.Product.bulkCreate([product, product, product]);
  });
  afterEach(async () => {
    await db.Product.destroy({ truncate: true });
  });
  it('List Product', async () => {
    const res = await authenticated_get('/api/product');

    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show Product', async () => {
    const products = await db.Product.create(product);
    const res = await authenticated_get(`/api/product/${products.id}`);
    res.status.should.equal(200);
    res.body.data.name.should.equal(products.name);
  });
  it('Create Product', async () => {
    const res = await authenticated_post('/api/product', { data: product });
    res.status.should.equal(200);
    const products = await db.Product.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.name.should.equal(products.name);
  });
  it('Update Product', async () => {
    const products = await db.Product.create(product);
    const res = await authenticated_post(`/api/product/${products.id}`, {
      data: { name: 'testing Product' },
    });
    res.status.should.equal(200);
    await products.reload();
    products.name.should.equal('testing Product');
  });
  it('Delete Product', async () => {
    const products = await db.Product.create(product);
    const res = await authenticated_delete(`/api/product/${products.id}`);
    res.status.should.equal(200);
  });
});
