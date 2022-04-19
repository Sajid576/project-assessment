const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { productList } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing ProductList', () => {
  beforeEach(async () => {
    await db.ProductList.destroy({ truncate: true });
    await db.ProductList.bulkCreate([productList, productList, productList]);
  });
  afterEach(async () => {
    await db.ProductList.destroy({ truncate: true });
  });
  it('List ProductList', async () => {
    const res = await authenticated_get('/api/product-list');

    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show ProductList', async () => {
    const productLists = await db.ProductList.create(productList);
    const res = await authenticated_get(`/api/product-list/${productLists.id}`);
    res.status.should.equal(200);
    res.body.data.name.should.equal(productLists.name);
  });
  it('Create ProductList', async () => {
    const res = await authenticated_post('/api/product-list', {
      data: productList,
    });
    res.status.should.equal(200);
    const productLists = await db.ProductList.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.name.should.equal(productLists.name);
  });
  it('Update ProductList', async () => {
    const productLists = await db.ProductList.create(productList);
    const res = await authenticated_post(
      `/api/product-list/${productLists.id}`,
      {
        data: { name: 'testing ProductList' },
      },
    );
    res.status.should.equal(200);
    await productLists.reload();
    productLists.name.should.equal('testing ProductList');
  });
  it('Delete ProductList', async () => {
    const productLists = await db.ProductList.create(productList);
    const res = await authenticated_delete(
      `/api/product-list/${productLists.id}`,
    );
    res.status.should.equal(200);
  });
});
