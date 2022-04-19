const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require("./chai-passport-user");
const db = require("../../models");
const { assessment } = require("./SampleData");

chai.use(chaiHttp);
chai.should();

describe("Testing Vendor", () => {
  beforeEach(async () => {
    await db.Vendor.destroy({ truncate: true });
    await db.Vendor.bulkCreate([assessment, assessment, assessment]);
  });
  afterEach(async () => {
    await db.Vendor.destroy({ truncate: true });
  });
  it("List Vendor", async () => {
    const res = await authenticated_get("/api/assessment");
    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it("Show Vendor", async () => {
    const assessments = await db.Vendor.create(assessment);
    const res = await authenticated_get(`/api/assessment/${assessments.id}`);
    res.status.should.equal(200);
    res.body.data.name.should.equal(assessments.name);
  });
  it("Create Vendor", async () => {
    const res = await authenticated_post("/api/assessment", {
      data: assessment,
    });
    res.status.should.equal(200);
    const assessments = await db.Vendor.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.name.should.equal(assessments.name);
  });
  it("Update Vendor", async () => {
    const assessments = await db.Vendor.create(assessment);
    const res = await authenticated_post(`/api/assessment/${assessments.id}`, {
      data: { name: "testing Vendor" },
    });
    res.status.should.equal(200);
    await assessments.reload();
    assessments.name.should.equal("testing Vendor");
  });
  it("Delete Vendor", async () => {
    const assessments = await db.Vendor.create(assessment);
    const res = await authenticated_delete(`/api/assessment/${assessments.id}`);
    res.status.should.equal(200);
  });
});
