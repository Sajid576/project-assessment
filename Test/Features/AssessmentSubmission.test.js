const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  authenticated_get,
  authenticated_post,
  authenticated_delete,
} = require('./chai-passport-user');
const db = require('../../models');
const { assessmentSubmit, student_user } = require('./SampleData');

chai.use(chaiHttp);
chai.should();

describe('Testing AssessmentSubmission', () => {
  beforeEach(async () => {
    await db.AssessmentSubmission.destroy({ truncate: true });
    // eslint-disable-next-line max-len
    await db.AssessmentSubmission.bulkCreate([assessmentSubmit, assessmentSubmit, assessmentSubmit]);
  });
  afterEach(async () => {
    await db.AssessmentSubmission.destroy({ truncate: true });
  });
  it('List AssessmentSubmission', async () => {
    const res = await authenticated_get('/api/assessment-submission');
    res.status.should.equal(200);
    res.body.data.length.should.equal(3);
  });
  it('Show AssessmentSubmission', async () => {
    const newUser = await db.User.create(student_user);
    const assessmentSubmitObj = { ...assessmentSubmit, UserId: newUser.id };
    const assessmentSubmits = await db.AssessmentSubmission.create(assessmentSubmitObj);
    const res = await authenticated_get(`/api/assessment-submission/${assessmentSubmits.id}`, 'student');
    res.status.should.equal(200);
    res.body.data.AssessmentId.should.equal(assessmentSubmits.AssessmentId);
  });
  it('Create AssessmentSubmission', async () => {
    const res = await authenticated_post('/api/assessment-submission', {
      data: assessmentSubmit,
    }, 'student');
    res.status.should.equal(200);
    const assessmentSubmits = await db.AssessmentSubmission.findOne({
      where: { id: res.body.data.id },
    });
    res.body.data.files.should.equal(assessmentSubmits.files);
  });
  it('Update AssessmentSubmission', async () => {
    const assessmentSubmits = await db.AssessmentSubmission.create(assessmentSubmit);
    const res = await authenticated_post(`/api/assessment-submission/${assessmentSubmits.id}`, {
      data: { AssessmentId: 1 },
    }, 'student');
    res.status.should.equal(200);
    await assessmentSubmits.reload();
    assessmentSubmits.AssessmentId.should.equal(1);
  });
  it('Delete AssessmentSubmission', async () => {
    const assessmentSubmits = await db.AssessmentSubmission.create(assessmentSubmit);
    const res = await authenticated_delete(`/api/assessment-submission/${assessmentSubmits.id}`);
    res.status.should.equal(200);
  });
});
